// import { useState } from "react";
// import Button from "../shared/Button";
// import Card from "../shared/Card";
// import Divider from "../shared/Divider";
// import IconButton from "../shared/IconButton";

// const Post = () => {
//   // Mock dataset updated to reflect true social database schema layouts
//   const [postsList, setPostsList] = useState([
//     {
//       id: 1,
//       caption: "🚀 Just launched the responsive WebRTC call layout engine!",
//       content:
//         "After refactoring the master layout files using pure CSS calculations and upgrading to Tailwind v4 primitives, the UI behaves flawlessly across mobile viewports and monitor zoom actions. No more panel bleeding or hidden components behind drawers!",
//       date: "Jun 3, 2026",
//       time: "11:30 AM",
//       likes: "142",
//       dislikes: "0",
//       commentsCount: "12",
//     },
//     {
//       id: 2,
//       caption: "💡 Quick Tips for Box-Sizing Spill Errors",
//       content:
//         "If your application view containers are bleeding underneath your fixed-position side panels, remember to double-check internal body padding metrics on custom parent Card modules. Explicitly forcing min-w-0 on flex bounds drops overflow errors instantly.",
//       date: "Jun 2, 2026",
//       time: "4:15 PM",
//       likes: "98",
//       dislikes: "2",
//       commentsCount: "5",
//     },
//   ]);

//   const handleDeletePost = (id: number) => {
//     if (
//       confirm("Are you sure you want to permanently delete this timeline post?")
//     ) {
//       setPostsList(postsList.filter((post) => post.id !== id));
//     }
//   };

//   // 3. EMPTY STATE FALLBACK VIEW
//   if (postsList.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
//         <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
//           <i className="ri-article-line text-2xl"></i>
//         </div>
//         <h3 className="text-base font-bold text-slate-800">
//           No posts published yet
//         </h3>
//         <p className="text-xs text-slate-400 mt-1 max-w-60">
//           Your timeline history looks empty. Click the composition banner to
//           broadcast your first text node layout!
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 md:space-y-8 w-full min-w-0 animate__animated animate__fadeIn">
//       {postsList.map((post) => (
//         <Card
//           key={post.id}
//           className="hover:shadow-md transition-shadow duration-300">
//           <div className="space-y-4">
//             {/* METADATA TIMESTAMPS & QUICK EDIT ACTIONS ROW */}
//             <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
//               <time className="text-xs font-semibold text-slate-400 px-1.5 flex items-center gap-1.5">
//                 <i className="ri-time-line text-slate-400 text-sm"></i>
//                 {post.date} • {post.time}
//               </time>

//               <div className="flex items-center gap-2">
//                 <IconButton
//                   type="primary"
//                   icon="edit-line"
//                   title="Edit Post"
//                   className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-600 hover:text-white"
//                   onClick={() =>
//                     alert(`Edit handler triggered for post ID: ${post.id}`)
//                   }
//                 />
//                 <IconButton
//                   type="danger"
//                   icon="delete-bin-4-line"
//                   title="Delete Post"
//                   className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-600 hover:text-white"
//                   onClick={() => handleDeletePost(post.id)}
//                 />
//               </div>
//             </div>

//             {/* MAIN CONTENT BLOCK CONTAINING CAPTION & TEXT */}
//             <div className="space-y-2 px-1">
//               {/* 1. BOLD CAPTION UTILITY ACCORDANCE */}
//               <h2 className="text-base md:text-lg font-bold text-slate-800 tracking-tight leading-snug">
//                 {post.caption}
//               </h2>

//               <p className="text-sm md:text-base text-slate-600 leading-relaxed break-words">
//                 {post.content}
//               </p>
//             </div>

//             <Divider className="my-2 border-slate-100" />

//             {/* SOCIAL ENGAGEMENT ACTION ROW */}
//             <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-0.5">
//               <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-slate-500 hover:bg-slate-100 transition-colors group cursor-pointer">
//                 <i className="ri-thumb-up-line text-base text-slate-400 group-hover:text-blue-500 transition-colors"></i>
//                 <span className="group-hover:text-slate-700">{post.likes}</span>
//               </button>

