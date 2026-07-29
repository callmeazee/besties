// src/hooks/useWebRTC.ts

import {  useCallback, useEffect, useRef, useState } from "react";
import { notification } from "antd";

import socket from "../lib/socket";
import HttpInterceptor from "../lib/HttpInterceptor";
import CatchError from "../lib/CatchError";

import MediaManager from "../services/MediaManager";
import WebRTCManager from "../services/WebRTCManager";

import type {
  CallMode,
  CallStatus,
  CallUser,
  OfferPayload,
  CandidatePayload,
  AnswerPayload
 
} from "../types/webrtc";



interface UseWebRTCProps {
  mode: CallMode;
  session: CallUser;
}

const getSignalTarget = (user: CallUser | null) => {
  return user?.socketId ?? user?.id ?? user?._id;
};

const isCameraUnavailableError = (err: unknown) => {
  const name = err instanceof Error ? err.name : "";

  return name === "NotReadableError" || name === "TrackStartError";
};

const useWebRTC = ({ mode, session }: UseWebRTCProps) => {
  //  const [notify, notifyUi] = notification.useNotification();

  /**
   * ============================================================
   * Managers
   * ============================================================
   */
  const media = useRef(new MediaManager());

  const rtc = useRef<WebRTCManager | null>(null);

  const remoteUserRef = useRef<CallUser | null>(null);

  const pendingRemoteCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  const pendingRemoteAnswerRef = useRef<RTCSessionDescriptionInit | null>(null);

  const connectedRef = useRef(false);

  const sessionRef = useRef(session);

  const mountedRef = useRef(false);

  const initializedRef = useRef(false);

  const isCallingRef = useRef(false);

  const isCleaningRef = useRef(false);

  const ringtone = useRef<HTMLAudioElement | null>(null);

  /**
   * ============================================================
   * Elements
   * ============================================================
   */

  const localVideoRef = useRef<HTMLVideoElement>(null);

  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const localAudioRef = useRef<HTMLAudioElement>(null);

  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  /**
   * ============================================================
   * Timer
   * ============================================================
   */

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * ============================================================
   * States
   * ============================================================
   */

  const [status, setStatus] = useState<CallStatus>("idle");

  const [loading, setLoading] = useState(false);

  const [duration, setDuration] = useState(0);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const [remoteUser, setRemoteUser] = useState<CallUser | null>(null);

  const [incomingOffer, setIncomingOffer] = useState<OfferPayload | null>(null);

  const [micEnabled, setMicEnabled] = useState(true);

  const [cameraEnabled, setCameraEnabled] = useState(true);

  const [screenSharing, setScreenSharing] = useState(false);

  const [connected, setConnected] = useState(false);

  const [callEndedSignal, setCallEndedSignal] = useState(0);

  /**
   * ============================================================
   * Mount
   * ============================================================
   */

  useEffect(() => {
    mountedRef.current = true;

    ringtone.current = new Audio("/sound/ring.mp3");

    ringtone.current.loop = true;

    return () => {
      mountedRef.current = false;

      ringtone.current?.pause();

      ringtone.current = null;
    };
  }, []);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  /**
   * ============================================================
   * TURN
   * ============================================================
   */

  const getIceServers = useCallback(async () => {
    try {
      const { data } = await HttpInterceptor.get("/twilio/turn-server");

      return data;
    } catch (err) {
      CatchError(err);

      return [];
    }
  }, []);

  /**
   * ============================================================
   * Timer
   * ============================================================
   */

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    timer.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }

    setDuration(0);
  };

  /**
   * ============================================================
   * Sounds
   * ============================================================
   */

  const stopRingtone = () => {
    ringtone.current?.pause();

    if (ringtone.current) {
      ringtone.current.currentTime = 0;
    }
  };

  const markConnected = useCallback(() => {
    stopRingtone();

    startTimer();

    connectedRef.current = true;

    setConnected(true);

    setStatus("connected");
  }, []);

  /**
   * ============================================================
   * Cleanup
   * ============================================================
   */

  const cleanup = useCallback(() => {
    if (isCleaningRef.current) return;

    isCleaningRef.current = true;

    stopTimer();

    stopRingtone();

    /**
     * -------------------------------------------------------
     * Destroy Peer
     * -------------------------------------------------------
     */

    if (rtc.current) {
      rtc.current?.destroy();
      rtc.current = null;
    }

    /**
     * -------------------------------------------------------
     * Destroy Media
     * -------------------------------------------------------
     */

    media.current.cleanup();

    /**
     * -------------------------------------------------------
     * Clear Video Elements
     * -------------------------------------------------------
     */

    if (localVideoRef.current) {
      localVideoRef.current.pause();
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.pause();
      remoteVideoRef.current.srcObject = null;
    }

    /**
     * -------------------------------------------------------
     * Clear Audio Elements
     * -------------------------------------------------------
     */

    if (localAudioRef.current) {
      localAudioRef.current.pause();
      localAudioRef.current.srcObject = null;
    }

    if (remoteAudioRef.current) {
      remoteAudioRef.current.pause();
      remoteAudioRef.current.srcObject = null;
    }

    /**
     * -------------------------------------------------------
     * Reset Refs
     * -------------------------------------------------------
     */

    remoteUserRef.current = null;

    pendingRemoteCandidatesRef.current = [];

    pendingRemoteAnswerRef.current = null;

    initializedRef.current = false;

    isCallingRef.current = false;

    /**
     * -------------------------------------------------------
     * Reset Streams
     * -------------------------------------------------------
     */

    setLocalStream(null);

    setRemoteStream(null);

    /**
     * -------------------------------------------------------
     * Reset User
     * -------------------------------------------------------
     */

    setRemoteUser(null);

    setIncomingOffer(null);

    /**
     * -------------------------------------------------------
     * Reset UI
     * -------------------------------------------------------
     */

    connectedRef.current = false;

    setConnected(false);

    setStatus("idle");

    setLoading(false);

    setDuration(0);

    setMicEnabled(true);

    setCameraEnabled(true);

    setScreenSharing(false);

    /**
     * -------------------------------------------------------
     * Ready for next call
     * -------------------------------------------------------
     */

    setTimeout(() => {
      isCleaningRef.current = false;
    }, 50);
  }, []);

  /**
   * ============================================================
   * Initialize
   * ============================================================
   */

  const initialize = useCallback(
    async (polite: boolean) => {
      try {
        if (initializedRef.current) return;

        initializedRef.current = true;

        setLoading(true);

        /**
         * -------------------------------------------------------
         * Destroy Previous Peer
         * -------------------------------------------------------
         */

        if (rtc.current) {
          rtc.current.cleanup();
          rtc.current = null;
        }

        /**
         * -------------------------------------------------------
         * TURN
         * -------------------------------------------------------
         */

        const iceServers = await getIceServers();

        /**
         * -------------------------------------------------------
         * Local Media
         * -------------------------------------------------------
         */

        let localStream: MediaStream;

        try {
          localStream =
            mode === "video"
              ? await media.current.startVideo()
              : await media.current.startAudio();

          setCameraEnabled(mode === "video");
        } catch (err) {
          if (mode !== "video" || !isCameraUnavailableError(err)) {
            throw err;
          }

          localStream = await media.current.startAudio();
          setCameraEnabled(false);
        }

        setLocalStream(localStream);

        /**
         * -------------------------------------------------------
         * Create Peer
         * -------------------------------------------------------
         */

        rtc.current = new WebRTCManager({
          media: media.current,

          mode,

          iceServers,

          events: {
            /**
             * ---------------------------------------------------
             * Offer
             * ---------------------------------------------------
             */

            onOffer: (offer) => {
              const remote = remoteUserRef.current;
              const to = getSignalTarget(remote);

              if (!to) return;

              socket.emit("offer", {
                offer,

                to,

                from: sessionRef.current,

                type: mode,
                
              });
              console.log("SENDING OFFER");

              console.log(remoteUserRef.current);
            },

            /**
             * ---------------------------------------------------
             * Answer
             * ---------------------------------------------------
             */

            onAnswer: (answer) => {
              const remote = remoteUserRef.current;
              const to = getSignalTarget(remote);

              if (!to) return;

              socket.emit("answer", {
                answer,

                to,
              });
            },

            /**
             * ---------------------------------------------------
             * ICE
             * ---------------------------------------------------
             */

            onCandidate: (candidate) => {
              const remote = remoteUserRef.current;
              const to = getSignalTarget(remote);

              if (!to) return;

              socket.emit("candidate", {
                candidate,

                to,
              });
            },

            /**
             * ---------------------------------------------------
             * Remote Stream
             * ---------------------------------------------------
             */

            onRemoteStream: (stream) => {
              setRemoteStream(stream);

              if (mode === "video") {
                if (remoteVideoRef.current) {
                  rtc.current?.attachRemoteStream(
                    remoteVideoRef.current,
                    stream,
                  );
                }
              } else {
                if (remoteAudioRef.current) {
                  rtc.current?.attachRemoteStream(
                    remoteAudioRef.current,
                    stream,
                  );
                }
              }
            },

            /**
             * ---------------------------------------------------
             * Peer State
             * ---------------------------------------------------
             */

            onConnectionStateChange: (state) => {
              switch (state) {
                case "connecting":
                  if (!connectedRef.current) {
                    setStatus("connecting");
                  }
                  break;

                case "connected":
                  markConnected();
                  break;

                case "failed":
                  cleanup();
                  break;

                case "closed":
                  cleanup();
                  break;

                case "disconnected":
                  break;
              }
            },

            onIceConnectionStateChange: (state) => {
              if (state === "connected" || state === "completed") {
                markConnected();
              }

              if (state === "failed") {
                cleanup();
              }
            },

            /**
             * ---------------------------------------------------
             * Errors
             */

            onError: (err) => {
              CatchError(err);
            },
          },
        });

        /**
         * -------------------------------------------------------
         * Create RTCPeerConnection
         * -------------------------------------------------------
         */

        rtc.current.createPeer(polite);

        /**
         * -------------------------------------------------------
         * Attach Local Media
         * -------------------------------------------------------
         */

        if (mode === "video") {
          if (localVideoRef.current) {
            rtc.current.attachLocalStream(localVideoRef.current);
          }
        } else {
          if (localAudioRef.current) {
            rtc.current.attachLocalStream(localAudioRef.current);
          }
        }
      } catch (err) {
        initializedRef.current = false;

        CatchError(err);

        cleanup();
      } finally {
        setLoading(false);
      }
    },
    [cleanup, getIceServers, markConnected, mode],
  );

  /**
   * ============================================================
   * Is Peer Ready
   * ============================================================
   */

  const getPeer = useCallback(() => {
    if (!rtc.current) {
      throw new Error("WebRTCManager is not initialized.");
    }

    if (!rtc.current.connection) {
      throw new Error("RTCPeerConnection does not exist.");
    }

    return rtc.current;
  }, []);

  const flushPendingRemoteCandidates = useCallback(async () => {
    if (!rtc.current || pendingRemoteCandidatesRef.current.length === 0) return;

    const candidates = [...pendingRemoteCandidatesRef.current];

    pendingRemoteCandidatesRef.current = [];

    for (const candidate of candidates) {
      await rtc.current.receiveCandidate(candidate);
    }
  }, []);

  const flushPendingRemoteAnswer = useCallback(async () => {
    if (!rtc.current?.connection || !pendingRemoteAnswerRef.current) return;

    const answer = pendingRemoteAnswerRef.current;

    pendingRemoteAnswerRef.current = null;

    await rtc.current.receiveAnswer(answer);
  }, []);
  /**
   * ============================================================
   * Start Call
   * ============================================================
   */

  const startCall = useCallback(
    async (user: CallUser) => {
      try {
        if (loading) return;

        if (status !== "idle") return;

        remoteUserRef.current = user;

        setRemoteUser(user);

        setStatus("calling");

        isCallingRef.current = true;

        await initialize(true);
      } catch (err) {
        CatchError(err);

        cleanup();
      }
    },
    [initialize, cleanup, loading, status],
  );

  /**
   * ============================================================
   * Accept Remote Offer
   * ============================================================
   */

  const acceptRemoteOffer = useCallback(
    async (payload: OfferPayload) => {
      try {
        notification.destroy();

        stopRingtone();

        remoteUserRef.current = payload.from;

        setRemoteUser(payload.from);

        setIncomingOffer(null);

        setStatus("connecting");

        await initialize(false);
        const peer = getPeer();

        await peer.receiveOffer(payload.offer);

        await flushPendingRemoteAnswer();
        await flushPendingRemoteCandidates();
      } catch (err) {
        CatchError(err);

        cleanup();
      }
    },
    [initialize, cleanup, getPeer, flushPendingRemoteAnswer, flushPendingRemoteCandidates],
  );

  /**
   * ============================================================
   * Receive Remote Answer
   * ============================================================
   */

    const receiveRemoteAnswer = useCallback(
      async (answer: RTCSessionDescriptionInit) => {
      if (!rtc.current?.connection) {
        pendingRemoteAnswerRef.current = answer;
        return;
      }

      try {
        await rtc.current.receiveAnswer(answer);

        await flushPendingRemoteCandidates();
      } catch (err) {
        CatchError(err);
      }
    },
    [flushPendingRemoteCandidates],
    );

  /**
   * ============================================================
   * Receive ICE Candidate
   * ============================================================
   */

   const receiveRemoteCandidate = useCallback(
     async (candidate: RTCIceCandidateInit) => {
       if (!rtc.current?.connection) {
         pendingRemoteCandidatesRef.current.push(candidate);
         return;
       }

       try {
         await rtc.current.receiveCandidate(candidate);
       } catch (err) {
         CatchError(err);
       }
     },
     [],
   );

  /**
   * ============================================================
   * End Call
   * ============================================================
   */

  const endCall = useCallback(() => {
    const to = getSignalTarget(remoteUserRef.current);

    if (to) {
      socket.emit("end", {
        to,
      });
    }

    cleanup();
  }, [cleanup]);

  /**
   * ------------------------------------------------------------
   * SOCKET LISTENERS
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const onAnswer = async (payload: AnswerPayload) => {
      try {
        await receiveRemoteAnswer(payload.answer);
      } catch (err) {
        CatchError(err);
      }
    };

    const onCandidate = async (payload: CandidatePayload) => {
      try {
        await receiveRemoteCandidate(payload.candidate);
      } catch (err) {
        CatchError(err);
      }
    };

    const onEnd = () => {
      setCallEndedSignal((prev) => prev + 1);
      cleanup();
    };

    socket.on("answer", onAnswer);

    socket.on("candidate", onCandidate);

    socket.on("end", onEnd);

    return () => {
      socket.off("answer", onAnswer);

      socket.off("candidate", onCandidate);

      socket.off("end", onEnd);
    };
  }, [cleanup, receiveRemoteAnswer, receiveRemoteCandidate]);

  /**
   * ============================================================
   * Toggle Microphone
   * ============================================================
   */

  const toggleMic = useCallback(() => {
    const enabled = media.current.toggleMic();

    rtc.current?.setTrackEnabled("audio", enabled);

    setMicEnabled(enabled);
  }, []);

  /**
   * ============================================================
   * Toggle Camera
   * ============================================================
   */

  const toggleCamera = useCallback(() => {
    const enabled = media.current.toggleCamera();

    rtc.current?.setTrackEnabled("video", enabled);

    setCameraEnabled(enabled);
  }, []);

  /**
   * ============================================================
   * Screen Share
   * ============================================================
   */

  const startScreenShare = useCallback(async () => {
    try {
      if (!rtc.current) return;

      const stream = await media.current.startScreen();

      const track = stream.getVideoTracks()[0];

      if (!track) return;

      await rtc.current.replaceTrack("video", track);

      setScreenSharing(true);
      setLocalStream(stream);
      setCameraEnabled(false);

      if (localVideoRef.current) {
        media.current.attach(localVideoRef.current, stream);
      }

      track.onended = async () => {
        const cameraTrack = media.current.stream?.getVideoTracks()[0];

        if (cameraTrack) {
          await rtc.current?.replaceTrack("video", cameraTrack);
          setCameraEnabled(cameraTrack.enabled);
        }

        const currentStream = media.current.stream;

        setScreenSharing(false);
        setLocalStream(currentStream);

        if (currentStream && localVideoRef.current) {
          media.current.attach(localVideoRef.current, currentStream);
        }
      };
    } catch (err) {
      CatchError(err);
    }
  }, []);

  /**
   * ============================================================
   * Unmount
   * ============================================================
   */

  useEffect(() => {
    return () => {
      try {
        rtc.current?.destroy();

        rtc.current = null;
      } finally {
        stopTimer();

        stopRingtone();
      }
    };
  }, []);

  /**
   * ============================================================
   * Leave Page Cleanup
   * ============================================================
   */

  // useEffect(() => {
  //   return () => {
  //     notification.destroy("incoming");

  //     notification.destroy("calling");

  //     cleanup();
  //   };
  // }, [cleanup]);

  /**
   * ============================================================
   * Return
   * ============================================================
   */

  return {
    /**
     * State
     */

    status,
    loading,
    duration,
    connected,
    callEndedSignal,
    screenSharing,
    incomingOffer,

    localStream,
    remoteStream,

    remoteUser,

    micEnabled,
    cameraEnabled,

    /**
     * Refs
     */

    localVideoRef,
    remoteVideoRef,

    localAudioRef,
    remoteAudioRef,

    /**
     * Actions
     */

    initialize,

    startCall,

    acceptRemoteOffer,

    receiveRemoteAnswer,

    receiveRemoteCandidate,

    endCall,

    toggleMic,

    toggleCamera,

    startScreenShare,

    cleanup,
  };
}

export default useWebRTC;
