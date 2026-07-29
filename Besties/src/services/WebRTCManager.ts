import logger from "./logger";
import MediaManager from "./MediaManager";
import type {
  CallMode,

  CallUser,
} from "../types/webrtc";

export interface WebRTCManagerEvents {
  onOffer?: (offer: RTCSessionDescriptionInit) => void;

  onAnswer?: (answer: RTCSessionDescriptionInit) => void;

  onCandidate?: (candidate: RTCIceCandidate) => void;

  onRemoteStream?: (stream: MediaStream) => void;

  onConnectionStateChange?: (
    state: RTCPeerConnectionState
  ) => void;

  onIceConnectionStateChange?: (
    state: RTCIceConnectionState
  ) => void;

  onSignalingStateChange?: (
    state: RTCSignalingState
  ) => void;

  onError?: (error: unknown) => void;
}

export interface WebRTCManagerConfig {
  iceServers: RTCIceServer[];

  media: MediaManager;

  mode: CallMode;

  events?: WebRTCManagerEvents;
}

export default class WebRTCManager {
  /**
   * =====================================================
   * Core
   * =====================================================
   */

  private peer?: RTCPeerConnection;

  private readonly media: MediaManager;

  private readonly iceServers: RTCIceServer[];


  private readonly events?: WebRTCManagerEvents;

  /**
   * =====================================================
   * Negotiation
   * =====================================================
   */

  private makingOffer = false;

  private ignoreOffer = false;

  private polite = false;

  private settingRemoteAnswerPending = false;

  private pendingCandidates: RTCIceCandidateInit[] = [];

  /**
   * Prevents accidental offers when tracks are added before
   * the peer has finished initializing (impolite/answering side).
   */
  private suppressOffer = false;

  /**
   * =====================================================
   * Call State
   * =====================================================
   */

  private remoteUser?: CallUser;

  private destroyed = false;

  /**
   * =====================================================
   * Constructor
   * =====================================================
   */

  constructor(config: WebRTCManagerConfig) {
    this.media = config.media;

    this.iceServers = config.iceServers;


    this.events = config.events;
  }

  /**
   * =====================================================
   * Public Getters
   * =====================================================
   */

  get connection() {
    return this.peer;
  }

  get remote() {
    return this.remoteUser;
  }

  get signalingState() {
    return this.peer?.signalingState;
  }

  get connectionState() {
    return this.peer?.connectionState;
  }

  get iceConnectionState() {
    return this.peer?.iceConnectionState;
  }

  /**
   * =====================================================
   * Create Peer
   * =====================================================
   */

  public createPeer(polite: boolean) {
    this.close();
    this.resetState();

    logger.peer("Creating PeerConnection");

    this.destroyed = false;

    this.polite = polite;

    /**
     * Suppress accidental offers on the impolite (answering) side.
     * Adding tracks triggers onnegotiationneeded immediately, which
     * would create a spurious offer before receiveOffer is called.
     */
    this.suppressOffer = !polite;

    this.peer = new RTCPeerConnection({
      iceServers: this.iceServers,
    });

    this.registerEvents();

    if (this.media.stream) {
      this.media.addTracks(this.peer);
    }

    return this.peer;
  }

  /**
   * =====================================================
   * Register Peer Events
   * =====================================================
   */

