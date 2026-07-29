import Avatar from "../shared/Avatar";
import socket from "../../lib/socket";

import { Modal, Button as AntButton } from "antd";

import { PhoneFilled, PhoneOutlined } from "@ant-design/icons";

import type { OfferPayload, CallUser } from "../../types/webrtc";

import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, Outlet, useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { v4 as uuid } from "uuid";

import Context from "../../Context";
import Fetcher from "../../lib/Fetcher";
import CatchError from "../../lib/CatchError";
import HttpInterceptor from "../../lib/HttpInterceptor";

import DesktopLayout from "../responsiveLayout/DesktopLayout";
import MobileLayout from "../responsiveLayout/MobileLayout";

const eightMinutesInMillisecond = 8 * 60 * 1000;

  type IncomingCall = {
    user: CallUser;
    mode: "audio" | "video";
    offer: OfferPayload;
  };

  type IncomingOfferPayload = OfferPayload & {
    type: "audio" | "video";
  };

const Layout = () => {
  const params = useParams();
  const paramsArray = Object.keys(params);
  const ringtone = useRef<HTMLAudioElement | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [incomingOpen, setIncomingOpen] = useState(false);

  const [leftAsideSize, setLeftAsideSize] = useState(280);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

  const [mobileActiveTab, setMobileActiveTab] = useState<
    "workspace" | "discover"
  >("workspace");

  const [activeRightTab, setActiveRightTab] = useState<"activity" | "explore">(
    "activity",
  );

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const rightAsideSize = 340;
  const collapseSize = 75;

  const { error } = useSWR("/auth/refresh-token", Fetcher, {
    refreshInterval: eightMinutesInMillisecond,
    shouldRetryOnError: false,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    session,
    setSession,
    liveActiveSession,
    setLiveActiveSession,
    setSdp,
  } = useContext(Context);

  const isCommunicationView =
    pathname.includes("/app/chat") ||
    pathname.includes("/app/video") ||
    pathname.includes("/app/audio");

  const isCallView =
    pathname.includes("/app/video") || pathname.includes("/app/audio");

  const menus = [
    { href: "/app/dashboard", label: "dashboard", icon: "ri-home-4-line" },
    { href: "/app/posts", label: "my posts", icon: "ri-article-line" },
    { href: "/app/friends", label: "friends", icon: "ri-team-line" },
  ];

  const getPathName = (path: string) => {
    const firstPath = path.split("/").pop();
    return firstPath?.split("-").join(" ") || "";
  };

  const renderActiveSession = () => {
    if (!liveActiveSession) return null;
    return (
      <Avatar
        image={liveActiveSession.image ?? "null"}
        title={liveActiveSession.fullname}
        subtitle="online"
      />
    );
  };

  const uploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      if (!input.files) return;
      const file = input.files[0];
      const path = `profile-picture/${uuid()}.png`;
      const payload = { path, type: file.type, status: "public-read" };
      try {
        const options = { headers: { "Content-Type": file.type } };
        const { data } = await HttpInterceptor.post("/storage/upload", payload);
        await axios.put(data.url, file, options);
        const { data: user } = await HttpInterceptor.put("/auth/profile-picture", { path });
        setSession({ ...session, image: user.image });
        mutate("/auth/refresh-token");
      } catch (err) { CatchError(err); }
    };
  };

  const logout = async () => {
    try {
      await HttpInterceptor.post("/auth/logout");
      setSession(null);
      navigate("/login");
    } catch (err) { CatchError(err); }
  };

  const playRingtone = async () => {
    if (!ringtone.current) return;
    try { ringtone.current.currentTime = 0; await ringtone.current.play(); } catch { /*empty*/ }
  };

  const stopRingtone = () => {
    if (!ringtone.current) return;
    ringtone.current.pause();
    ringtone.current.currentTime = 0;
  };

  const clearIncomingState = () => {
    stopRingtone();
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    setIncomingCall(null);
    setIncomingOpen(false);
  };

  const onOffer = useCallback(
    async (payload: IncomingOfferPayload) => {
      if (incomingCall) { socket.emit("end", { to: payload.from.socketId }); return; }
      setSdp(payload);
      setLiveActiveSession(payload.from);
      setIncomingCall({ user: payload.from, mode: payload.type, offer: payload });
      setIncomingOpen(true);
      await playRingtone();
      timeoutRef.current = setTimeout(() => {
        socket.emit("end", { to: payload.from.socketId });
        clearIncomingState();
      }, 30000);
    },
    [incomingCall, setLiveActiveSession, setSdp],
  );

  const acceptIncomingCall = () => {
    if (!incomingCall) return;
    const targetId = incomingCall.user.id || incomingCall.user._id;
    if (!targetId) return;
    clearIncomingState();
    switch (incomingCall.mode) {
      case "audio": navigate(`/app/audio/${targetId}`); break;
      case "video": navigate(`/app/video/${targetId}`); break;
    }
  };

  const rejectIncomingCall = () => {
    if (!incomingCall) return;
    socket.emit("end", { to: incomingCall.user.socketId });
    clearIncomingState();
  };

  useEffect(() => {
    ringtone.current = new Audio("/sound/ring.mp3");
    ringtone.current.loop = true;
    return () => { ringtone.current?.pause(); ringtone.current = null; };
  }, []);

  useEffect(() => { if (error) logout(); }, [error]);

  useEffect(() => {
    if (!liveActiveSession && isCallView) navigate("/app/dashboard");
  }, [liveActiveSession, isCallView, navigate]);

  useEffect(() => {
    socket.on("offer", onOffer);
    return () => { socket.off("offer", onOffer); };
  }, [onOffer]);

  const IncomingCallModal = (
    <Modal open={incomingOpen} footer={null} centered closable={false} maskClosable={false} destroyOnHidden width={380}>
      <div className="py-6 flex flex-col items-center">
        {incomingCall?.user.image ? (
          <img src={incomingCall.user.image} alt={incomingCall.user.fullname} className="w-28 h-28 rounded-full object-cover shadow-lg" />
        ) : (
          <div className="w-28 h-28 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {incomingCall?.user.fullname?.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
          </div>
        )}
        <h2 className="mt-6 text-2xl font-bold text-slate-800 text-center capitalize">{incomingCall?.user.fullname}</h2>
        <p className="mt-2 text-slate-500 text-center">{incomingCall?.mode === "video" ? "Incoming Video Call..." : "Incoming Voice Call..."}</p>
        <div className="relative mt-8">
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40"></span>
          <div className="relative w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center">
            <PhoneFilled style={{ fontSize: 28 }} />
          </div>
        </div>
        <div className="flex gap-5 mt-10 w-full">
          <AntButton danger size="large" block icon={<PhoneOutlined />} onClick={rejectIncomingCall}>Reject</AntButton>
          <AntButton type="primary" size="large" block icon={<PhoneFilled />} onClick={acceptIncomingCall}>Accept</AntButton>
        </div>
        <p className="mt-6 text-xs text-slate-400">This request will expire in 30 seconds.</p>
      </div>
    </Modal>
  );

  return (
    <>
      <div className="h-dvh flex flex-col bg-slate-50 antialiased text-slate-600 overflow-hidden">
        {/* ===== DESKTOP VIEW (md and up) ===== */}
        <div className="hidden md:flex flex-1 min-h-0">
          {isCommunicationView ? (
            <div className="w-full flex flex-col min-h-0">
              <div className="h-14 border-b border-slate-100 flex items-center px-4 gap-3 shrink-0 bg-slate-50 z-10">
                <button onClick={() => navigate("/app/dashboard")}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-700 active:scale-95 transition-transform">
                  <i className="ri-arrow-left-line text-lg" />
                </button>
                <div className="flex-1 min-w-0">
                  {paramsArray.length > 0 ? renderActiveSession() : (
                    <span className="text-sm font-bold uppercase tracking-wide text-slate-800">{getPathName(pathname)}</span>
                  )}
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <Outlet />
              </div>
            </div>
          ) : (
            <DesktopLayout
              leftAsideSize={leftAsideSize} setLeftAsideSize={setLeftAsideSize}
              rightAsideSize={rightAsideSize} collapseSize={collapseSize}
              pathname={pathname} menus={menus} session={session}
              getPathName={getPathName} uploadImage={uploadImage} logout={logout}
              activeRightTab={activeRightTab} setActiveRightTab={setActiveRightTab}
            />
          )}
        </div>

        {/* ===== MOBILE VIEW (below md) ===== */}
        <div className="md:hidden flex-1 flex flex-col min-h-0">
          {isCommunicationView ? (
            <div className="w-full flex-1 flex flex-col min-h-0">
              <div className="h-14 border-b border-slate-100 flex items-center px-4 gap-3 shrink-0 bg-slate-50 z-10">
                <button onClick={() => navigate("/app/dashboard")}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-700 active:scale-95 transition-transform">
                  <i className="ri-arrow-left-line text-lg" />
                </button>
                <div className="flex-1 min-w-0">
                  {paramsArray.length > 0 ? renderActiveSession() : (
                    <span className="text-sm font-bold uppercase tracking-wide text-slate-800">{getPathName(pathname)}</span>
                  )}
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <Outlet />
              </div>
            </div>
          ) : (
            <MobileLayout
              pathname={pathname} menus={menus} session={session}
              getPathName={getPathName} uploadImage={uploadImage} logout={logout}
              isMobileProfileOpen={isMobileProfileOpen} setIsMobileProfileOpen={setIsMobileProfileOpen}
              mobileActiveTab={mobileActiveTab} setMobileActiveTab={setMobileActiveTab}
              isEditProfileModalOpen={isEditProfileModalOpen} setIsEditProfileModalOpen={setIsEditProfileModalOpen}
            />
          )}
        </div>
      </div>
      {IncomingCallModal}
    </>
  );
};

export default Layout;