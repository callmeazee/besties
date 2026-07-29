// import { useEffect, useState } from "react";
// import moment from "moment";

// interface OnlineUser {
//   _id: string;
//   fullname: string;
//   image?: string;
//   lastActive?: string; // Optional: for display info
// }

// const FriendsOnline = () => {
//   // frontend/src/components/friends/OnlineTray.tsx

//   // Type definition for online users

//   // Collapse state handler
//   const [isOpen, setIsOpen] = useState(true);
//   const [onlineFriends, setOnlineFriends] = useState<OnlineUser[]>([]);

//   // Real-time integration placeholder for socket.io
//   useEffect(() => {
//     /* // Example socket hook setup:
//     socket.on("getOnlineUsers", (users: OnlineUser[]) => {
//        setOnlineFriends(users);
//     });
//     return () => socket.off("getOnlineUsers");
//     */

//     // MOCK DATA: For visual layout testing
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setOnlineFriends([
//       { _id: "1", fullname: "Alex Carter", image: "" },
//       { _id: "2", fullname: "Sarah Jenkins", image: "" },
//       { _id: "3", fullname: "Michael Vance", image: "" },
//       { _id: "4", fullname: "Emma Watson", image: "" },
//       { _id: "5", fullname: "Chris Pratt", image: "" },
//     ]);
//   }, []);

//   return (
//     <div className="shrink-0 transition-all duration-300 ease-in-out">
//       {/* 1. COLLAPSIBLE HEADER CONTROL BAR */}
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className="h-12 px-4 flex items-center justify-between cursor-pointer border-b border-slate-100 select-none bg-slate-50 hover:bg-slate-100/50">
//         <div className="flex items-center gap-2">
//           {/* Active status pulsating green dot indicator */}
//           <span className="relative flex h-2.5 w-2.5">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
//           </span>
//           <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">
//             Online Friends ({onlineFriends.length})
//           </span>
//         </div>

//         {/* Dynamic Angle Direction Arrows */}
//         <button className="text-slate-500 hover:text-indigo-600 transition-colors">
//           <i
//             className={`text-xl leading-none ${isOpen ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line"}`}></i>
//         </button>
//       </div>

//       {/* 2. TRAY BODY: List Content Pane */}
//       <div
//         className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${isOpen ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0"}`}>
//         <div className="p-2 space-y-1.5 overflow-y-auto max-h-[350px] custom-scrollbar">
//           {onlineFriends.length > 0 ? (
//             onlineFriends.map((user, idx) => {
//               const initials = user.fullname
//                 .trim()
//                 .split(/\s+/)
//                 .map((w) => w[0])
//                 .join("")
//                 .toUpperCase()
//                 .slice(0, 2);

//               return (
//                 <div
//                   key={user._id || idx}
//                   className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-all duration-150 group">
//                   {/* Avatar Node Wrapper Frame */}
//                   <div className="relative shrink-0 p-0.5 rounded-full bg-white border border-gray-100">
//                     {user.image ? (
//                       <img
//                         src={user.image}
//                         alt={user.fullname}
//                         className="w-9 h-9 rounded-full object-cover shadow-xs"
//                       />
//                     ) : (
//                       <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
//                         {initials}
//                       </div>
//                     )}
//                     {/* Fixed online status dot indicator badge */}
//                     <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                   </div>

//                   {/* Profile & Immediate Communications Info Frame */}
//                   <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center md:justify-between md:gap-3">
//                     <span className="text-sm font-semibold text-slate-800 capitalize truncate mb-1.5 md:mb-0">
//                       {user.fullname}
//                     </span>

//                     {/* ACTION CONTROLS PANEL: Responsive spacing rules set */}
//                     <div className="flex items-center gap-1.5 shrink-0">
//                       {/* Chat (Message) Action Trigger Button */}
//                       <button
//                         onClick={() =>
//                           alert(`Opening chat with ${user.fullname}`)
//                         }
//                         className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition-all"
//                         title="Start Chat">
//                         <i className="ri-chat-3-line text-base"></i>
//                       </button>

//                       {/* Audio Call Action Trigger Button */}
//                       <button
//                         onClick={() => alert(`Calling ${user.fullname}`)}
//                         className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition-all"
//                         title="Voice Call">
//                         <i className="ri-phone-line text-base"></i>
//                       </button>

//                       {/* Video Call Action Trigger Button */}
//                       <button
//                         onClick={() => alert(`Video calling ${user.fullname}`)}
//                         className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition-all"
//                         title="Video Call">
//                         <i className="ri-vidicon-line text-base"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="h-40 flex items-center justify-center text-xs text-slate-400 font-medium p-4 text-center">
//               No friends are active right now.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FriendsOnline;

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../../lib/socket";
import Context from "../../../Context";

interface OnlineUser {
  id: string;
  _id: string;
  fullname: string;
  image?: string;
}

const FriendsOnline = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [onlineFriends, setOnlineFriends] = useState<OnlineUser[]>([]);
  const { session, setLiveActiveSession } = useContext(Context);
  const navigate = useNavigate();
  const onlineHandler = (users: OnlineUser[]) => {
    setOnlineFriends(users);
  };

  const otherOnlineFriends = session
    ? onlineFriends.filter(
        (item) => {
          const sessionId = (session as any).id ?? (session as any)._id ?? "";
          const itemId = item.id ?? item._id ?? "";
          return itemId !== sessionId;
        }
      )
    : onlineFriends;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateActiveSession = (url: string, user: any) => {
    setLiveActiveSession(user);
    navigate(url);
  };

  useEffect(() => {
    socket.on("online", onlineHandler);
    socket.emit("get-online");

    return () => {
      socket.off("online", onlineHandler);
    };
  }, []);

  return (
    <div className="flex flex-col bg-white">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 px-4 flex items-center justify-between cursor-pointer select-none bg-slate-50/60 hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
            Active Now ({otherOnlineFriends.length})
          </span>
        </div>
        <i
          className={`text-slate-400 text-lg transition-transform duration-200 ${isOpen ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}`}></i>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="p-3 space-y-3 overflow-y-auto max-h-72">
          {session &&
            otherOnlineFriends.map((user) => {
              const initials = user.fullname
                .trim()
                .split(/\s+/)
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between hover:bg-slate-50/50 p-1.5 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.fullname}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          {initials}
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700 truncate capitalize">
                        {user.fullname}
                      </span>
                      <small className="text-green-400 font-semibold">
                        online
                      </small>
                    </div>
                  </div>

                  {/* RESOLVED ACCURATE SIZED 3 MEDIA STREAM ICON TRIGGERS */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        generateActiveSession(`/app/chat/${user.id}`, user)
                      }
                      className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors"
                      title="Chat">
                      <i className="ri-chat-3-line text-sm"></i>
                    </button>
                    <button
                      onClick={() =>
                        generateActiveSession(`/app/audio/${user.id}`, user)
                      }
                      className="w-7 h-7 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition-colors"
                      title="Voice Call">
                      <i className="ri-phone-line text-sm"></i>
                    </button>
                    <button
                      onClick={() =>
                        generateActiveSession(`/app/video/${user.id}`, user)
                      }
                      className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors"
                      title="Video Call">
                      <i className="ri-video-on-line text-sm"></i>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FriendsOnline;
