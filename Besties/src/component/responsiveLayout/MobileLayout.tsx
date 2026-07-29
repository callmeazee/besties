import type { FC } from "react";
// import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Avatar from "../shared/Avatar";
import Card from "../shared/Card";
import FriendList from "../app/friends/FriendList";
import FriendRequests from "../app/friends/FriendRequests";
import FriendSuggestion from "../app/friends/FriendSuggestion";
import FriendsOnline from "../app/friends/FriendsOnline";
import EditProfileModal from "../../modals/EditProfileModal";

interface MenuItem {
  href: string;
  icon: string;
  label: string;
}

interface SessionData {
  image?: string | null;
  fullname: string;
  email: string;
}

interface MobileLayoutProps {
  pathname: string;
  menus: MenuItem[];
  session: SessionData | null;
  getPathName: (p: string) => string;
  uploadImage: () => void;
  logout: () => void;
  isMobileProfileOpen: boolean;
  setIsMobileProfileOpen: (b: boolean) => void;
  mobileActiveTab: "workspace" | "discover";
  setMobileActiveTab: (t: "workspace" | "discover") => void;
  isEditProfileModalOpen: boolean;
  setIsEditProfileModalOpen: (b: boolean) => void;
}

const MobileLayout: FC<MobileLayoutProps> = ({
  pathname,
  menus,
  session,
  getPathName,
  uploadImage,
  logout,
  isMobileProfileOpen,
  setIsMobileProfileOpen,
  mobileActiveTab,
  setMobileActiveTab,
  isEditProfileModalOpen,
  setIsEditProfileModalOpen,
}) => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* APPLICATION MOBILE TOP HEADER */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 z-30 px-4 flex items-center justify-between shadow-xs">
        <span className="text-xl font-black bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent capitalize tracking-tight">
          Besties
        </span>
        {session && (
          <div
            className="cursor-pointer"
            onClick={() => setIsMobileProfileOpen(true)}>
            <Avatar
              size="md"
              subtitle={null}
              image={session.image || "/images/woman.png"}
            />
          </div>
        )}
      </header>

      {/* CORE DISPLAY WINDOW WITH CONDITIONAL SWITCH OVERLAYS */}
      <main className="flex-1 pt-20 pb-24 px-4 min-w-0">
        {mobileActiveTab === "workspace" ? (
          <Card
            title={
              <div className="text-lg font-bold text-slate-800 capitalize">
                {getPathName(pathname)}
              </div>
            }>
            <Outlet />
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className="bg-white">
              <FriendsOnline />
            </Card>
            <Card className="bg-white">
              <FriendRequests />
            </Card>
            <Card className="bg-white">
              <FriendSuggestion />
            </Card>
            <Card className="bg-white">
              <FriendList />
            </Card>
          </div>
        )}
      </main>

      {/* PWA PILL BOTTOM STICKY CONTROL RAIL DOCK */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 px-2 py-1.5 flex justify-around items-center shadow-lg">
        {menus.map((item, idx) => {
          const isActive =
            mobileActiveTab === "workspace" && pathname === item.href;
          return (
            <Link
              to={item.href}
              key={idx}
              onClick={() => setMobileActiveTab("workspace")}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl font-medium transition-all
                ${isActive ? "text-blue-500" : "text-slate-400"}`}>
              <i className={`${item.icon} text-xl`}></i>
              <span className="text-[10px] capitalize tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* RECTIFIED DISCOVER DISPATCH DOCK SEGMENT ENTRY */}
        <button
          onClick={() => setMobileActiveTab("discover")}
          className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer
            ${mobileActiveTab === "discover" ? "text-blue-500" : "text-slate-400"}`}>
          <i className="ri-compass-3-line text-xl"></i>
          <span className="text-[10px] capitalize tracking-tight">
            Discover
          </span>
        </button>
      </nav>

      {/* THE ORIGINAL MOBILE PROFILE BOTTOM DRAWER DIALOG PANEL SHEET */}
      {isMobileProfileOpen && session && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center transition-all duration-300">
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 space-y-6 shadow-2xl animate-slide-up">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />
            <div className="flex flex-col items-center text-center">
              <div
                className="relative group cursor-pointer"
                onClick={uploadImage}>
                <img
                  src={session.image || "/images/woman.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 shadow-md"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="ri-camera-line text-white text-lg"></i>
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-800 capitalize mt-3">
                {session.fullname}
              </h2>
              <p className="text-sm text-slate-400">{session.email}</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsMobileProfileOpen(false);
                  setIsEditProfileModalOpen(true);
                }}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl w-full text-left bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm transition-all">
                <i className="ri-user-settings-line text-lg text-slate-500"></i>
                <span className="flex-1">Edit Account Details</span>
                <i className="ri-arrow-right-s-line text-slate-400"></i>
              </button>

              <button
                onClick={() => {
                  setIsMobileProfileOpen(false);
                  logout();
                }}
                className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl w-full text-center bg-rose-50 text-rose-600 font-bold text-sm transition-all cursor-pointer hover:bg-rose-100">
                <i className="ri-logout-box-r-line text-lg"></i>
                Logout Account
              </button>

              <button
                onClick={() => setIsMobileProfileOpen(false)}
                className="flex items-center justify-center px-4 py-2.5 rounded-xl w-full text-center text-slate-400 text-xs font-semibold tracking-wide uppercase cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL INTEGRATED PROFILE MANAGEMENT VIEW CONTROLLER SCREEN */}
      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}
    </div>
  );
};

export default MobileLayout;
