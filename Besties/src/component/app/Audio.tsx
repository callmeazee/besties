import { useContext, useEffect, useMemo, useRef, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

import Context from "../../Context";

import Button from "../shared/Button";
import Card from "../shared/Card";

import CatchError from "../../lib/CatchError";

import useWebRTC from "../../hooks/useWebRTC";

const getInitials = (name: string = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((item) => item[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

const AudioChat = (): JSX.Element | null => {
  const navigate = useNavigate();

  const {
    session,

    liveActiveSession,

    sdp,

    setSdp,
  } = useContext(Context);

  const [open, setOpen] = useState(false);

  const [callStarted, setCallStarted] = useState(false);


  const acceptedOfferKeyRef = useRef<string | null>(null);

  const {
    status,

    duration,

    micEnabled,

    callEndedSignal,

    localAudioRef,

    remoteAudioRef,

    remoteUser,

    startCall,

    endCall,

    cleanup,

    toggleMic,

    acceptRemoteOffer,
  } = useWebRTC({
    mode: "audio",

    session,
  });

  /**
   * ======================================================
   * Participants
   * ======================================================
   */

  const participants = useMemo(
    () => [
      {
        name: session?.fullname ?? "You",

        initials: getInitials(session?.fullname),

        image: session?.image ?? "",

        speaking: micEnabled,

        local: true,
      },

      {
        name: remoteUser?.fullname ?? liveActiveSession?.fullname ?? "Unknown",

        initials: getInitials(
          remoteUser?.fullname ?? liveActiveSession?.fullname,
        ),

        image: remoteUser?.image ?? liveActiveSession?.image ?? "",

        speaking: status === "connected",

        local: false,
      },
    ],
    [session, remoteUser, liveActiveSession, micEnabled, status],
  );
  /**
   * ======================================================
   * Redirect if Session Lost
   * ======================================================
   */

  useEffect(() => {
    if (!liveActiveSession) {
      navigate("/app/dashboard");
    }
  }, [liveActiveSession, navigate]);

  /**
   * ======================================================
   * Incoming Offer
   * Layout owns signaling.
   * Audio only accepts the SDP.
   * ======================================================
   */

  useEffect(() => {
    if (!sdp) return;

    const offerKey = sdp.offer.sdp ?? `${sdp.from.socketId ?? sdp.from.id ?? sdp.from._id}-${sdp.offer.type}`;

    if (acceptedOfferKeyRef.current === offerKey) return;

    acceptedOfferKeyRef.current = offerKey;
    setCallStarted(true);

    acceptRemoteOffer(sdp).then(() => {
      setSdp(null);
    }).catch((err) => {
      setSdp(null);
      CatchError(err);
    });
  }, [sdp, acceptRemoteOffer, setSdp]);

  /**
   * ======================================================
   * Start Call
   * ======================================================
   */

  const handleStartCall = async () => {
    if (!liveActiveSession) return;

    try {
      setCallStarted(true);

      await startCall(liveActiveSession);
    } catch (err) {
      CatchError(err);

      setCallStarted(false);
    }
  };

  /**
   * ======================================================
   * End Call
   * ======================================================
   */

  const handleEndCall = () => {
    endCall();

    setCallStarted(false);

    setOpen(true);
  };

  useEffect(() => {
    if (callEndedSignal === 0) return;

    setCallStarted(false);
    setOpen(true);
  }, [callEndedSignal]);
  /**
   * ======================================================
   * Modal
   * ======================================================
   */

  const redirectOnCallEnd = () => {
    setOpen(false);

    navigate("/app/dashboard");
  };

  /**
   * ======================================================
   * Format Duration
   * ======================================================
   */

  const formattedDuration = useMemo(() => {
    const hrs = Math.floor(duration / 3600);

    const mins = Math.floor((duration % 3600) / 60);

    const secs = duration % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, [duration]);

  /**
   * ======================================================
   * Cleanup
   * ======================================================
   */

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return (
    <>
      <audio ref={localAudioRef} hidden muted playsInline />

      <audio ref={remoteAudioRef} hidden autoPlay playsInline />

      {!callStarted ? (
        <div className="flex items-center justify-center min-h-[65vh]">
          <Card className="w-full max-w-md">
            <div className="flex flex-col items-center py-8 gap-6">
              <div className="relative">
                {participants[1].image ? (
                  <img
                    src={participants[1].image}
                    alt={participants[1].name}
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {participants[1].initials}
                  </div>
                )}
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold capitalize text-slate-800">
                  {participants[1].name}
                </h2>

                <p className="text-sm text-slate-500 mt-2 capitalize">
                  {status === "calling"
                    ? "Calling..."
                    : status === "incoming"
                      ? "Incoming Call"
                      : "Ready to Call"}
                </p>
              </div>

              <button
                onClick={handleStartCall}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all text-white flex items-center justify-center shadow-lg">
                <i className="ri-phone-fill text-2xl" />
              </button>

              <span className="text-xs text-slate-400">
                Tap to start audio call
              </span>
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {participants.map((user, index) => (
              <Card key={index}>
                <div className="flex flex-col items-center py-6">
                  <div
                    className={`relative rounded-full p-1.5 transition-all duration-300 ${
                      user.speaking
                        ? "ring-4 ring-emerald-500 bg-emerald-500/10"
                        : "ring-2 ring-slate-200"
                    }`}>
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-36 h-36 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-36 h-36 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                        {user.initials}
                      </div>
                    )}

                    <div
                      className={`absolute bottom-1 right-1 w-10 h-10 rounded-full flex items-center justify-center ${
                        user.speaking
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-400 text-white"
                      }`}>
                      <i
                        className={
                          user.speaking
                            ? "ri-mic-line animate-bounce"
                            : "ri-mic-off-line"
                        }
                      />
                    </div>
                  </div>

                  <h2 className="mt-5 text-lg font-semibold capitalize">
                    {user.name}
                    {user.local && (
                      <span className="ml-2 text-xs text-slate-400">(You)</span>
                    )}
                  </h2>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMic}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
                    micEnabled
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}>
                  <i
                    className={`text-2xl ${
                      micEnabled ? "ri-mic-line" : "ri-mic-off-line"
                    }`}
                  />
                </button>

                <button className="w-14 h-14 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center">
                  <i className="ri-volume-up-line text-2xl" />
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-400">Status</p>

                <h3 className="font-semibold capitalize">{status}</h3>

                {status === "connected" && (
                  <p className="text-sm text-slate-500 mt-1">
                    {formattedDuration}
                  </p>
                )}
              </div>

              <Button
                onClick={handleEndCall}
                type="danger"
                icon="close-circle-fill"
                className="px-8 py-3">
                End Call
              </Button>
            </div>
          </Card>

          <Modal
            open={open}
            footer={null}
            centered
            destroyOnHidden
            maskClosable={false}
            onCancel={redirectOnCallEnd}>
            <div className="py-6 text-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <i className="ri-phone-off-line text-4xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Call Ended</h2>

                <p className="text-slate-500 mt-2">
                  Thanks for using Besties Audio Calling.
                </p>
              </div>

              <Button
                type="primary"
                onClick={redirectOnCallEnd}
                className="w-full">
                Back to Dashboard
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AudioChat;