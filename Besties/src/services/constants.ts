// src/services/constants.ts

import type { CallStatus } from "../types/webrtc";

/**
 * ============================================================
 * Socket Events
 * ============================================================
 */

export const SOCKET_EVENTS = {
  JOIN: "join",

  OFFER: "offer",

  ANSWER: "answer",

  CANDIDATE: "candidate",

  END: "end",
} as const;

/**
 * ============================================================
 * Notification Keys
 * ============================================================
 * Prevent duplicate notifications.
 */

export const NOTIFICATION_KEYS = {
  INCOMING: "incoming-call",

  OUTGOING: "outgoing-call",

  BUSY: "busy-call",

  ENDED: "ended-call",
} as const;

/**
 * ============================================================
 * Audio Files
 * ============================================================
 */

export const SOUNDS = {
  RING: "/sound/ring.mp3",

  REJECT: "/sound/reject.mp3",

  BUSY: "/sound/busy.mp3",

  CONNECTED: "/sound/connected.mp3",
} as const;

/**
 * ============================================================
 * WebRTC Configuration
 * ============================================================
 */

export const RTC = {
  OFFER_OPTIONS: {
    offerToReceiveAudio: true,

    offerToReceiveVideo: true,
  },

  ICE_POOL_SIZE: 10,

  BUNDLE_POLICY: "balanced" as RTCBundlePolicy,

  ICE_TRANSPORT_POLICY: "all" as RTCIceTransportPolicy,

  RTCP_MUX_POLICY: "require" as RTCRtcpMuxPolicy,
};

/**
 * ============================================================
 * Connection States
 * ============================================================
 */

export const CONNECTION_STATE = {
  NEW: "new",

  CONNECTING: "connecting",

  CONNECTED: "connected",

  DISCONNECTED: "disconnected",

  FAILED: "failed",

  CLOSED: "closed",
} as const;

/**
 * ============================================================
 * Signaling States
 * ============================================================
 */

export const SIGNALING_STATE = {
  STABLE: "stable",

  HAVE_LOCAL_OFFER: "have-local-offer",

  HAVE_REMOTE_OFFER: "have-remote-offer",

  HAVE_LOCAL_PRANSWER: "have-local-pranswer",

  HAVE_REMOTE_PRANSWER: "have-remote-pranswer",

  CLOSED: "closed",
} as const;

/**
 * ============================================================
 * ICE States
 * ============================================================
 */

export const ICE_STATE = {
  NEW: "new",

  CHECKING: "checking",

  CONNECTED: "connected",

  COMPLETED: "completed",

  FAILED: "failed",

  DISCONNECTED: "disconnected",

  CLOSED: "closed",
} as const;

/**
 * ============================================================
 * Media Types
 * ============================================================
 */

export const MEDIA = {
  AUDIO: "audio",

  VIDEO: "video",
} as const;

/**
 * ============================================================
 * Default Constraints
 * ============================================================
 */

export const MEDIA_CONSTRAINTS = {
  AUDIO: {
    audio: {
      echoCancellation: true,

      noiseSuppression: true,

      autoGainControl: true,
    },

    video: false,
  },

  VIDEO: {
    audio: {
      echoCancellation: true,

      noiseSuppression: true,

      autoGainControl: true,
    },

    video: {
      width: {
        ideal: 1280,
      },

      height: {
        ideal: 720,
      },

      frameRate: {
        ideal: 30,
      },

      facingMode: "user",
    },
  },

  SCREEN: {
    video: {
      frameRate: 30,
    },

    audio: false,
  },
} as const;

/**
 * ============================================================
 * Call Status
 * ============================================================
 */

export const CALL_STATUS: Record<string, CallStatus> = {
  IDLE: "idle",

  CALLING: "calling",

  INCOMING: "incoming",

  CONNECTING: "connecting",

  CONNECTED: "connected",

  ENDING: "ending",

  ENDED: "ended",

  FAILED: "failed",
};

/**
 * ============================================================
 * Logger Prefixes
 * ============================================================
 */

export const LOG_PREFIX = {
  PEER: "[Peer]",

  SOCKET: "[Socket]",

  MEDIA: "[Media]",

  AUDIO: "[Audio]",

  NOTIFICATION: "[Notification]",

  CALL: "[Call]",

  ERROR: "[Error]",
} as const;

/**
 * ============================================================
 * Timer
 * ============================================================
 */

export const TIMER = {
  CALL_INTERVAL: 1000,
};

/**
 * ============================================================
 * Timeouts
 * ============================================================
 */

export const TIMEOUT = {
  CALL_TIMEOUT: 30000,

  RECONNECT_DELAY: 2000,
};