  private registerEvents() {
    if (!this.peer) return;

    /**
     * Remote Track
     */
    this.peer.ontrack = (event) => {
      logger.peer("Remote stream received");

      const stream = event.streams[0];

      if (!stream) return;

      this.events?.onRemoteStream?.(stream);
    };

    /**
     * ICE Candidate
     */
    this.peer.onicecandidate = (event) => {
      if (!event.candidate) return;

      logger.peer("ICE Candidate generated");

      this.events?.onCandidate?.(event.candidate);
    };

    /**
     * Connection State
     */
    this.peer.onconnectionstatechange = () => {
      if (!this.peer) return;

      logger.peer("Connection State:", this.peer.connectionState);

      this.events?.onConnectionStateChange?.(this.peer.connectionState);

      switch (this.peer.connectionState) {
        case "connected":
          logger.call("Connected");
          break;

        case "disconnected":
          logger.warn("Peer disconnected");
          break;

        case "failed":
          logger.error("Peer failed");
          break;

        case "closed":
          logger.peer("Peer closed");
          break;
      }
    };

    /**
     * ICE State
     */
    this.peer.oniceconnectionstatechange = () => {
      if (!this.peer) return;

      logger.peer("ICE State:", this.peer.iceConnectionState);

      this.events?.onIceConnectionStateChange?.(this.peer.iceConnectionState);
    };

    /**
     * Signaling State
     */
    this.peer.onsignalingstatechange = () => {
      if (!this.peer) return;

      logger.peer("Signaling:", this.peer.signalingState);

      this.events?.onSignalingStateChange?.(this.peer.signalingState);
    };

    /**
     * Perfect Negotiation
     */
    this.peer.onnegotiationneeded = async () => {
      try {
        if (!this.peer) return;

        logger.peer("Negotiation Needed");

        if (this.makingOffer) {
          logger.warn("Already negotiating...");
          return;
        }

        /**
         * -------------------------------------------------------
         * Suppress accidental offers from the impolite peer
         * Adding tracks triggers negotiation before we've
         * received the remote offer. The rollback in receiveOffer
         * handles the signaling state, but we must not send this
         * accidental offer to the remote peer.
         * -------------------------------------------------------
         */
        if (this.suppressOffer) {
          logger.warn("Suppressing accidental offer (impolite peer initializing)");
          return;
        }

        this.makingOffer = true;

        await this.peer.setLocalDescription();

        if (!this.peer.localDescription) return;

        logger.peer("Offer Created");

        this.events?.onOffer?.(this.peer.localDescription);
      } catch (err) {
        logger.error(err);

        this.events?.onError?.(err);
      } finally {
        this.makingOffer = false;
      }
    };
  }

  /**
   * =====================================================
   * Handle Remote Offer
   * =====================================================
   */

  public async receiveOffer(offer: RTCSessionDescriptionInit) {
    if (!this.peer) throw new Error("PeerConnection not initialized.");

    try {
      /**
       * -------------------------------------------------------
       * Handle accidental local offer creation
       * Adding tracks to the peer triggers onnegotiationneeded,
       * which creates a local offer BEFORE we receive the remote
       * offer. This changes signalingState to "have-local-offer",
       * causing setRemoteDescription to fail. We must rollback
       * the accidental local offer first.
       * -------------------------------------------------------
       */
      if (this.peer.signalingState === "have-local-offer") {
        logger.warn("Rolling back accidental local offer before accepting remote offer");
        await this.peer.setLocalDescription({ type: "rollback" });
      }

      const readyForOffer =
        !this.makingOffer &&
        (this.peer.signalingState === "stable" ||
          this.settingRemoteAnswerPending);

      const offerCollision = !readyForOffer;

      this.ignoreOffer = !this.polite && offerCollision;

      if (this.ignoreOffer) {
        logger.warn("Ignoring offer collision");
        return;
      }

      logger.peer("Applying remote offer");

      await this.peer.setRemoteDescription(offer);

      this.settingRemoteAnswerPending = false;

      await this.flushPendingCandidates();

      await this.peer.setLocalDescription(await this.peer.createAnswer());

      if (!this.peer.localDescription) return;

      logger.peer("Answer Created");

      this.events?.onAnswer?.(this.peer.localDescription);
    } catch (err) {
      logger.error(err);

      this.events?.onError?.(err);
    }
  }

  /**
   * =====================================================
   * Handle Remote Answer
   * =====================================================
   */

  public async receiveAnswer(answer: RTCSessionDescriptionInit) {
    if (!this.peer) return;

    try {
      /**
       * THIS FIXES YOUR BUG
       */

      if (this.peer.signalingState !== "have-local-offer") {
        logger.warn("Ignoring duplicate answer.");

        return;
      }

      logger.peer("Applying remote answer");

      this.settingRemoteAnswerPending = true;

      await this.peer.setRemoteDescription(answer);

      this.settingRemoteAnswerPending = false;

      await this.flushPendingCandidates();
    } catch (err) {
      logger.error(err);

      this.events?.onError?.(err);
    }
  }

  /**
   * =====================================================
   * Receive Candidate
   * =====================================================
   */

  public async receiveCandidate(candidate: RTCIceCandidateInit) {
    if (!this.peer) return;

    try {
      if (this.ignoreOffer) return;

      if (!this.peer.remoteDescription) {
        this.pendingCandidates.push(candidate);
        return;
      }

      await this.peer.addIceCandidate(candidate);

      logger.peer("ICE Candidate Added");
    } catch (err) {
      logger.error(err);

      this.events?.onError?.(err);
    }
  }

  /**
   * =====================================================
   * Attach Local Stream
   * =====================================================
   */

  public attachLocalStream(element: HTMLVideoElement | HTMLAudioElement) {
    if (!this.media.stream) return;

    element.srcObject = this.media.stream;

    logger.media("Local stream attached.");
  }

