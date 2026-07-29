import type { FC } from "react";
import { Link, Outlet } from "react-router-dom";

import Card from "../shared/Card";
import FriendList from "../app/friends/FriendList";
import FriendRequests from "../app/friends/FriendRequests";
import FriendSuggestion from "../app/friends/FriendSuggestion";
import FriendsOnline from "../app/friends/FriendsOnline";

interface MenuItem {
  href: string;
  label: string;
  icon: string;
}

interface SessionData {
  fullname: string;
  email: string;
  image?: string;
}

interface DesktopLayoutProps {
  leftAsideSize: number;
  setLeftAsideSize: (s: number) => void;
  rightAsideSize: number;
  collapseSize: number;
  pathname: string;
  menus: MenuItem[];
  session: SessionData | null;
  getPathName: (p: string) => string;
  uploadImage: () => void;
  logout: () => void;
  activeRightTab: "activity" | "explore";
  setActiveRightTab: (t: "activity" | "explore") => void;
}

const DesktopLayout: FC<DesktopLayoutProps> = ({
  leftAsideSize,
  setLeftAsideSize,
  rightAsideSize,
  collapseSize,
  pathname,
  menus,
  session,
  getPathName,
  uploadImage,
  logout,
  activeRightTab,
  setActiveRightTab,
}) => {
  const isCollapsed = leftAsideSize === collapseSize;
  const actualLeftSize = isCollapsed ? collapseSize : Math.min(leftAsideSize, 260);

  return (
    <div className="w-full flex h-full bg-slate-50">
      {/* LEFT SIDEBAR - Desktop only (lg: ≥1024px) */}
      <aside
        style={{ width: actualLeftSize }}
        className="hidden lg:flex fixed top-0 left-0 h-full z-20 flex-col transition-all duration-300 bg-linear-to-b from-[#1e1b4b] via-[#312e81] to-[#4c1d95]">
        <div className={`flex items-center gap-2.5 px-4 py-4 border-b border-white/10 ${isCollapsed ? "justify-center px-0" : ""}`}>
          <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
            <i className="ri-heart-pulse-fill text-white text-base"></i>
          </div>
          {!isCollapsed && <span className="text-white font-black text-lg tracking-tight capitalize">besties</span>}
        </div>
        <div className="flex-1 flex flex-col px-3 py-4 gap-6 overflow-hidden">
          {session && (
            <div onClick={uploadImage} className={`flex ${isCollapsed ? "justify-center" : "items-center gap-3"} cursor-pointer group`}>
              <div className="relative shrink-0">
                <div className="p-0.5 rounded-full bg-linear-to-br from-violet-400 to-pink-400">
                  <img src={session.image || "/images/woman.png"} className="w-10 h-10 rounded-full object-cover border-2 border-[#1e1b4b]" alt="avatar" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#1e1b4b] rounded-full"></span>
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-white text-sm font-semibold capitalize truncate leading-tight">{session.fullname}</span>
                  <span className="text-indigo-300 text-[11px] truncate mt-0.5">{session.email}</span>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col gap-1 w-full">
            {!isCollapsed && <span className="text-[10px] font-bold tracking-widest text-indigo-400/70 uppercase px-3 mb-1">Menu</span>}
            {menus.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link to={item.href} key={idx} title={isCollapsed ? item.label : ""}
                  className={`flex items-center ${isCollapsed ? "justify-center px-2" : "px-3"} py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                    ${isActive ? "bg-white text-[#312e81] shadow-lg shadow-black/20" : "text-indigo-200 hover:bg-white/10 hover:text-white"}`}>
                  <i className={`${item.icon} text-lg ${!isCollapsed ? "mr-3" : ""}`}></i>
                  {!isCollapsed && <span className="capitalize truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="px-3 py-4 border-t border-white/10 flex flex-col gap-1">
          <button onClick={() => setLeftAsideSize(isCollapsed ? 260 : collapseSize)}
            className={`flex items-center ${isCollapsed ? "justify-center px-2" : "px-3 gap-3"} py-2.5 rounded-xl w-full text-indigo-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer`}>
            <i className={`text-lg ${isCollapsed ? "ri-arrow-right-double-line" : "ri-arrow-left-double-line"}`}></i>
            {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
          </button>
          <button onClick={logout} title={isCollapsed ? "Logout" : ""}
            className={`flex items-center ${isCollapsed ? "justify-center px-2" : "px-3 gap-3"} py-2.5 rounded-xl w-full text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-all cursor-pointer`}>
            <i className="ri-logout-box-r-line text-lg"></i>
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* CORE WORKSPACE PANEL - margin only on lg screens when sidebars are visible */}
      <main className={`flex-1 min-w-0 min-h-0 transition-all duration-300 overflow-y-auto p-4 lg:p-6 ${
        // On lg screens, add left margin for sidebar
        "lg:ml-[260px]"
      } ${
        // On lg screens, add right margin for right sidebar
        "lg:mr-[340px]"
      }`}>
        <Card title={<div className="text-xl font-extrabold text-slate-800 capitalize">{getPathName(pathname)}</div>}>
          <Outlet />
        </Card>
      </main>

      {/* RIGHT SIDE PANEL - Desktop only (lg: ≥1024px) */}
      <aside style={{ width: rightAsideSize }}
        className="hidden lg:flex fixed top-0 right-0 h-full border-l border-slate-100 bg-white z-20 flex-col overflow-hidden">
        <div className="grid grid-cols-2 border-b border-slate-100 bg-slate-50/50 p-2 gap-2 shrink-0">
          <button onClick={() => setActiveRightTab("activity")}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer
              ${activeRightTab === "activity" ? "bg-white text-slate-900 shadow-sm border border-slate-200/40" : "text-slate-500 hover:bg-slate-100"}`}>
            Activity Feed
          </button>
          <button onClick={() => setActiveRightTab("explore")}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer
              ${activeRightTab === "explore" ? "bg-white text-slate-900 shadow-sm border border-slate-200/40" : "text-slate-500 hover:bg-slate-100"}`}>
            Explore
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeRightTab === "activity" ? (
            <div className="flex flex-col h-full divide-y divide-slate-100">
              <FriendsOnline />
              <FriendList />
            </div>
          ) : (
            <div className="flex flex-col h-full divide-y divide-slate-100">
              <FriendRequests />
              <FriendSuggestion />
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default DesktopLayout;