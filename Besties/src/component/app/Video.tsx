import { useContext, useEffect, useMemo, useRef, useState, type JSX } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

import Context from "../../Context";

import Button from "../shared/Button";
import Card from "../shared/Card";

import CatchError from "../../lib/CatchError";

import useWebRTC from "../../hooks/useWebRTC";

const getInitials = (name: string = "") =>
  name.trim().split(/\s+/).map((item) => item[0] ?? "").join("").toUpperCase().slice(0, 2) || "??";

const Video = (): JSX.Element | null => {
  const navigate = useNavigate();
  const { session, liveActiveSession, sdp, setSdp } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const acceptedOfferKeyRef = useRef<string | null>(null);

  const {
    status, duration, cameraEnabled, micEnabled, screenSharing,
    callEndedSignal, localVideoRef, remoteVideoRef, remoteUser,
    startCall, endCall, cleanup, toggleMic, toggleCamera, startScreenShare, acceptRemoteOffer,
  } = useWebRTC({ mode: "video", session });

  const participants = useMemo(() => [
    { name: session?.fullname ?? "You", image: session?.image ?? "", initials: getInitials(session?.fullname), local: true },
    { name: remoteUser?.fullname ?? liveActiveSession?.fullname ?? "Unknown", image: remoteUser?.image ?? liveActiveSession?.image ?? "", initials: getInitials(remoteUser?.fullname ?? liveActiveSession?.fullname), local: false },
  ], [session, remoteUser, liveActiveSession]);

  const formattedDuration = useMemo(() => {
    const hrs = Math.floor(duration / 3600);
    const mins = Math.floor((duration % 3600) / 60);
    const secs = duration % 60;
    if (hrs > 0) return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [duration]);

  useEffect(() => { if (!liveActiveSession) navigate("/app/dashboard"); }, [liveActiveSession, navigate]);

  useEffect(() => {
    if (!sdp) return;
    const offerKey = sdp.offer.sdp ?? `${sdp.from.socketId ?? sdp.from.id ?? sdp.from._id}-${sdp.offer.type}`;
    if (acceptedOfferKeyRef.current === offerKey) return;
    acceptedOfferKeyRef.current = offerKey;
    setCallStarted(true);
    acceptRemoteOffer(sdp).then(() => setSdp(null)).catch((err) => { setSdp(null); CatchError(err); });
  }, [sdp, acceptRemoteOffer, setSdp]);

  const handleStartCall = async () => {
    if (!liveActiveSession) return;
    try { setCallStarted(true); await startCall(liveActiveSession); }
    catch (err) { CatchError(err); setCallStarted(false); }
  };

  const handleEndCall = () => { endCall(); setCallStarted(false); setOpen(true); };

  useEffect(() => { if (callEndedSignal !== 0) { setCallStarted(false); setOpen(true); } }, [callEndedSignal]);

  const toggleFullscreen = (element: HTMLVideoElement | null) => {
    if (!element) return;
    if (!document.fullscreenElement) element.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  };

  const redirectOnCallEnd = () => { setOpen(false); navigate("/app/dashboard"); };

  useEffect(() => { return () => { cleanup(); }; }, [cleanup]);

  return (
    <>
      <div className="h-full flex flex-col min-h-0 overflow-y-auto p-2 sm:p-4 space-y-4">
        {/* Remote Video - full width on mobile, responsive aspect ratio */}
        <Card className="overflow-hidden p-0 shrink-0">
          <div className="relative w-full bg-slate-950" style={{ aspectRatio: "16/9", maxHeight: "60vh" }}>
            <video ref={remoteVideoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
            {!participants[1].image && status !== "connected" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                  {participants[1].initials}
                </div>
              </div>
            )}
            <div className="absolute left-2 sm:left-4 bottom-2 sm:bottom-4 rounded-lg bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1 text-xs sm:text-sm text-white font-semibold capitalize truncate max-w-[60%]">
              {participants[1].name}
            </div>
            <button onClick={() => toggleFullscreen(remoteVideoRef.current)}
              className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4 w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition">
              <i className="ri-fullscreen-line text-sm sm:text-base" />
            </button>
          </div>
        </Card>

        {/* Local Video + Controls - stacked on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
          <Card className="overflow-hidden p-0">
            <div className="relative w-full bg-slate-900" style={{ aspectRatio: "4/3" }}>
              <video ref={localVideoRef} muted autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
              {!participants[0].image && !cameraEnabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                    {participants[0].initials}
                  </div>
                </div>
              )}
              <div className="absolute left-2 sm:left-3 bottom-2 sm:bottom-3 rounded-lg bg-black/60 backdrop-blur-sm px-2 py-1 text-xs text-white font-semibold">You</div>
              <button onClick={() => toggleFullscreen(localVideoRef.current)}
                className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition">
                <i className="ri-fullscreen-line text-xs sm:text-sm" />
              </button>
            </div>
          </Card>

          <Card>
            <div className="h-full flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 capitalize truncate">{participants[1].name}</h2>
                <p className="text-sm text-slate-500 capitalize">{status}</p>
                {status === "connected" && (
                  <div className="inline-flex rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold">{formattedDuration}</div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button onClick={toggleCamera}
                  className={`w-12 sm:w-14 h-12 sm:h-14 rounded-full flex items-center justify-center transition ${cameraEnabled ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-slate-200 text-slate-700"}`}>
                  <i className={`text-lg sm:text-xl ${cameraEnabled ? "ri-vidicon-line" : "ri-video-off-line"}`} />
                </button>
                <button onClick={toggleMic}
                  className={`w-12 sm:w-14 h-12 sm:h-14 rounded-full flex items-center justify-center transition ${micEnabled ? "bg-amber-500 text-white hover:bg-amber-600" : "bg-slate-200 text-slate-700"}`}>
                  <i className={`text-lg sm:text-xl ${micEnabled ? "ri-mic-line" : "ri-mic-off-line"}`} />
                </button>
                <button onClick={startScreenShare}
                  className={`w-12 sm:w-14 h-12 sm:h-14 rounded-full flex items-center justify-center transition ${screenSharing ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-700"}`}>
                  <i className="ri-computer-line text-lg sm:text-xl" />
                </button>
              </div>

              <div className="pt-2 sm:pt-4">
                {!callStarted ? (
                  <Button type="success" icon="phone-fill" onClick={handleStartCall} className="w-full text-sm sm:text-base">Start Video Call</Button>
                ) : (
                  <Button type="danger" icon="close-circle-fill" onClick={handleEndCall} className="w-full text-sm sm:text-base">End Call</Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal open={open} footer={null} centered destroyOnHidden maskClosable={false} onCancel={redirectOnCallEnd}>
        <div className="py-6 text-center space-y-5">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
            <i className="ri-phone-off-line text-4xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Call Ended</h2>
            <p className="mt-2 text-slate-500">Thanks for using Besties Video Calling.</p>
          </div>
          <Button type="primary" onClick={redirectOnCallEnd} className="w-full">Back to Dashboard</Button>
        </div>
      </Modal>
    </>
  );
};

export default Video;