  /**
   * =====================================================
   * Attach Remote Stream
   * =====================================================
   */

  public attachRemoteStream(
    element: HTMLVideoElement | HTMLAudioElement,
    stream: MediaStream,
  ) {
    element.srcObject = stream;

    logger.media("Remote stream attached.");
  }

  /**
   * =====================================================
   * Replace Media Track
   * =====================================================
   */

  public async replaceTrack(kind: "audio" | "video", track: MediaStreamTrack) {
    if (!this.peer) return;

    const sender = this.peer
      .getSenders()
      .find((sender) => sender.track?.kind === kind);

    if (!sender) {
      this.peer.addTrack(track, new MediaStream([track]));
      logger.peer(`${kind} track added`);
      return;
    }

    await sender.replaceTrack(track);

    logger.peer(`${kind} track replaced`);
  }

  public setTrackEnabled(kind: "audio" | "video", enabled: boolean) {
    if (!this.peer) return;

    this.peer.getSenders().forEach((sender) => {
      if (sender.track?.kind === kind) {
        sender.track.enabled = enabled;
      }
    });
  }
  /**
   * =====================================================
   * Remove Remote Stream
   * =====================================================
   */

  public detachRemoteStream(element: HTMLVideoElement | HTMLAudioElement) {
    element.srcObject = null;
  }

  /**
   * =====================================================
   * Restart ICE
   * =====================================================
   */

  public restartIce() {
    if (!this.peer) return;

    logger.peer("Restarting ICE");

    this.peer.restartIce();
  }

  /**
   * =====================================================
   * Reset Internal State
   * =====================================================
   */

  private resetState() {
    this.ignoreOffer = false;

    this.makingOffer = false;

    this.settingRemoteAnswerPending = false;

    this.remoteUser = undefined;

    this.pendingCandidates = [];
  }

  private async flushPendingCandidates() {
    if (!this.peer?.remoteDescription) return;

    const candidates = [...this.pendingCandidates];

    this.pendingCandidates = [];

    for (const candidate of candidates) {
      await this.peer.addIceCandidate(candidate);
    }

    if (candidates.length > 0) {
      logger.peer("Pending ICE Candidates Added");
    }
  }

  /**
   * =====================================================
   * Close PeerConnection
   * =====================================================
   */

  public close() {
    if (!this.peer) return;

    logger.peer("Closing PeerConnection");

    try {
      this.peer.ontrack = null;

      this.peer.onicecandidate = null;

      this.peer.onconnectionstatechange = null;

      this.peer.oniceconnectionstatechange = null;

      this.peer.onsignalingstatechange = null;

      this.peer.onnegotiationneeded = null;
    } catch (err) {
      logger.warn(err);
    }

    this.peer.close();

    this.peer = undefined;
  }

  /**
   * =====================================================
   * Cleanup
   * =====================================================
   */

  public cleanup() {
    logger.call("Cleaning WebRTC");

    this.removeAllTracks();

    this.media.cleanup();

    this.close();

    this.resetState();

    this.destroyed = true;
  }

  /**
   * =====================================================
   * Destroy
   * =====================================================
   */

  public destroy() {
    if (this.destroyed) return;

    logger.peer("Destroy");

    this.cleanup();
  }

  /**
   * =====================================================
   * Remove All Tracks
   * =====================================================
   */

  private removeAllTracks() {
    if (!this.peer) return;

    const senders = this.peer.getSenders();

    senders.forEach((sender) => {
      try {
        sender.replaceTrack(null);
      } catch (err) {
        logger.warn(err);
      }
    });

    logger.peer("All tracks removed.");
  }

  /**
   * =====================================================
   * Restart Peer
   * =====================================================
   */

  public restart(polite: boolean) {
    logger.peer("Restarting");

    this.destroy();

    return this.createPeer(polite);
  }

  /**
   * =====================================================
   * Is Connected
   * =====================================================
   */

  public isConnected() {
    return this.peer?.connectionState === "connected";
  }

  /**
   * =====================================================
   * Is Stable
   * =====================================================
   */

  public isStable() {
    return this.peer?.signalingState === "stable";
  }

  /**
   * =====================================================
   * Has Local Description
   * =====================================================
   */

  public hasLocalDescription() {
    return !!this.peer?.localDescription;
  }

  /**
   * =====================================================
   * Has Remote Description
   * =====================================================
   */

  public hasRemoteDescription() {
    return !!this.peer?.remoteDescription;
  }
}