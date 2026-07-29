// src/webrtc/types.ts

/**
 * ===========================================================
 * Common WebRTC Types
 * ===========================================================
 */

export type CallMode = "audio" | "video" | "chat";

export type CallStatus =
  | "idle"
  | "calling"
  | "incoming"
  | "connecting"
  | "connected"
  | "ending"
  | "ended"
  | "failed";

export interface CallUser {
  id?: string;
  _id: string;
  fullname: string;
  image?: string | null;
  socketId?: string;
}

export interface OfferPayload {
  offer: RTCSessionDescriptionInit;
  from: CallUser;
  type: CallMode;
}

export interface AnswerPayload {
  answer: RTCSessionDescriptionInit;
  from: string;
}

export interface CandidatePayload {
  candidate: RTCIceCandidateInit;
  from: string;
}

export interface EndCallPayload {
  from: string;
}

export interface JoinPayload {
  userId: string;
}

export interface RTCConfig {
  iceServers: RTCIceServer[];
}

export interface PeerEvents {
  onRemoteStream?: (stream: MediaStream) => void;

  onConnectionStateChange?: (state: RTCPeerConnectionState) => void;

  onIceCandidate?: (candidate: RTCIceCandidate) => void;

  onIceConnectionStateChange?: (state: RTCIceConnectionState) => void;

  onSignalingStateChange?: (state: RTCSignalingState) => void;
}

export interface NotificationAction {
  label: string;

  type?: "primary" | "danger" | "success";

  onClick: () => void;
}

export interface IncomingCallNotification {
  user: CallUser;

  mode: CallMode;

  onAccept: () => void;

  onReject: () => void;
}

export interface OutgoingCallNotification {
  user: CallUser;

  mode: CallMode;

  onEnd: () => void;
}

export interface WebRTCState {
  status: CallStatus;

  localStream: MediaStream | null;

  remoteStream: MediaStream | null;

  localUser: CallUser | null;

  remoteUser: CallUser | null;

  callMode: CallMode | null;

  isMuted: boolean;

  isCameraOn: boolean;

  isScreenSharing: boolean;

  duration: number;
}

export interface StartCallOptions {
  to: string;

  mode: CallMode;

  user: CallUser;
}

export interface AcceptCallOptions {
  payload: OfferPayload;
}

export interface ReplaceTrackOptions {
  kind: "audio" | "video";

  track: MediaStreamTrack;
}

export interface MediaDevicesState {
  audio: boolean;

  video: boolean;

  screen: boolean;
}
