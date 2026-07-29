import logger from "./logger";
import { MEDIA_CONSTRAINTS } from "./constants";
import type { CallMode } from "../types/webrtc";

export default class MediaManager {
  private localStream: MediaStream | null = null;

  /**
   * Returns current local stream
   */
  public get stream(): MediaStream | null {
    return this.localStream;
  }

  /**
   * ===================================================
   * START BY MODE
   * ===================================================
   */

  public async start(mode: CallMode): Promise<MediaStream> {
    switch (mode) {
      case "audio":
        return this.startAudio();

      case "video":
        return this.startVideo();

      default:
        throw new Error(`Unsupported media mode: ${mode}`);
    }
  }

  /**
   * ===================================================
   * AUDIO
   * ===================================================
   */

  public async startAudio(): Promise<MediaStream> {
    try {
      logger.media("Starting microphone...");

      this.stop();

      const stream = await navigator.mediaDevices.getUserMedia(
        MEDIA_CONSTRAINTS.AUDIO,
      );

      this.localStream = stream;

      logger.media("Microphone started");

      return stream;
    } catch (err) {
      logger.error("Failed to access microphone", err);
      throw err;
    }
  }

  /**
   * ===================================================
   * VIDEO
   * ===================================================
   */

  public async startVideo(): Promise<MediaStream> {
    try {
      logger.media("Starting camera...");

      this.stop();

      const stream = await navigator.mediaDevices.getUserMedia(
        MEDIA_CONSTRAINTS.VIDEO,
      );

      this.localStream = stream;

      logger.media("Camera started");

      return stream;
    } catch (err) {
      if (
        err instanceof Error &&
        (err.name === "NotReadableError" || err.name === "TrackStartError")
      ) {
        logger.warn("Camera is unavailable", err);
      } else {
        logger.error("Failed to access camera", err);
      }
      throw err;
    }
  }

  /**
   * ===================================================
   * SCREEN SHARE
   * ===================================================
   */

  public async startScreen(): Promise<MediaStream> {
    try {
      logger.media("Starting screen sharing...");

      const stream = await navigator.mediaDevices.getDisplayMedia(
        MEDIA_CONSTRAINTS.SCREEN,
      );

      logger.media("Screen sharing started");

      return stream;
    } catch (err) {
      logger.error("Failed to share screen", err);
      throw err;
    }
  }

  /**
   * ===================================================
   * ATTACH STREAM TO VIDEO
   * ===================================================
   */

  public attach(
    element: HTMLVideoElement | HTMLAudioElement,
    stream: MediaStream,
  ) {
    element.srcObject = stream;
  }

  /**
   * ===================================================
   * TOGGLE MICROPHONE
   * ===================================================
   */

  public toggleMic(enable?: boolean): boolean {
    if (!this.localStream) return false;

    const track = this.localStream.getAudioTracks().find(Boolean);

    if (!track) return false;

    if (enable === undefined) {
      track.enabled = !track.enabled;
    } else {
      track.enabled = enable;
    }

    logger.media(track.enabled ? "Microphone Enabled" : "Microphone Disabled");

    return track.enabled;
  }

  /**
   * ===================================================
   * TOGGLE CAMERA
   * ===================================================
   */

  public toggleCamera(enable?: boolean): boolean {
    if (!this.localStream) return false;

    const track = this.localStream.getVideoTracks().find(Boolean);

    if (!track) return false;

    if (enable === undefined) {
      track.enabled = !track.enabled;
    } else {
      track.enabled = enable;
    }

    logger.media(track.enabled ? "Camera Enabled" : "Camera Disabled");

    return track.enabled;
  }

  /**
   * ===================================================
   * REPLACE TRACK
   * ===================================================
   */

  public async replaceTrack(
    peer: RTCPeerConnection,
    kind: "audio" | "video",
    track: MediaStreamTrack,
  ) {
    const sender = peer.getSenders().find((s) => s.track?.kind === kind);

    if (!sender) {
      logger.warn(`No ${kind} sender found.`);
      return;
    }

    await sender.replaceTrack(track);

    logger.media(`${kind} track replaced.`);
  }

  /**
   * ===================================================
   * ADD TRACKS TO PEER
   * ===================================================
   */

  public addTracks(peer: RTCPeerConnection) {
    if (!this.localStream) return;

    this.localStream.getTracks().forEach((track) => {
      peer.addTrack(track, this.localStream!);
    });

    logger.peer("Tracks added to PeerConnection");
  }

  /**
   * ===================================================
   * STOP
   * ===================================================
   */

  public stop() {
    if (!this.localStream) return;

    logger.media("Stopping media...");

    this.localStream.getTracks().forEach((track) => {
      track.stop();
    });

    this.localStream = null;
  }

  /**
   * ===================================================
   * CLEANUP
   * ===================================================
   */

  public cleanup() {
    logger.media("Cleaning media manager");

    this.stop();
  }
}