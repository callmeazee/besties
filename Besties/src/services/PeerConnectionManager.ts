// src/services/PeerConnectionManager.ts



import logger from "./logger";
import { RTC } from "./constants";
import type {
  PeerEvents,
  ReplaceTrackOptions,
} from "../types/webrtc";
import CatchError from "../lib/CatchError";

export default class PeerConnectionManager {
     /**
      * ===========================================================
      * Internal Peer
      * ===========================================================
      */

     private peer?: RTCPeerConnection ;

     /**
      * ICE Servers
      */

     private readonly iceServers: RTCIceServer[];

     /**
      * Event callbacks
      */

     private readonly events?: PeerEvents;

     /**
      * Prevent duplicate cleanup
      */

     private destroyed = false;

     /**
      * ===========================================================
      * Constructor
      * ===========================================================
      */

     constructor(
          iceServers: RTCIceServer[],
          events?: PeerEvents
     ) {
          this.iceServers = iceServers;
          this.events = events;
     }

     /**
      * ===========================================================
      * Current Peer
      * ===========================================================
      */

     get connection() {
          return this.peer;
     }

     /**
      * ===========================================================
      * States
      * ===========================================================
      */

     get signalingState() {
          return this.peer?.signalingState;
     }

     get connectionState() {
          return this.peer?.connectionState;
     }

     get iceConnectionState() {
          return this.peer?.iceConnectionState;
     }

     get iceGatheringState() {
          return this.peer?.iceGatheringState;
     }

     /**
      * ===========================================================
      * Create Peer
      * ===========================================================
      */

     public create(): RTCPeerConnection {
          if (this.peer) {
               logger.warn(
                    "Peer already exists. Destroying previous instance."
               );

               this.destroy();
               
          }
          

          logger.peer("Creating RTCPeerConnection");

          this.destroyed = false;

          this.peer = new RTCPeerConnection({
               iceServers: this.iceServers,

               bundlePolicy: RTC.BUNDLE_POLICY,

               iceTransportPolicy: RTC.ICE_TRANSPORT_POLICY,

               rtcpMuxPolicy: RTC.RTCP_MUX_POLICY,

               iceCandidatePoolSize: RTC.ICE_POOL_SIZE,
          });

          this.registerEvents();

          return this.peer;
     }

     /**
      * ===========================================================
      * Register Events
      * ===========================================================
      */

     private registerEvents() {
          if (!this.peer) return;

          this.peer.ontrack = (event) => {
               logger.peer("Remote track received");

               this.events?.onRemoteStream?.(
                    event.streams[0]
               );
          };

          this.peer.onicecandidate = (event) => {
               if (!event.candidate) return;

               logger.peer(
                    "ICE Candidate Generated"
               );

               this.events?.onIceCandidate?.(
                    event.candidate
               );
          };

          this.peer.onconnectionstatechange = () => {
               logger.peer(
                    "Connection:",
                    this.peer?.connectionState
               );

               if (!this.peer) return;

               this.events?.onConnectionStateChange?.(
                    this.peer.connectionState
               );
          };

          this.peer.oniceconnectionstatechange = () => {
               if (!this.peer) return;

               logger.peer(
                    "ICE:",
                    this.peer.iceConnectionState
               );

               this.events?.onIceConnectionStateChange?.(
                    this.peer.iceConnectionState
               );
          };

          this.peer.onsignalingstatechange = () => {
               if (!this.peer) return;

               logger.peer(
                    "Signaling:",
                    this.peer.signalingState
               );

               this.events?.onSignalingStateChange?.(
                    this.peer.signalingState
               );
          };

          /**
           * Negotiation Guard
           */

          this.peer.onnegotiationneeded =
               async () => {
                    logger.peer(
                         "Negotiation Needed"
                    );
               };
     }

     /**
      * ===========================================================
      * Add Local Tracks
      * ===========================================================
      */

     public addTracks(
          stream: MediaStream
     ) {
          if (!this.peer) {
               throw new Error(
                    "PeerConnection not created."
               );
          }

          stream.getTracks().forEach((track) => {
               logger.media(
                    "Adding Track:",
                    track.kind
               );

               this.peer!.addTrack(track, stream);
          });
     }

     /**
      * ===========================================================
      * Replace Track
      * ===========================================================
      */

     public async replaceTrack({
          kind,
          track,
     }: ReplaceTrackOptions) {
          if (!this.peer) return;

          const sender =
               this.peer
                    .getSenders()
                    .find(
                         (s) => s.track?.kind === kind
                    );

          if (!sender) {
               logger.warn(
                    `No sender found for ${kind}`
               );
               return;
          }

          await sender.replaceTrack(track);

          logger.peer(
               `${kind} track replaced`
          );
     }

     /**
      * ===========================================================
      * Remove All Senders
      * ===========================================================
      */

     public removeTracks() {
          if (!this.peer) return;

          this.peer
               .getSenders()
               .forEach((sender) => {
                    try {
                         this.peer?.removeTrack(sender);
                    } catch (err) {
                           logger.warn("Failed removing sender", err);
                    }
               });

          logger.peer(
               "All senders removed"
          );
     }

         /**
          * ===========================================================
          * Destroy Peer
          * ===========================================================
          */

         public destroy() {
              if (this.destroyed) return;

              if (this.peer) {
                   try {
                        this.peer.close();
                   } catch (err) {
                        logger.warn("Error closing peer", err);
                        CatchError(err)
                   }

                   // clear event handlers
                   try {
                        this.peer.ontrack = null;
                        this.peer.onicecandidate = null;
                        this.peer.onconnectionstatechange = null;
                        this.peer.oniceconnectionstatechange = null;
                        this.peer.onsignalingstatechange = null;
                        this.peer.onnegotiationneeded = null;
                   } catch (err) {
                        CatchError(err)
                   }

                   this.peer = undefined;
              }

              this.destroyed = true;
         }
}