//               <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-slate-500 hover:bg-slate-100 transition-colors group cursor-pointer">
//                 <i className="ri-thumb-down-line text-base text-slate-400 group-hover:text-amber-500 transition-colors"></i>
//                 <span className="group-hover:text-slate-700">
//                   {post.dislikes}
//                 </span>
//               </button>

//               <button
//                 className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 transition-colors ml-auto cursor-pointer"
//                 onClick={() =>
//                   alert(
//                     `Opening comments layout stream view for post ID: ${post.id}`,
//                   )
//                 }>
//                 <i className="ri-chat-3-line text-base"></i>
//                 <span>{post.commentsCount} Comments</span>
//               </button>
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default Post;


/* 

import { useState } from "react";
import Button from "../shared/Button";
import Card from "../shared/Card";
import Divider from "../shared/Divider";
import IconButton from "../shared/IconButton";

const Dashboard = () => {
  const [newPostText, setNewPostText] = useState("");

  // Mock array schema representing future story data nodes
  const storiesList = [
    { id: 1, name: "Your Story", initials: "RK", isUser: true, hasUnseen: false },
    { id: 2, name: "Azee Khan", initials: "AK", isUser: false, hasUnseen: true },
    { id: 3, name: "John Adams", initials: "JA", isUser: false, hasUnseen: true },
    { id: 4, name: "Rahul Kumar", initials: "RK", isUser: false, hasUnseen: false },
    { id: 5, name: "Sarah Connor", initials: "SC", isUser: false, hasUnseen: true },
  ];

  return (
    <div className="space-y-6 w-full min-w-0 animate__animated animate__fadeIn">
      
//       {/* ========================================================================= */
//       {/* 🌟 FUTURE REUSE COMPONENT: HORIZONTAL STORIES SHELF PANEL                 */}
//       {/* ========================================================================= */}
//       <div className="w-full overflow-hidden bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
//         {/* Horizontal Scroll Track */}
//         <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1 pt-0.5 snap-x">
          
//           {storiesList.map((story) => (
//             <button 
//               key={story.id} 
//               className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 snap-start group"
//               onClick={() => alert(`Future feature: Open full-screen immersive viewer for ${story.name}`)}
//             >
//               {/* Outer Ring Circle Indicator */}
//               <div className={`w-14 h-14 rounded-full flex items-center justify-center p-[2.5px] transition-transform duration-300 group-hover:scale-105 ${
//                 story.isUser 
//                   ? "bg-slate-100 border border-slate-200" 
//                   : story.hasUnseen 
//                     ? "bg-linear-to-tr from-amber-500 via-rose-500 to-indigo-600 animate-pulse" // Colorful ring for new unseen stories
//                     : "bg-slate-200" // Dull gray ring for already viewed stories
//               }`}>
//                 {/* Inside Inner Avatar Node */}
//                 <div className="w-full h-full rounded-full bg-white p-[2px]">
//                   <div className="w-full h-full rounded-full bg-linear-to-tr from-slate-700 to-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-inner relative">
//                     {story.initials}
                    
//                     {/* Tiny '+' Badge on User's own story avatar bubble */}
//                     {story.isUser && (
//                       <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black shadow-sm">
//                         +
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Tiny Profile Username Text Layer */}
//               <span className="text-[11px] font-semibold text-slate-500 truncate max-w-16 group-hover:text-slate-800 transition-colors">
//                 {story.name}
//               </span>
//             </button>
//           ))}

//         </div>
//       </div>

//       {/* 2. COMPOSITION BANNER (CREATE NEW POST COMPONENT) */}
//       <Card className="border-indigo-500/10 shadow-sm">
//         {/* Composition form layout paths go here... */}
//         <div className="text-xs text-slate-400 font-medium">Create Post Banner stays anchored perfectly below Stories...</div>
//       </Card>

//     </div>
//   );
// };

// export default Dashboard;
