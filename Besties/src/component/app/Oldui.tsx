// {/* <aside
//   className="bg-white p-4 lg:p-8 overflow-auto border-t lg:border-t-0 lg:border-l border-gray-100
//                    w-full lg:fixed lg:top-0 lg:right-0 lg:h-full"
//   style={
//     {
//       width: "100%",
//       maxWidth: "var(--right-max-w, 100%)",
//       "--right-max-w": `calc(0px + ${rightAsideSize}px)`,
//       // Enforces hard structural limits cleanly on zoom
//     } as React.CSSProperties
//   }>
//   <Card title="my friends" divider>
//     <div className="space-y-4 max-h-125 lg:max-h-none overflow-y-auto pr-1">
//       {Array(20)
//         .fill(0)
//         .map((_, idx) => (
//           <div
//             key={idx}
//             className="p-3 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100/70 transition-colors">
//             <Avatar
//               size="md"
//               image="/images/man1.png"
//               title="John adams"
//               subtitle={
//                 <small
//                   className={
//                     idx % 2 === 0
//                       ? "text-green-500 font-medium"
//                       : "text-zinc-400"
//                   }>
//                   {idx % 2 === 0 ? "• Online" : "Offline"}
//                 </small>
//               }
//             />

//             {/* Action Row Fixed Order: Message -> Audio -> Video */}
//             <div className="flex items-center gap-3">
//               <Link to="/app/chat">
//                 <button
//                   className="p-1 cursor-pointer transition-transform hover:scale-110"
//                   title="chat">
//                   <i className="ri-chat-3-line text-xl text-blue-500 hover:text-blue-600"></i>
//                 </button>
//               </Link>
//               <Link to="/app/audio">
//                 <button
//                   className="p-1 cursor-pointer transition-transform hover:scale-110"
//                   title="audio call">
//                   <i className="ri-phone-line text-xl text-indigo-500 hover:text-indigo-600"></i>
//                 </button>
//               </Link>
//               <Link to="/app/video">
//                 <button
//                   className="p-1 cursor-pointer transition-transform hover:scale-110"
//                   title="video call">
//                   <i className="ri-video-on-line text-xl text-emerald-500 hover:text-emerald-600"></i>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//     </div>
//   </Card>
// </aside>; */}

/* 
  import Button from "../shared/Button";
    const Video = () => {
  return (
    <div className="space-y-8">
      <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl shadow-inner overflow-hidden">
        <video className="w-full h-full absolute top-0 left-0 object-cover"></video>

        <button className="absolute bottom-4 right-4 text-xs px-2.5 py-1 rounded-lg text-white bg-black/40 backdrop-blur-md">
          Rahul Kumar
        </button>

        <button className="absolute bottom-4 left-4 text-xs px-2.5 py-1 rounded-lg text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 bg-white/30">
          <i className="ri-fullscreen-exit-line"></i>
        </button>
      </div>

      <div
        // className="grid grid-cols-3 gap-4"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden shadow">
          <video className="w-full h-full absolute top-0 left-0 object-cover"></video>
          <button className="absolute bottom-2 right-2 text-xs px-2.5 py-1 rounded-lg text-white bg-white/30 ">
            Rahul Kumar
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <button className="bg-green-500 text-white w-12 h-12 rounded-full hover:bg-green-400 hover:text-white">
            <i className="ri-video-on-ai-line"></i>
          </button>

          <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-400 hover:text-white">
            <i className="ri-mic-line"></i>
          </button>

          <button className="bg-green-500 text-white w-12 h-12 rounded-full hover:bg-green-400 hover:text-white">
            <i className="ri-mic-line"></i>
          </button>
        </div>
        <Button icon="close-circle-fill" type="danger">
          End
        </Button>
      </div>
    </div>
  );
}

export default Video 
*/

// import Button from "../shared/Button";

// const Video = () => {
//   return (
//     <div className="space-y-6 md:space-y-8">
//       {/* MAIN VIDEO TRACK CONTAINER */}
//       <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl shadow-inner overflow-hidden">
//         <video className="w-full h-full absolute top-0 left-0 object-cover"></video>

//         {/* Username Label */}
//         <button className="absolute bottom-4 left-4 text-xs px-2.5 py-1 rounded-lg text-white bg-black/40 backdrop-blur-md">
//           Rahul Kumar (You)
//         </button>

//         {/* Controls Overlay */}
//         <button className="absolute bottom-4 right-4 text-xs p-2 rounded-lg text-white transition-all duration-200 hover:bg-white/20 bg-black/40 backdrop-blur-md active:scale-95">
//           <i className="ri-fullscreen-line text-sm"></i>
//         </button>
//       </div>

//       {/* SECONDARY PARTICIPANTS GRID */}
//       {/* Mobile: 1 column | Desktop: 3 columns */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {/* Participant Item 1 */}
//         <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden shadow">
//           <video className="w-full h-full absolute top-0 left-0 object-cover"></video>
//           <button className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-md text-white bg-black/50 backdrop-blur-sm">
//             Rahul Kumar
//           </button>
//         </div>

//         {/* Participant Item 2 Placeholder */}
//         <div className="bg-zinc-800 w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden flex items-center justify-center">
//           <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">
//             <span>Camera Off</span>
//           </div>
//         </div>

//         {/* Participant Item 3 Placeholder */}
//         <div className="bg-zinc-800 w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden flex items-center justify-center">
//           <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">
//             <span>Camera Off</span>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM CONTROL MEDIA ACTION ROW */}
//       {/* Mobile: Wraps to layout naturally | Desktop: Spread row split */}
//       <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
//         {/* Toggle Panel Buttons */}
//         <div className="flex items-center gap-3">
//           {/* Camera Button */}
//           <button className="bg-emerald-500 text-white w-12 h-12 rounded-full hover:bg-emerald-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-emerald-100">
//             <i className="ri-vidicon-line text-xl"></i>
//           </button>

//           {/* Microphone Button */}
//           <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-amber-100">
//             <i className="ri-mic-line text-xl"></i>
//           </button>

//           {/* Screen Share Button */}
//           <button className="bg-blue-500 text-white w-12 h-12 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-blue-100">
//             <i className="ri-computer-line text-xl"></i>
//           </button>
//         </div>

//         {/* End Call Action Button */}
//         <div className="w-full sm:w-auto">
//           <Button
//             icon="close-circle-fill"
//             type="danger"
//           >
//             End Call
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video;

/* 

      // BOTTOM CONTROL MEDIA ACTION ROW 
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        // Toggle Panel Buttons 
        <div className="flex items-center gap-3">
          // Camera Button 
          <button className="bg-emerald-500 text-white w-12 h-12 rounded-full hover:bg-emerald-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-emerald-100">
            <i className="ri-vidicon-line text-xl"></i>
          </button>

          // Microphone Button 
          <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-amber-100">
            <i className="ri-mic-line text-xl"></i>
          </button>

          //Screen Share Button 
          <button className="bg-blue-500 text-white w-12 h-12 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-blue-100">
            <i className="ri-computer-line text-xl"></i>
          </button>
        </div>

        // End Call Action Button 
        <div className="w-full sm:w-auto">
          <Button
            icon="close-circle-fill"
            type="danger"
         >
            End Call
          </Button>
        </div>
      </div>

*/

/* import Button from "../shared/Button";


import Card from "../shared/Card";

const Audio = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card title="Azee khan">
          <div className="flex flex-col items-center">
            <img
              src=""
              alt="avatar"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
        </Card>
        <Card title="Azee khan">
          <div className="flex flex-col items-center">
            <img
              src=""
              alt="avatar"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
        </Card>
      </div>

    
 
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
       
        <div className="flex items-center gap-3">
       
         

       
          <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-amber-100">
            <i className="ri-mic-line text-xl"></i>
          </button>

       
    
        </div>

    
        <div className="w-full sm:w-auto">
          <Button icon="close-circle-fill" type="danger">
            End Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Audio; */

/* import Card from "../shared/Card"


const Friends = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {Array(20)
        .fill(0)
        .map((item, idx) => (
          <Card key={idx}>
            <div className="flex flex-col items-center gap-3">
              <img src="/images/coding.png" />
              <h1 className="text-base font-medium text-black">John alex</h1>
              <button className="bg-indigo-400 text-white rounded px-2 py-1 text-xs hover:bg-indigo-500 mt-1 font-medium">
                <i className="ri-user-minus-line mr-1"></i>
                Unfriend
              </button>
            </div>
          </Card>
        ))}
    </div>
  );
}

export default Friends */

/* 
import Button from "../shared/Button"
import Card from "../shared/Card"
import Divider from "../shared/divider"
import IconButton from "../shared/IconButton"


const Post = () => {
  return (
    <div className="space-y-8">
      {
        Array(20).fill(0).map((item, idx) => (
          <Card key={idx}>
            <div className="space-y-3">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio excepturi, ex perspiciatis magnam totam similique incidunt quasi quo voluptas odit distinctio aut nostrum, id eos, repudiandae corrupti aliquam blanditiis.
              </p>
              <div className="flex justify-between items-center">
                <label className="text-sm font-normal">Jan 2, 2030 7:00pm</label>
                <div className="flex gap-4">
                  <IconButton type= 'info' icon="edit-line"/>
                  <IconButton type= 'danger' icon="delete-bin-4-line"/>

                </div>

              </div>
              <Divider />
              <div className="space-x-4">
               <Button icon="thumb-up-line" type="info">20k</Button>
               <Button icon="thumb-down-line" type="warning">2k</Button>
               <Button icon="chat-ai-line" type="info">1.5k</Button>

              </div>

            </div>
          </Card>
        ))
      }
    </div>
  )
}

export default Post


*/

/* 

*/

/* 

// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import Avatar from "../shared/Avatar";
// import Card from "../shared/Card";
// import { useContext, useState } from "react";
// import type { CSSProperties } from "react";
// import Context from "../../Context";
// import HttpInterceptor from "../../lib/HttpInterceptor";
// import { v4 as uuid } from "uuid";
// import useSWR, { mutate } from "swr";
// import Fetcher from "../../lib/Fetcher";
// import CatchError from "../../lib/CatchError";

// const eightMinutesInMillisecond = 8 * 60 * 1000;

// const Layout = () => {
//   const [leftAsideSize, setLeftAsideSize] = useState(350);
//   const rightAsideSize = 450;
//   const collapseSize = 130;

//   useSWR("/auth/refresh-token", Fetcher, {
//     //our token exoires in 10 mi9nutes so 2 minutes before we have to refresh it
//     refreshInterval: eightMinutesInMillisecond,
//     shouldRetryOnError: false,
//   });

//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { session, setSession } = useContext(Context);

//   const menus = [
//     {
//       href: "/app/dashboard",
//       label: "dashboard",
//       icon: "ri-home-4-line",
//     },
//     {
//       href: "/app/posts",
//       label: "my posts",
//       icon: "ri-article-line",
//     },
//     {
//       href: "/app/friends",
//       label: "friends",
//       icon: "ri-team-line",
//     },
//   ];

//   const getPathName = (path: string) => {
//     const firstPath = path.split("/").pop();
//     const secondPath = firstPath?.split("-").join(" ");
//     return secondPath;
//   };

//   const uploadImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.click();
//     input.onchange = async () => {
//       if (!input.files) return;

//       const file = input.files[0];
//       const path = `profile-picture/${uuid()}.png`;
//       const payload = {
//         path: path,
//         type: file.type,
//       };

//       try {
//         const options = {
//           headers: {
//             "Content-Type": file.type,
//           },
//         };
//         const { data } = await HttpInterceptor.post("/storage/upload", payload);
//         console.log(data);
//         await HttpInterceptor.put(data.url, file, options);
//         const { data: user } = await HttpInterceptor.put(
//           "/auth/profile-picture",
//           { path: path },
//         );
//         setSession({ ...session, image: user.image });
//         mutate("/auth/refresh-token");
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   };

//   const logout = async () => {
//     try {
//       await HttpInterceptor.post("/auth/logout");
//       navigate("/login");
//     } catch (err) {
//       CatchError(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 lg:flex lg:flex-row overflow-x-hidden">
//       {/* LEFT NAVIGATION DRAWER */
//       {/* Mobile: Bottom Fixed Bar | Desktop: Fixed Left Sidebar with state width changes */}
//       <aside
//         className="fixed bottom-0 left-0 w-full z-50 p-2 bg-white/80 backdrop-blur-xl border-t border-white/20
//                    lg:top-0 lg:bottom-auto lg:h-full lg:p-6 lg:border-t-0 lg:border-r lg:bg-white/5"
//         style={
//           {
//             width: "var(--left-width, 100%)",
//             transition: "width 0.2s ease-in-out",
//             "--left-width": `calc(100vw * 0 + ${leftAsideSize}px)`, // Flips gracefully using pure CSS rules on desktop layouts
//           } as React.CSSProperties
//         }>
//         {/* We use a Tailwind override to break standard mobile dimensions on desktop viewports */}
//         <div
//           className={`h-full rounded-2xl lg:rounded-[28px] shadow-2xl px-4 py-3 lg:py-6 flex flex-row lg:flex-col justify-between lg:justify-start ${
//             leftAsideSize === collapseSize ? "lg:items-center" : ""
//           } transition-all duration-500 ease-in-out`}
//           style={{
//             background:
//               "linear-gradient(160deg,#3b1f7a 0%,#1e1060 35%,#100d3a 65%,#0a0d28 100%)",
//           }}>
//           {/* User Profile */}
//           <div className="hidden lg:block animate__animated animate__fadeIn">
//             {session && (
//               <Avatar
//                 title={leftAsideSize === collapseSize ? null : session.fullname}
//                 size={leftAsideSize === collapseSize ? "md" : "lg"}
//                 subtitle={session.email}
//                 titleColor="white"
//                 subtitleColor="#ddd"
//                 image={session.image || "/images/woman.png"}
//                 onClick={uploadImage}
//               />
//             )}
//           </div>

//           <div className="hidden lg:block border-b border-white/10 pt-2 mt-5 -mx-4" />

//           {/* Navigation Links */}
//           <div className="flex flex-row lg:flex-col justify-around lg:justify-start gap-2 flex-1 lg:pt-2 lg:mt-6 w-full">
//             {menus.map((item, idx) => (
//               <Link
//                 title={item.label}
//                 to={item.href}
//                 key={idx}
//                 className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-3 py-1.5 lg:px-3.5 lg:py-2.5 rounded-xl text-[#b8aadf] text-xs lg:text-sm font-medium
//                            transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060]">
//                 <i className={`${item.icon} text-lg lg:text-xl`}></i>
//                 <span
//                   className={`capitalize ${leftAsideSize === collapseSize ? "lg:hidden" : ""}`}>
//                   {item.label}
//                 </span>
//               </Link>
//             ))}
//           </div>

//           <div className="hidden lg:block border-t border-white/10 pt-2">
//             <button
//               onClick={logout}
//               title="logout"
//               className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl w-full text-left
//                         text-[#b8aadf] text-sm font-medium transition-all duration-150 cursor-pointer
//                         hover:bg-red-500/15 hover:text-red-300 mt-3">
//               <i className="ri-logout-box-r-line text-xl"></i>
//               <span
//                 className={leftAsideSize === collapseSize ? "lg:hidden" : ""}>
//                 Logout
//               </span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       {/* Uses pure CSS calc properties to dynamically subtract spacing parameters without layout shifts */}
//       <main
//         className="flex-1 rounded-2xl py-6 px-4 mb-20 lg:mb-0 lg:py-8 lg:px-6 w-full"
//         style={
//           {
//             width: "100%",
//             marginLeft: "var(--main-ml, 0px)",
//             marginRight: "var(--main-mr, 0px)",
//             transition: "margin 0.3s ease-in-out",
//             // Real-time CSS calc values targeting desktop boundaries natively
//             "--main-ml": `calc(0px + ${leftAsideSize}px)`,
//             "--main-mr": `calc(0px + ${rightAsideSize}px)`,
//           } as CSSProperties
//         }>
//         <Card
//           title={
//             <div className="flex gap-6 items-center">
//               <button
//                 className="hidden lg:block bg-gray-100 w-10 h-10 rounded-full hover:bg-slate-200 cursor-pointer"
//                 onClick={() =>
//                   setLeftAsideSize(leftAsideSize === 350 ? collapseSize : 350)
//                 }>
//                 <i
//                   className={
//                     leftAsideSize === collapseSize
//                       ? "ri-arrow-right-line"
//                       : "ri-arrow-left-line"
//                   }></i>
//               </button>
//               <h1 className="text-xl font-bold text-slate-800 lg:text-2xl">
//                 {getPathName(pathname)}
//               </h1>
//             </div>
//           }>
//           <Outlet />
//         </Card>
//       </main>

//       {/* RIGHT FRIENDS DRAWER */}
//       {/* Mobile: Bottom linear stack | Desktop: Hard-locked right edge panel using safe width specifications */}
//       <aside
//         className="p-4 lg:p-6 overflow-auto border-t lg:border-t-0 lg:border-l border-gray-100 w-full lg:fixed lg:top-0 lg:right-0 lg:h-full z-40"
//         style={
//           {
//             width: "100%",
//             maxWidth: "var(--right-max-w, 100%)",
//             "--right-max-w": `calc(0px + ${rightAsideSize}px)`,
//           } as React.CSSProperties
//         }>
//         <Card className="h-full" noPadding>
//           <div className="flex flex-col h-full divide-y divide-gray-100">
//             {/* 1. SUGGESTED FRIENDS SECTION (TOP) */}
//             <div className="p-4 shrink-0">
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
//                   Suggested Friends
//                 </h2>
//                 <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
//                   See All
//                 </button>
//               </div>

//               {/* Horizontal Scrollable Row for Suggestions */}
//               <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-hide snap-x">
//                 {Array(15)
//                   .fill(0)
//                   .map((_, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center min-w-27.5 snap-start hover:shadow-sm transition-shadow">
//                       {/* Compact Avatar Fallback */}
//                       <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm mb-2 shadow-sm">
//                         SF
//                       </div>
//                       <h4 className="text-xs font-bold text-slate-700 truncate w-full max-w-22.5">
//                         Alex Rivera
//                       </h4>
//                       <p className="text-[10px] text-slate-400 mb-2 truncate w-full max-w-22.5">
//                         Mutual Friend
//                       </p>
//                       {/* Quick Add Button */}
//                       <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-colors w-full cursor-pointer flex items-center justify-center gap-1">
//                         <i className="ri-user-add-line"></i> Add
//                       </button>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* 2. MY FRIENDS LIST SECTION (BOTTOM) */}
//             {/* flex-1 min-h-0 and flex flex-col allows the main list to take up all remaining height perfectly */}
//             <div className="flex-1 min-h-0 flex flex-col p-4">
//               <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 shrink-0">
//                 My Friends
//               </h2>

//               {/* Scrollable list frame */}
//               <div className="flex-1 overflow-y-auto space-y-4 pr-1">
//                 {Array(20)
//                   .fill(0)
//                   .map((_, idx) => (
//                     <div
//                       key={idx}
//                       className="p-3 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100/70 transition-colors">
//                       <Avatar
//                         size="md"
//                         image="/images/man1.png"
//                         title="John adams"
//                         subtitle={
//                           <small
//                             className={
//                               idx % 2 === 0
//                                 ? "text-green-500 font-medium"
//                                 : "text-zinc-400"
//                             }>
//                             {idx % 2 === 0 ? "• Online" : "Offline"}
//                           </small>
//                         }
//                       />

//                       {/* Action Row Fixed Order: Message -> Audio -> Video */}
//                       <div className="flex items-center gap-3">
//                         <Link to="/app/chat">
//                           <button
//                             className="p-1 cursor-pointer transition-transform hover:scale-110"
//                             title="chat">
//                             <i className="ri-chat-3-line text-xl text-blue-500 hover:text-blue-600"></i>
//                           </button>
//                         </Link>
//                         <Link to="/app/audio">
//                           <button
//                             className="p-1 cursor-pointer transition-transform hover:scale-110"
//                             title="audio call">
//                             <i className="ri-phone-line text-xl text-indigo-500 hover:text-indigo-600"></i>
//                           </button>
//                         </Link>
//                         <Link to="/app/video">
//                           <button
//                             className="p-1 cursor-pointer transition-transform hover:scale-110"
//                             title="video call">
//                             <i className="ri-video-on-line text-xl text-emerald-500 hover:text-emerald-600"></i>
//                           </button>
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         </Card>
//       </aside>

//       {/* Embedded CSS Breakpoint overrides so standard styles behave flawlessly on browser zoom events */}
//       <style>{`
//         @media (max-width: 1023px) {
//           aside, main {
//             margin-left: 0px !important;
//             margin-right: 0px !important;
//             width: 100% !important;
//             max-width: 100% !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Layout;

/* 

import useSWR, { mutate } from "swr";
import Fetcher from "../../lib/Fetcher";
import { Empty, Skeleton } from "antd";
import NotFound from "../shared/NotFound";
import Button from "../shared/Button";
import CatchError from "../../lib/CatchError";
import HttpInterceptor from "../../lib/HttpInterceptor";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";

// Expanded to track exactly WHICH action is loading per index row
interface LoadingInterface {
  state: boolean;
  index: null | number;
  action: "accept" | "reject" | null;
}

// Strongly-typed friend request item
interface FriendRequestItem {
  _id: string;
  user?: {
    fullname?: string;
    image?: string;
  } | null;
  createdAt: string;
}

const FriendRequests = () => {
  const [loading, setLoading] = useState<LoadingInterface>({
    state: false,
    index: null,
    action: null,
  });

  // Fetching data from your incoming friend requests route
  const { data, error, isLoading } = useSWR("/friend/request", Fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  if (error)
    return (
      <div>
        <NotFound />
      </div>
    );
  if (isLoading || !data)
    return (
      <div className="p-4 space-y-3">
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
    );
  if (data.length === 0)
    return (
      <div className="p-6">
        <Empty description="No pending friend requests" />
      </div>
    );

  // Unified Request Handler
  const handleRequestAction = async (
    requestId: string,
    index: number,
    action: "accept" | "reject",
  ) => {
    try {
      setLoading({ state: true, index, action });

      // Hit your backend endpoint (adjust paths matching your controller routers structure)
      await HttpInterceptor.put(`/friend/request/${requestId}`, {
        status: action,
      });

      toast.success(`Request ${action}ed successfully!`, {
        position: "top-center",
      });

      // Global mutations to sync UI states instantly
      mutate("/friend/request");
      mutate("/friend"); // Revalidates active connections tab
    } catch (err) {
      CatchError(err);
    } finally {
      setLoading({ state: false, index: null, action: null });
    }
  };

  return (
    <div className="p-4 w-full max-w-2xl mx-auto">
      <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
        Friend Requests
      </h2>
      {/* HEADER SECTION */
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
//           Pending Requests ({data.length})
//         </h2>
//       </div>

//       {/* RESPONSIVE VERTICAL SCROLL CONTAINER */}
//       <div className="flex flex-col gap-3 max-h-125 overflow-y-auto pr-1 pb-2 custom-scrollbar">
//         {data &&
//           data.map((item: FriendRequestItem, idx: number) => {
//             // Fallback Initials Generation logic safely protected
//             const initials = item.user?.fullname
//               ? item.user.fullname
//                   .trim()
//                   .split(/\s+/)
//                   .map((w: string) => w[0])
//                   .join("")
//                   .toUpperCase()
//                   .slice(0, 2)
//               : "??";

//             return (
//               <div
//                 key={item._id || idx}
//                 className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 hover:shadow-sm transition-shadow duration-200">
//                 {/* LEFT PROFILE & BLOCK INFO */}
//                 <div className="flex items-center gap-3 w-full sm:w-auto">
//                   <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
//                     {item.user?.image ? (
//                       <img
//                         src={item.user.image}
//                         alt={item.user.fullname}
//                         className="w-full h-full object-cover rounded-full"
//                       />
//                     ) : (
//                       initials
//                     )}
//                   </div>

//                   <div className="truncate">
//                     <h4 className="text-sm font-bold text-slate-700 capitalize truncate">
//                       {item.user?.fullname || "Anonymous User"}
//                     </h4>
//                     <p className="text-[11px] text-slate-400">
//                       {`Received ${moment(item.createdAt).fromNow()}`}
//                     </p>
//                   </div>
//                 </div>

//                 {/* RIGHT ROW: ACTIONS PANEL (Full width on mobile layout seamlessly) */}
//                 <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
//                   {/* REJECT BUTTON */}
//                   <Button
//                     className="bg-slate-200 hover:bg-slate-300 text-slate-600 text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors flex-1 sm:flex-none justify-center"
//                     icon="close-line"
//                     loading={
//                       loading.state &&
//                       loading.index === idx &&
//                       loading.action === "reject"
//                     }
//                     disabled={
//                       loading.state &&
//                       loading.index === idx &&
//                       loading.action === "accept"
//                     }
//                     onClick={() =>
//                       handleRequestAction(item._id, idx, "reject")
//                     }>
//                     Reject
//                   </Button>

//                   {/* ACCEPT BUTTON */}
//                   <Button
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors flex-1 sm:flex-none justify-center"
//                     icon="user-check-line"
//                     loading={
//                       loading.state &&
//                       loading.index === idx &&
//                       loading.action === "accept"
//                     }
//                     disabled={
//                       loading.state &&
//                       loading.index === idx &&
//                       loading.action === "reject"
//                     }
//                     onClick={() =>
//                       handleRequestAction(item._id, idx, "accept")
//                     }>
//                     Accept
//                   </Button>
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default FriendRequests;

/* 

import Card from "../shared/Card";
import Button from "../shared/Button"; // Imported your shared button component
import useSWR, { mutate } from "swr";
import Fetcher from "../../lib/Fetcher";
import Loader from "../shared/Loader";
import NotFound from "../shared/NotFound";
import CatchError from "../../lib/CatchError";
import HttpInterceptor from "../../lib/HttpInterceptor";

interface FriendDataInterface {
  id: string;
  fullname: string | null;
  email: string;
  image: string | null;
}
interface FriendInterface {
  _id: string;
  status: string;
  friend: FriendDataInterface;
  // ✅ Typed cleanly as an object, not a string
}

const Friends = () => {
  // Mock dataset representation to easily tie into backend data payloads later
  // const friendsList = Array(20).fill({
  //   name: "John Alex",
  //   role: "Full Stack Developer",
  //   image: "/images/man1.png", // Safe image pointer path mapping
  // });

  const { data: friendsList, isLoading, error } = useSWR("/friend", Fetcher);
  console.log(friendsList);

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  const unfriend = async (id: string) => {
    try {
      await HttpInterceptor.delete(`/friend/${id}`);
      mutate("/friend");
    } catch (err) {
      CatchError(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* DIRECTORY HEADER METRICS ROW */
//       <div className="flex items-center justify-between pb-2">
//         <p className="text-sm font-medium text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">
//             {friendsList.length}
//           </span>{" "}
//           active connections
//         </p>
//       </div>

//       {/* DYNAMIC RESPONSIVE GRID CONFIGURATION */}
//       {/* Mobile: 1 Column | Small Tablets: 2 Columns | Large Laptops: 3 Columns | Ultra-wide: 4 Columns */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//         {friendsList.map((item: FriendInterface, idx: number) => (
//           <Card
//             key={idx}
//             noPadding
//             className="hover:shadow-xl transition-all duration-300 group">
//             <div className="flex flex-col items-center justify-center p-5 text-center">
//               {/* Profile Image Wrapper Frame */}
//               <div className="relative mb-3.5 p-1 rounded-full bg-slate-50 border border-gray-100 group-hover:scale-105 transition-transform duration-300">
//                 {item.friend.image ? (
//                   <img
//                     src={item.friend.image}
//                     alt={`${item.friend.fullname} profile`}
//                     className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-sm bg-white"
//                     onError={(e) => {
//                       // Fallback if image asset route doesn't exist
//                       (e.target as HTMLElement).style.display = "none";
//                     }}
//                   />
//                 ) : (
//                   // Fallback sleek placeholder if target asset path is null
//                   <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-inner">
//                     JA
//                   </div>
//                 )}
//                 {/* Active Live Status Dot */}
//                 <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
//               </div>

//               {/* Text Block Node Layout */}
//               <h3 className="text-base font-bold text-slate-800  mb-4 tracking-tight leading-none truncate w-full capitalize">
//                 {item.friend.fullname}
//               </h3>
//               {/* <p className="text-xs text-slate-400 font-medium  truncate w-full max-w-40">
//                 {item.status}
//               </p> */}

//               {/* INTEGRATED SHARED COMPONENT BUTTON */}
//               {/* Replaces raw markup with your modular design system element.
//                   w-full expands it cleanly to fit the lower card panel width parameters perfectly on mobile */}

//               {item.status === "accepted" ? (
//                 <Button
//                   type="danger"
//                   icon="user-minus-line"
//                   className="w-full text-xs py-2 rounded-xl justify-center font-semibold bg-rose-500/50 hover:bg-rose-500 hover:text-white text-rose-500 border border-rose-100 shadow-none hover:scale-100"
//                   onClick={() => unfriend(item._id)}>
//                   Unfriend
//                 </Button>
//               ) : (
//                 <Button
//                   type="info"
//                   icon="check-double-line"
//                   className="w-full text-xs py-2.5 rounded-xl justify-center font-semibold bg-gray-500/50 hover:bg-gray-500 hover:text-white text-gray-600 border border-gray-100 shadow-none hover:scale-100 capitalize"
//                   onClick={() =>
//                     alert(`Unfriend handler clicked for item index: ${idx}`)
//                   }>
//                   {item.status}
//                 </Button>
//               )}
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Friends;

//

/* 

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Avatar from "../shared/Avatar";
import Card from "../shared/Card";
import { useContext, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Context from "../../Context";
import HttpInterceptor from "../../lib/HttpInterceptor";
import { v4 as uuid } from "uuid";
import useSWR, { mutate } from "swr";
import Fetcher from "../../lib/Fetcher";
import CatchError from "../../lib/CatchError";
import FriendSuggestion from "./FriendSuggestion";
import FriendList from "./FriendList";
import axios from "axios";

import FriendRequests from "./FriendRequests";

const eightMinutesInMillisecond = 8 * 60 * 1000;

const Layout = () => {
  const [leftAsideSize, setLeftAsideSize] = useState(350);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false); // UX State for Bottom Sheet
  const rightAsideSize = 450;
  const collapseSize = 130;

  const { error } = useSWR("/auth/refresh-token", Fetcher, {
    refreshInterval: eightMinutesInMillisecond,
    shouldRetryOnError: false,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { session, setSession } = useContext(Context);

  const menus = [
    {
      href: "/app/dashboard",
      label: "dashboard",
      icon: "ri-home-4-line",
    },
    {
      href: "/app/posts",
      label: "my posts",
      icon: "ri-article-line",
    },
    {
      href: "/app/friends",
      label: "friends",
      icon: "ri-team-line",
    },
  ];

  const getPathName = (path: string) => {
    const firstPath = path.split("/").pop();
    const secondPath = firstPath?.split("-").join(" ");
    return secondPath;
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
      const payload = {
        path: path,
        type: file.type,
        status: "public-read",
      };

      try {
        const options = {
          headers: {
            "Content-Type": file.type,
          },
          // transformRequest: [(data) => data],
        };
        const { data } = await HttpInterceptor.post("/storage/upload", payload);
        console.log(data);
        await axios.put(data.url, file, options);
        const { data: user } = await HttpInterceptor.put(
          "/auth/profile-picture",
          { path: path },
        );
        setSession({ ...session, image: user.image });
        mutate("/auth/refresh-token");
      } catch (err) {
        console.log(err);
      }
    };
  };
  const logout = async () => {
    try {
      await HttpInterceptor.post("/auth/logout");
      setSession(null);
      navigate("/login");
    } catch (err) {
      CatchError(err);
    }
  };

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex lg:flex-row overflow-x-hidden">
      {/* LEFT NAVIGATION DRAWER */
//       <aside
//         className="fixed bottom-0 left-0 w-full z-50 p-2 bg-white/80 backdrop-blur-xl border-t border-white/20
//                    lg:top-0 lg:bottom-auto lg:h-full lg:p-6 lg:border-t-0 lg:border-r lg:bg-white/5"
//         style={
//           {
//             width: "var(--left-width, 100%)",
//             transition: "width 0.2s ease-in-out",
//             "--left-width": `calc(100vw * 0 + ${leftAsideSize}px)`,
//           } as React.CSSProperties
//         }>
//         <div
//           className={`h-full rounded-2xl lg:rounded-[28px] shadow-2xl px-4 py-3 lg:py-6 flex flex-row lg:flex-col justify-between lg:justify-start ${
//             leftAsideSize === collapseSize ? "lg:items-center" : ""
//           } transition-all duration-500 ease-in-out`}
//           style={{
//             background:
//               "linear-gradient(160deg,#3b1f7a 0%,#1e1060 35%,#100d3a 65%,#0a0d28 100%)",
//           }}>
//           {/* User Profile (Desktop Only) */}
//           <div className="hidden lg:block animate__animated animate__fadeIn">
//             {session && (
//               <Avatar
//                 title={leftAsideSize === collapseSize ? null : session.fullname}
//                 size={leftAsideSize === collapseSize ? "md" : "lg"}
//                 subtitle={session.email}
//                 titleColor="white"
//                 subtitleColor="#ddd"
//                 image={session.image || "/images/woman.png"}
//                 onClick={uploadImage}
//               />
//             )}
//           </div>

//           <div className="hidden lg:block border-b border-white/10 pt-2 mt-5 -mx-4" />

//           {/* Navigation Links */}
//           <div className="flex flex-row lg:flex-col justify-around lg:justify-start gap-2 flex-1 lg:pt-2 lg:mt-6 w-full">
//             {menus.map((item, idx) => (
//               <Link
//                 title={item.label}
//                 to={item.href}
//                 key={idx}
//                 className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-3 py-1.5 lg:px-3.5 lg:py-2.5 rounded-xl text-[#b8aadf] text-xs lg:text-sm font-medium
//                            transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060]">
//                 <i className={`${item.icon} text-lg lg:text-xl`}></i>
//                 <span
//                   className={`capitalize ${leftAsideSize === collapseSize ? "lg:hidden" : ""}`}>
//                   {item.label}
//                 </span>
//               </Link>
//             ))}

//             {/* NEW: Mobile Profile Trigger Button */}
//             <button
//               onClick={() => setIsMobileProfileOpen(true)}
//               className="flex flex-col lg:hidden items-center gap-1 px-3 py-1.5 rounded-xl text-[#b8aadf] text-xs font-medium
//                          transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060] cursor-pointer">
//               <img
//                 src={session?.image || "/images/woman.png"}
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full object-cover border border-white/20"
//               />
//               <span className="capitalize">Profile</span>
//             </button>
//           </div>

//           <div className="hidden lg:block border-t border-white/10 pt-2">
//             <button
//               onClick={logout}
//               title="logout"
//               className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl w-full text-left
//                         text-[#b8aadf] text-sm font-medium transition-all duration-150 cursor-pointer
//                         hover:bg-red-500/15 hover:text-red-300 mt-3">
//               <i className="ri-logout-box-r-line text-xl"></i>
//               <span
//                 className={leftAsideSize === collapseSize ? "lg:hidden" : ""}>
//                 Logout
//               </span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <main
//         className="flex-1 rounded-2xl py-6 px-4 mb-20 lg:mb-0 lg:py-8 lg:px-6 w-full"
//         style={
//           {
//             width: "100%",
//             marginLeft: "var(--main-ml, 0px)",
//             marginRight: "var(--main-mr, 0px)",
//             transition: "margin 0.3s ease-in-out",
//             "--main-ml": `calc(0px + ${leftAsideSize}px)`,
//             "--main-mr": `calc(0px + ${rightAsideSize}px)`,
//           } as CSSProperties
//         }>
//         <Card
//           title={
//             <div className="flex gap-6 items-center">
//               <button
//                 className="hidden lg:block bg-gray-100 w-10 h-10 rounded-full hover:bg-slate-200 cursor-pointer"
//                 onClick={() =>
//                   setLeftAsideSize(leftAsideSize === 350 ? collapseSize : 350)
//                 }>
//                 <i
//                   className={
//                     leftAsideSize === collapseSize
//                       ? "ri-arrow-right-line"
//                       : "ri-arrow-left-line"
//                   }></i>
//               </button>
//               <h1 className="text-xl font-bold text-slate-800 lg:text-2xl">
//                 {getPathName(pathname)}
//               </h1>
//             </div>
//           }>
//           <Outlet />
//         </Card>
//       </main>

//       {/* RIGHT FRIENDS DRAWER */}
//       <aside
//         className="p-4 lg:p-6 overflow-auto border-t lg:border-t-0 lg:border-l border-gray-100 w-full lg:fixed lg:top-0 lg:right-0 lg:h-full z-40"
//         style={
//           {
//             width: "100%",
//             maxWidth: "var(--right-max-w, 100%)",
//             "--right-max-w": `calc(0px + ${rightAsideSize}px)`,
//           } as React.CSSProperties
//         }>
//         <Card className="h-full" noPadding>
//           <div className="flex flex-col h-full divide-y divide-gray-100">
//             {/* SUGGESTED FRIENDS */}
//             <FriendSuggestion />
//             <FriendRequests />

//             {/* MY FRIENDS LIST */}
//             <FriendList />
//           </div>
//         </Card>
//       </aside>

//       {/* NEW: MOBILE PROFILE BOTTOM SHEET VIEW */}
//       {isMobileProfileOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-center">
//           {/* Dark Glass Backdrop */}
//           <div
//             className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
//             onClick={() => setIsMobileProfileOpen(false)}
//           />

//           {/* Sheet Container */}
//           <div className="relative w-full bg-white rounded-t-4xl p-6 shadow-2xl transition-transform duration-300 transform translate-y-0 flex flex-col items-center z-10 max-h-[85vh] overflow-y-auto">
//             {/* Grabber Indicator */}
//             <div
//               className="w-12 h-1.5 bg-slate-200 rounded-full mb-6 cursor-pointer"
//               onClick={() => setIsMobileProfileOpen(false)}
//             />

//             {/* Profile Detail Overview */}
//             {session && (
//               <div className="flex flex-col items-center text-center w-full mb-6">
//                 <div
//                   className="relative cursor-pointer group rounded-full overflow-hidden shadow-md active:scale-95 transition-transform"
//                   onClick={() => {
//                     setIsMobileProfileOpen(false); // Close drawer safely before file dialog opens
//                     uploadImage();
//                   }}>
//                   <Avatar
//                     size="lg"
//                     image={session.image || "/images/woman.png"}
//                   />
//                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
//                     <i className="ri-camera-line text-xl"></i>
//                   </div>
//                 </div>

//                 <h3 className="text-lg font-bold text-slate-800 mt-4">
//                   {session.fullname}
//                 </h3>
//                 <p className="text-sm text-slate-500 font-medium">
//                   {session.email}
//                 </p>
//               </div>
//             )}

//             <div className="w-full border-t border-slate-100 my-2" />

//             {/* Functional Menu Options */}
//             <div className="w-full space-y-3">
//               {/* Profile Redirection Button */}
//               <Link
//                 to="/app/profile"
//                 onClick={() => setIsMobileProfileOpen(false)}
//                 className="flex items-center gap-3 px-4 py-3.5 rounded-xl w-full bg-slate-50 text-slate-700 font-semibold text-sm transition-colors cursor-pointer hover:bg-slate-100">
//                 <i className="ri-user-settings-line text-lg text-indigo-500"></i>
//                 <span className="flex-1 text-left">Edit Account Details</span>
//                 <i className="ri-arrow-right-s-line text-slate-400"></i>
//               </Link>

//               {/* Mobile Destructive Action Button (Logout) */}
//               <button
//                 onClick={() => {
//                   setIsMobileProfileOpen(false);
//                   logout();
//                 }}
//                 className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl w-full text-center bg-red-50 text-red-600 font-bold text-sm transition-all cursor-pointer hover:bg-red-100">
//                 <i className="ri-logout-box-r-line text-lg"></i>
//                 Logout Account
//               </button>

//               <button
//                 onClick={() => setIsMobileProfileOpen(false)}
//                 className="flex items-center justify-center px-4 py-2.5 rounded-xl w-full text-center text-slate-400 text-xs font-semibold tracking-wide uppercase cursor-pointer">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Embedded CSS Breakpoint overrides */}
//       <style>{`
//         @media (max-width: 1023px) {
//           aside, main {
//             margin-left: 0px !important;
//             margin-right: 0px !important;
//             width: 100% !important;
//             max-width: 100% !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Layout;

/* 
     <aside
        style={{ width: leftAsideSize }}
        className="fixed top-0 left-0 h-full border-r border-slate-100 bg-white z-20 flex flex-col justify-between p-3 transition-all duration-300 bg-linear-to-b from-[#1e1b4b] via-[#312e81] to-[#4c1d95]">
        <div className="w-full flex flex-col items-center">
          {session && (
            <div className="w-full mb-4">
              {/* FIXED: Dynamic wrapping conditional layout to keep alignment flawless */
//         <div
//           className={`flex ${isCollapsed ? "flex-col items-center justify-center text-center gap-3" : "items-center justify-between"} w-full group`}>
//           <Avatar
//             title={isCollapsed ? null : session.fullname}
//             size={isCollapsed ? "md" : "lg"}
//             subtitle={
//               isCollapsed ? null : session.email
//             } /* RESTORED EMAIL UNDER USERNAME */
//             titleColor="white"
//             subtitleColor="#a5b4fc"
//             image={session.image || "/images/woman.png"}
//             onClick={uploadImage}
//           />

//           {/* <button
//             onClick={onOpenEditProfile}
//             className={`p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-blue-500 cursor-pointer transition-colors ${isCollapsed ? "mt-1" : ""}`}
//             title="Edit Profile Settings">
//             <i className="ri-settings-4-line text-lg"></i>
//           </button> */}
//         </div>
//         {!isCollapsed && (
//           <div className="border-b border-slate-100 my-4 w-full" />
//         )}
//       </div>
//     )}

//     {/* MENUS TRACK ALIGNMENT */}
//     <div className="flex flex-col gap-1 w-full">
//       {menus.map((item, idx) => {
//         const isActive = pathname === item.href;
//         return (
//           <Link
//             to={item.href}
//             key={idx}
//             className={`flex items-center ${isCollapsed ? "justify-center px-2" : "px-4"} py-3 rounded-xl font-semibold text-sm transition-all
//               ${
//                 isActive
//                   ? "bg-white/15 text-white border border-white/20"
//                   : "text-indigo-200 hover:bg-white/10 hover:text-white"
//               }`}
//             title={isCollapsed ? item.label : ""}>
//             <i
//               className={`${item.icon} text-xl ${isCollapsed ? "" : "mr-3"}`}></i>
//             {!isCollapsed && (
//               <span className="capitalize truncate">{item.label}</span>
//             )}
//           </Link>
//         );
//       })}
//     </div>
//   </div>

//   {/* LOWER CONTROLS (FIXED PREMIUM HORIZONTAL TOGGLE) */}
//   <div className="w-full border-t border-slate-100 pt-4 flex flex-col gap-2 items-center">
//     <button
//       onClick={() => setLeftAsideSize(isCollapsed ? 350 : collapseSize)}
//       className="flex items-center justify-center w-full py-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer">
//       {/* FIXED: Professional inline system arrows matching expand state */}
//       <i
//         className={`text-lg ${isCollapsed ? "ri-arrow-right-line" : "ri-arrow-left-line"}`}></i>
//     </button>

//     <button
//       onClick={logout}
//       className={`flex items-center ${isCollapsed ? "justify-center px-2" : "px-4"} py-3 rounded-xl w-full text-rose-600 font-bold text-sm transition-all hover:bg-rose-50 cursor-pointer`}
//       title={isCollapsed ? "Logout" : ""}>
//       <i
//         className={`ri-logout-box-r-line text-xl ${isCollapsed ? "" : "mr-3"}`}></i>
//       {!isCollapsed && <span>Logout</span>}
//     </button>
//   </div>
// </aside>

/* 
// 
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const Layout = () => {
  const [leftAsideSize, setLeftAsideSize] = useState(350);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<
    "workspace" | "discover"
  >("workspace");
  const [activeRightTab, setActiveRightTab] = useState<"activity" | "explore">(
    "activity",
  );
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const rightAsideSize = 420;
  const collapseSize = 75;

  const { error } = useSWR("/auth/refresh-token", Fetcher, {
    refreshInterval: eightMinutesInMillisecond,
    shouldRetryOnError: false,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { session, setSession } = useContext(Context);

  const menus = [
    { href: "/app/dashboard", label: "dashboard", icon: "ri-home-4-line" },
    { href: "/app/posts", label: "my posts", icon: "ri-article-line" },
    { href: "/app/friends", label: "friends", icon: "ri-team-line" },
  ];

  const getPathName = (path: string) => {
    const firstPath = path.split("/").pop();
    return firstPath?.split("-").join(" ") || "";
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
        const { data: user } = await HttpInterceptor.put(
          "/auth/profile-picture",
          { path },
        );
        setSession({ ...session, image: user.image });
        mutate("/auth/refresh-token");
      } catch (err) {
        console.error(err);
      }
    };
  };

  const logout = async () => {
    try {
      await HttpInterceptor.post("/auth/logout");
      setSession(null);
      navigate("/login");
    } catch (err) {
      CatchError(err);
    }
  };

  useEffect(() => {
    if (error) logout();
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-600">
      {/* DESKTOP ENGINE FLOW */
//       <div className="hidden lg:block">
//         <DesktopLayout
//           leftAsideSize={leftAsideSize}
//           setLeftAsideSize={setLeftAsideSize}
//           rightAsideSize={rightAsideSize}
//           collapseSize={collapseSize}
//           pathname={pathname}
//           menus={menus}
//           session={session}
//           getPathName={getPathName}
//           uploadImage={uploadImage}
//           logout={logout}
//           activeRightTab={activeRightTab}
//           setActiveRightTab={setActiveRightTab}
//         />
//       </div>

//       {/* MOBILE ENGINE FLOW */}
//       <div className="block lg:hidden">
//         <MobileLayout
//           pathname={pathname}
//           menus={menus}
//           session={session}
//           getPathName={getPathName}
//           uploadImage={uploadImage}
//           logout={logout}
//           isMobileProfileOpen={isMobileProfileOpen}
//           setIsMobileProfileOpen={setIsMobileProfileOpen}
//           mobileActiveTab={mobileActiveTab}
//           setMobileActiveTab={setMobileActiveTab}
//           isEditProfileModalOpen={isEditProfileModalOpen}
//           setIsEditProfileModalOpen={setIsEditProfileModalOpen}
//         />
//       </div>
//     </div>
//   );
// };

// export default Layout;

//

/* 
// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import Avatar from "../shared/Avatar";
// import Card from "../shared/Card";
// import { useContext, useEffect, useState } from "react";
// import type { CSSProperties } from "react";
// import Context from "../../Context";
// import HttpInterceptor from "../../lib/HttpInterceptor";
// import { v4 as uuid } from "uuid";
// import useSWR, { mutate } from "swr";
// import Fetcher from "../../lib/Fetcher";
// import CatchError from "../../lib/CatchError";
// import FriendSuggestion from "./friends/FriendSuggestion";
// import FriendList from "./friends/FriendList";
// import axios from "axios";

// import FriendRequests from "./friends/FriendRequests";
// import FriendsOnline from "./friends/FriendsOnline";

// const eightMinutesInMillisecond = 8 * 60 * 1000;

// const Layout = () => {
//   const [leftAsideSize, setLeftAsideSize] = useState(350);
//   const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false); // UX State for Bottom Sheet
//   const rightAsideSize = 450;
//   const collapseSize = 130;

//   const { error } = useSWR("/auth/refresh-token", Fetcher, {
//     refreshInterval: eightMinutesInMillisecond,
//     shouldRetryOnError: false,
//   });

//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { session, setSession } = useContext(Context);

//   const menus = [
//     {
//       href: "/app/dashboard",
//       label: "dashboard",
//       icon: "ri-home-4-line",
//     },
//     {
//       href: "/app/posts",
//       label: "my posts",
//       icon: "ri-article-line",
//     },
//     {
//       href: "/app/friends",
//       label: "friends",
//       icon: "ri-team-line",
//     },
//   ];

//   const getPathName = (path: string) => {
//     const firstPath = path.split("/").pop();
//     const secondPath = firstPath?.split("-").join(" ");
//     return secondPath;
//   };

//   const uploadImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.click();
//     input.onchange = async () => {
//       if (!input.files) return;

//       const file = input.files[0];
//       const path = `profile-picture/${uuid()}.png`;
//       const payload = {
//         path: path,
//         type: file.type,
//         status: "public-read",
//       };

//       try {
//         const options = {
//           headers: {
//             "Content-Type": file.type,
//           },
//         };
//         const { data } = await HttpInterceptor.post("/storage/upload", payload);
//         console.log(data);
//         await axios.put(data.url, file, options);
//         const { data: user } = await HttpInterceptor.put(
//           "/auth/profile-picture",
//           { path: path },
//         );
//         setSession({ ...session, image: user.image });
//         mutate("/auth/refresh-token");
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   };
//   const logout = async () => {
//     try {
//       await HttpInterceptor.post("/auth/logout");
//       setSession(null);
//       navigate("/login");
//     } catch (err) {
//       CatchError(err);
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       logout();
//     }
//   }, [error]);

//   return (
//     <div className="min-h-screen bg-slate-50 lg:flex lg:flex-row overflow-x-hidden">
//       {/* =========================================================================
//           🆕 NEW STICKY TOP BRANDING HEADER (Visible on Mobile & Tablet Views Only)
//           ========================================================================= */
//       <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40 px-4 flex items-center justify-between lg:hidden shadow-xs">
//         {/* Brand Group */}
//         <div className="flex items-center gap-2">
//           {/* Logo Frame Icon */}
//           <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
//             <i className="ri-heart-pulse-fill text-lg"></i>
//           </div>
//           {/* App Typography Name */}
//           <span className="text-xl font-black tracking-tight bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent capitalize">
//             besties
//           </span>
//         </div>

//         {/* Action Controls Frame */}
//         <div className="flex items-center gap-2">
//           {/* Search Action Toggle button */}
//           <button
//             onClick={() => alert("Search functionality triggered")}
//             className="w-9 h-9 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer">
//             <i className="ri-search-2-line text-lg"></i>
//           </button>

//           {/* Interactive Live Notifications Indicator */}
//           <button
//             onClick={() => alert("Notifications drawer coming soon")}
//             className="w-9 h-9 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors relative cursor-pointer">
//             <i className="ri-notification-3-line text-lg"></i>
//             {/* Live Indicator Alert Pulse Badge */}
//             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>
//           </button>
//         </div>
//       </header>

//       {/* LEFT NAVIGATION DRAWER */}
//       <aside
//         className="fixed bottom-0 left-0 w-full z-50 p-2 bg-white/80 backdrop-blur-xl border-t border-white/20
//                    lg:top-0 lg:bottom-auto lg:h-full lg:p-6 lg:border-t-0 lg:border-r lg:bg-white/5"
//         style={
//           {
//             width: "var(--left-width, 100%)",
//             transition: "width 0.2s ease-in-out",
//             "--left-width": `calc(100vw * 0 + ${leftAsideSize}px)`,
//           } as React.CSSProperties
//         }>
//         <div
//           className={`h-full rounded-2xl lg:rounded-[28px] shadow-2xl px-4 py-3 lg:py-6 flex flex-row lg:flex-col justify-between lg:justify-start ${
//             leftAsideSize === collapseSize ? "lg:items-center" : ""
//           } transition-all duration-500 ease-in-out`}
//           style={{
//             background:
//               "linear-gradient(160deg,#3b1f7a 0%,#1e1060 35%,#100d3a 65%,#0a0d28 100%)",
//           }}>
//           {/* User Profile (Desktop Only) */}
//           <div className="hidden lg:block animate__animated animate__fadeIn">
//             {session && (
//               <Avatar
//                 title={leftAsideSize === collapseSize ? null : session.fullname}
//                 size={leftAsideSize === collapseSize ? "md" : "lg"}
//                 subtitle={session.email}
//                 titleColor="white"
//                 subtitleColor="#ddd"
//                 image={session.image || "/images/woman.png"}
//                 onClick={uploadImage}
//               />
//             )}
//           </div>

//           <div className="hidden lg:block border-b border-white/10 pt-2 mt-5 -mx-4" />

//           {/* Navigation Links */}
//           <div className="flex flex-row lg:flex-col justify-around lg:justify-start gap-2 flex-1 lg:pt-2 lg:mt-6 w-full">
//             {menus.map((item, idx) => (
//               <Link
//                 title={item.label}
//                 to={item.href}
//                 key={idx}
//                 className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-3 py-1.5 lg:px-3.5 lg:py-2.5 rounded-xl text-[#b8aadf] text-xs lg:text-sm font-medium
//                            transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060]">
//                 <i className={`${item.icon} text-lg lg:text-xl`}></i>
//                 <span
//                   className={`capitalize ${leftAsideSize === collapseSize ? "lg:hidden" : ""}`}>
//                   {item.label}
//                 </span>
//               </Link>
//             ))}

//             {/* Mobile Profile Trigger Button */}
//             <button
//               onClick={() => setIsMobileProfileOpen(true)}
//               className="flex flex-col lg:hidden items-center gap-1 px-3 py-1.5 rounded-xl text-[#b8aadf] text-xs font-medium
//                          transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060] cursor-pointer">
//               <img
//                 src={session?.image || "/images/woman.png"}
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full object-cover border border-white/20"
//               />
//               <span className="capitalize">Profile</span>
//             </button>
//           </div>

//           <div className="hidden lg:block border-t border-white/10 pt-2">
//             <button
//               onClick={logout}
//               title="logout"
//               className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl w-full text-left
//                         text-[#b8aadf] text-sm font-medium transition-all duration-150 cursor-pointer
//                         hover:bg-red-500/15 hover:text-red-300 mt-3">
//               <i className="ri-logout-box-r-line text-xl"></i>
//               <span
//                 className={leftAsideSize === collapseSize ? "lg:hidden" : ""}>
//                 Logout
//               </span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       {/* 🛑 Added "pt-16 lg:pt-8" padding to correctly compensate for the mobile header displacement block layout height */}
//       <main
//         className="flex-1 rounded-2xl pt-20 pb-6 px-4 mb-2 lg:mb-0 lg:py-8 lg:px-6 w-full"
//         style={
//           {
//             width: "100%",
//             marginLeft: "var(--main-ml, 0px)",
//             marginRight: "var(--main-mr, 0px)",
//             transition: "margin 0.3s ease-in-out",
//             "--main-ml": `calc(0px + ${leftAsideSize}px)`,
//             "--main-mr": `calc(0px + ${rightAsideSize}px)`,
//           } as CSSProperties
//         }>
//         <Card
//           title={
//             <div className="flex gap-6 items-center">
//               <button
//                 className="hidden lg:block bg-gray-100 w-10 h-10 rounded-full hover:bg-slate-200 cursor-pointer"
//                 onClick={() =>
//                   setLeftAsideSize(leftAsideSize === 350 ? collapseSize : 350)
//                 }>
//                 <i
//                   className={
//                     leftAsideSize === collapseSize
//                       ? "ri-arrow-right-line"
//                       : "ri-arrow-left-line"
//                   }></i>
//               </button>
//               <h1 className="text-xl font-bold text-slate-800 lg:text-2xl">
//                 {getPathName(pathname)}
//               </h1>
//             </div>
//           }>
//           <Outlet />
//         </Card>
//       </main>

//       {/* RIGHT FRIENDS DRAWER */}
//       <aside
//         className="p-4 lg:p-6 overflow-auto border-t lg:border-t-0 lg:border-l border-gray-100 w-full lg:fixed lg:top-0 lg:right-0 lg:h-full z-40"
//         style={
//           {
//             width: "100%",
//             maxWidth: "var(--right-max-w, 100%)",
//             "--right-max-w": `calc(0px + ${rightAsideSize}px)`,
//           } as React.CSSProperties
//         }>
//         <Card className="h-full" noPadding>
//           <div className="flex flex-col h-full divide-y divide-gray-100">
//             <FriendsOnline />
//             {/* SUGGESTED FRIENDS */}
//             <FriendSuggestion />
//             <FriendRequests />

//             {/* MY FRIENDS LIST */}
//             <FriendList />
//           </div>
//         </Card>
//       </aside>

//       {/* MOBILE PROFILE BOTTOM SHEET VIEW */}
//       {isMobileProfileOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-center">
//           {/* Dark Glass Backdrop */}
//           <div
//             className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
//             onClick={() => setIsMobileProfileOpen(false)}
//           />

//           {/* Sheet Container */}
//           <div className="relative w-full bg-white rounded-t-4xl p-6 shadow-2xl transition-transform duration-300 transform translate-y-0 flex flex-col items-center z-10 max-h-[85vh] overflow-y-auto">
//             {/* Grabber Indicator */}
//             <div
//               className="w-12 h-1.5 bg-slate-200 rounded-full mb-6 cursor-pointer"
//               onClick={() => setIsMobileProfileOpen(false)}
//             />

//             {/* Profile Detail Overview */}
//             {session && (
//               <div className="flex flex-col items-center text-center w-full mb-6">
//                 <div
//                   className="relative cursor-pointer group rounded-full overflow-hidden shadow-md active:scale-95 transition-transform"
//                   onClick={() => {
//                     setIsMobileProfileOpen(false);
//                     uploadImage();
//                   }}>
//                   <Avatar
//                     size="lg"
//                     image={session.image || "/images/woman.png"}
//                   />
//                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
//                     <i className="ri-camera-line text-xl"></i>
//                   </div>
//                 </div>

//                 <h3 className="text-lg font-bold text-slate-800 mt-4">
//                   {session.fullname}
//                 </h3>
//                 <p className="text-sm text-slate-500 font-medium">
//                   {session.email}
//                 </p>
//               </div>
//             )}

//             <div className="w-full border-t border-slate-100 my-2" />

//             {/* Functional Menu Options */}
//             <div className="w-full space-y-3">
//               {/* Profile Redirection Button */}
//               <Link
//                 to="/app/profile"
//                 onClick={() => setIsMobileProfileOpen(false)}
//                 className="flex items-center gap-3 px-4 py-3.5 rounded-xl w-full bg-slate-50 text-slate-700 font-semibold text-sm transition-colors cursor-pointer hover:bg-slate-100">
//                 <i className="ri-user-settings-line text-lg text-indigo-500"></i>
//                 <span className="flex-1 text-left">Edit Account Details</span>
//                 <i className="ri-arrow-right-s-line text-slate-400"></i>
//               </Link>

//               {/* Mobile Destructive Action Button (Logout) */}
//               <button
//                 onClick={() => {
//                   setIsMobileProfileOpen(false);
//                   logout();
//                 }}
//                 className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl w-full text-center bg-red-50 text-red-600 font-bold text-sm transition-all cursor-pointer hover:bg-red-100">
//                 <i className="ri-logout-box-r-line text-lg"></i>
//                 Logout Account
//               </button>

//               <button
//                 onClick={() => setIsMobileProfileOpen(false)}
//                 className="flex items-center justify-center px-4 py-2.5 rounded-xl w-full text-center text-slate-400 text-xs font-semibold tracking-wide uppercase cursor-pointer">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Embedded CSS Breakpoint overrides */}
//       <style>{`
//         @media (max-width: 1023px) {
//           aside, main {
//             margin-left: 0px !important;
//             margin-right: 0px !important;
//             width: 100% !important;
//             max-width: 100% !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Layout; */}

/*  */



// import { useContext, useEffect, useRef, useState } from "react";
// import Button from "../shared/Button";
// import Card from "../shared/Card";
// import { useNavigate } from "react-router-dom";
// import Context from "../../Context";
// import CatchError from "../../lib/CatchError";

// const AudioChat = () => {
//   // Mock participant array to clean up repeated code and scale dynamically
//   const participants = [
//     { name: "Azee Khan", initials: "AK", isSpeaking: true, image: "" },
//     { name: "Rahul Kumar", initials: "RK", isSpeaking: false, image: "" },
//   ];

//   const [isMic, setIsMic] = useState(false)
//   const navigate = useNavigate()
//   const { session, liveActiveSession } = useContext(Context)
//   const localAudio = useRef<HTMLAudioElement | null>(null)
//   const localStream = useRef<MediaStream | null>(null)

//   const toggleMic = async () => {
//     try {
//       if (!localStream.current && !isMic) {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
//         if (localAudio.current) {
//           localAudio.current.srcObject = stream
//           localAudio.current.play()
//         }
//         localStream.current = stream
//         setIsMic(true)
//       } else {
//         localStream.current?.getTracks().forEach((track) => track.stop())
//         if (localAudio.current) {
          
//           localAudio.current?.pause()
//           localAudio.current = null
//         }
//         localStream.current = null
//         setIsMic(false)
//       }
    
//     } catch (err) {
//       CatchError(err)
//   }
//   }
  

//   useEffect(()=>{}, [])


//   if (!liveActiveSession) {
//   return navigate("/app")
// }

//   return (
//     <div className="space-y-6 md:space-y-8">
//       {/* PARTICIPANTS AUDIO CARD GRID */}
//       {/* Mobile: 1 Col | Tablet: 2 Cols | Desktop: 3 Cols */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
//         {participants.map((user, idx) => (
//           <Card
//             key={idx}
//             title={
//               <div className="text-center w-full font-semibold text-slate-700">
//                 {user.name}
//               </div>
//             }>
//             <audio hidden ref={localAudio} muted />
//             <div className="flex flex-col items-center justify-center py-6">
//               {/* Responsive Avatar Container with Speaking Indicator Ring */}
//               <div
//                 className={`relative p-1.5 rounded-full transition-all duration-300 ${
//                   user.isSpeaking
//                     ? "bg-emerald-500/10 ring-4 ring-emerald-500 animate-pulse"
//                     : "bg-slate-100 ring-2 ring-slate-200"
//                 }`}>
//                 {user.image ? (
//                   <img
//                     src={user.image}
//                     alt={`${user.name} avatar`}
//                     className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover shadow-sm"
//                   />
//                 ) : (
//                   // Fallback sleek background circle if image src is blank/broken
//                   <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-inner">
//                     {user.initials}
//                   </div>
//                 )}

//                 {/* Micro Audio Wave Icon overlay indicating active microphone status */}
//                 <div
//                   className={`absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
//                     user.isSpeaking
//                       ? "bg-emerald-500 text-white"
//                       : "bg-slate-400 text-white"
//                   }`}>
//                   <i
//                     className={
//                       user.isSpeaking
//                         ? "ri-mic-line animate-bounce"
//                         : "ri-mic-off-line"
//                     }></i>
//                 </div>
//               </div>

//               {/* Status Label under Avatar */}
//               <span
//                 className={`text-xs font-medium mt-4 ${user.isSpeaking ? "text-emerald-600" : "text-slate-400"}`}>
//                 {user.isSpeaking ? "Speaking..." : "Muted"}
//               </span>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* BOTTOM CONTROL MEDIA ACTION ROW */}
//       <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
//         {/* Toggle Panel Call Control Buttons */}
//         <div className="flex items-center gap-3">
//           {/* Camera Toggle Button */}
//           {/* <button className="bg-slate-100 text-slate-600 w-12 h-12 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
//             <i className="ri-vidicon-line text-xl"></i>
//           </button> */}

//           {/* Microphone Mute/Unmute Button */}
//           <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-amber-100">
//             <i className="ri-mic-line text-xl"></i>
//           </button>

//           {/* Speaker / Device Volume Option Button */}
//           <button className="bg-slate-100 text-slate-600 w-12 h-12 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
//             <i className="ri-volume-up-line text-xl"></i>
//           </button>
//         </div>

//         {/* End Call Action Button */}
//         <div className="w-full sm:w-auto">
//           <Button
//             icon="close-circle-fill"
//             type="danger"
//             className="w-full sm:w-auto justify-center py-3 text-center flex items-center">
//             End Call
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AudioChat;









// import { useContext, useEffect, useRef, useState, type JSX } from "react";
// import Button from "../shared/Button";
// import Card from "../shared/Card";
// import { useNavigate, useParams } from "react-router-dom";
// import Context from "../../Context";
// import CatchError from "../../lib/CatchError";
// import HttpInterceptor from "../../lib/HttpInterceptor";
// import { Modal, notification } from "antd";
// import socket from "../../lib/socket";
// import type { CallType, OnAnswerInterface, OnCandidiateInterface, OnOfferInterface } from "./Video";

// // Derives two-letter initials from a full name
// const getInitials = (name: string = "") =>
//   name
//     .split(" ")
//     .map((n) => n[0] || "")
//     .join("")
//     .toUpperCase()
//     .slice(0, 2) || "??";

// const AudioChat = (): JSX.Element | null => {
//   const {id} = useParams()
//   const [isMic, setIsMic] = useState(false);
//   const [isCallStarted, setIsCallStarted] = useState(false);
//   const [status, setStatus] = useState<CallType>('pending')
//   const [open, setOpen] = useState(false)

//   const navigate = useNavigate();
//   const { session, liveActiveSession , sdp, setSdp} = useContext(Context);

//   const localAudio = useRef<HTMLAudioElement | null>(null);
//   const remoteAudio = useRef<HTMLAudioElement | null>(null);
//   const localStream = useRef<MediaStream | null>(null);
//   const rtc = useRef<RTCPeerConnection | null>(null);
//   const [notify, notifyUi] = notification.useNotification()

//   const audio = useRef<HTMLAudioElement | null> (null)

//   // ── Dynamic participants from context ───────────────────────────────────────
//   // session      → logged-in user (local)
//   // liveActiveSession → the person on the other side (remote)
//   const participants = [
//     {
//       name: session?.fullname || "You",
//       initials: getInitials(session?.fullname),
//       isSpeaking: isMic, // local mic state drives this card
//       image: session?.image || "",
//       isLocal: true,
//     },
//     {
//       name: liveActiveSession?.fullname || "Unknown",
//       initials: getInitials(liveActiveSession?.fullname),
//       isSpeaking: false, // will be driven by socket events in a later step
//       image: liveActiveSession?.image || "",
//       isLocal: false,
//     },
//   ];

//   // ── Mic toggle ──────────────────────────────────────────────────────────────
//   const toggleMic = async () => {
//     try {
//       if (!localStream.current && !isMic) {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//         });
//         if (localAudio.current) {
//           localAudio.current.srcObject = stream;
//           localAudio.current.play();
//         }
//         localStream.current = stream;
//         setIsMic(true);
//       } else {
//         localStream.current?.getTracks().forEach((track) => track.stop());
//         if (localAudio.current) {
//           localAudio.current.pause();
//           localAudio.current.srcObject = null; // clear srcObject, not the ref itself
//         }
//         localStream.current = null;
//         setIsMic(false);
//       }
//     } catch (err) {
//       CatchError(err);
//     }
//   };

//   const connection = async() => {
//     try {
//      const {data} = await HttpInterceptor.get("/twilio/turn-server")
//       rtc.current = new RTCPeerConnection({ iceServers: data })
//       const localStreaming = localStream.current

//       if (!localStreaming)
//         return
//       localStreaming.getTracks().forEach((track )=> {
//          rtc.current?.addTrack(track, localStreaming )
//       })
//       rtc.current.onicecandidate = (e) => {
//         if (e) {
//           socket.emit("candidate", {candidate: e.candidate, to:id})
//         }

//       }
//       rtc.current.onconnectionstatechange = () => {
//         console.log(rtc.current?.connectionState)

//       };
//       rtc.current.ontrack = (e) => {
//         if (e && remoteAudio.current) {
//           const remoteStream = e.streams[0]
//           remoteAudio.current.srcObject = remoteStream

//        }
//       }

//     } catch (err) {
//       CatchError(err)
//     }
//   }

//   const playAudio = (src: string, loop: boolean = false) => {
//     stopAudio()
//     if (!audio.current)
//       audio.current = new Audio()

//     const player = audio.current
//     player.src = src
//     player.loop = loop
//     player.play().catch(()=>{})

//   }

//   const startCall = async() => {
//     try {
//       await connection()

//       if (!rtc.current)
//         return

//       const offer = await rtc.current.createOffer()
//       await rtc.current.setLocalDescription(offer)
//       notify.open({
//         message: <h1 className="capitalize font-medium">{liveActiveSession.fullname}</h1>,
//         description: "Calling....",
//         duration: 30,
//         placement: "bottomRight",
//         onClose : stopAudio,
//         actions: [
//           <button   key="end"
//             className="w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-rose-400 justify-center shadow-none h-10 hover:bg-rose-500">
//             End call
//           </button>
//         ]

//       })
//       playAudio("/sound/ring.mp3", true)

//       setStatus('calling')
//       socket.emit("offer", {offer, to:id, from: session, type:'audio'})

//     } catch (err) {
//       CatchError(err)
//     }

//   }

//   const acceptCall = async (payload:OnOfferInterface) => {
//     try {
//       setSdp(null)
//       await connection()
//       if (!rtc.current)
//         return

//       const offer = new RTCSessionDescription(payload.from)

//       await rtc.current.setRemoteDescription(offer)

//       const answer = await rtc.current.createAnswer()
//       await rtc.current.setLocalDescription(answer)

//       notify.destroy()
//       setStatus('talking')
//       stopAudio()
//       socket.emit("answer", {answer, to:id})

//     } catch (err) {
//       CatchError(err)
//     }
//   }

//   const stopAudio = () => {
//     if (!audio.current)
//       return
//     audio.current.pause()
//     audio.current.currentTime = 0
//   }

//   // ── End call — stop tracks, reset state, go home ────────────────────────────
//   const endCall = () => {
//     localStream.current?.getTracks().forEach((t) => t.stop());
//     if (localAudio.current) {
//       localAudio.current.pause();
//       localAudio.current.srcObject = null;
//     }
//     localStream.current = null;
//     setIsMic(false);
//     setIsCallStarted(false);
//     navigate("/app");
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       localStream.current?.getTracks().forEach((t) => t.stop());
//     };
//   }, []);

//   const endStreaming = () => {
//     localStream.current?.getTracks().forEach((track) => track.stop())
//     if (localAudio.current)
//       localAudio.current.srcObject = null

//     if (remoteAudio.current)
//       remoteAudio.current.srcObject = null
//   }

//   const endCallOnLocal = () => {
//     setStatus('end')
//     playAudio("/sound/reject.mp3")
//     notify.destroy()
//     socket.emit("end", { to: id })
//     endStreaming()
//     setOpen(true);

//   }

//   const onOffer = (payload: OnOfferInterface) => {
//     try {
//                notify.open({
//                  message: (
//                    <h1 className="capitalize font-medium">
//                      {payload.from.fullname}
//                    </h1>
//                  ),
//                  description: "Incoming...",
//                  duration: 30,
//                  placement: "bottomRight",
//                  onClose: stopAudio,
//                  actions: [
//                    <button
//                      key="accept"
//                      onClick={() => acceptCall(payload)}
//                      className="mr-3 w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-green-400 justify-center shadow-none h-10 hover:bg-green-500">
//                      Accept
//                    </button>,
//                    <button
//                      key="end"
//                      onClick={endCallOnLocal}
//                      className="w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-rose-400 justify-center shadow-none h-10 hover:bg-rose-500">
//                      Reject
//                    </button>,
//                  ],
//                });
//                playAudio("/sound/ring.mp3", true);

//                setStatus("incoming");

//     } catch (err) {
//       CatchError(err)
// }
//   }

//   const onAnswer = async(payload: OnAnswerInterface) => {
//     try {
//       if (!rtc.current) return

//       const answer = new RTCSessionDescription(payload.answer)
//       await rtc.current.setRemoteDescription(answer)
//       setStatus('talking')
//       stopAudio()
//       notify.destroy()
//     } catch (err) {
//       CatchError(err)
//      }
//   }

//   const onCandidate = async (payload: OnCandidiateInterface) => {
//     try {
//       if (!rtc.current) return

//       const candidate = new RTCIceCandidate(payload.candidate)
//       await rtc.current.addIceCandidate(candidate)

//     } catch (err) {
//       CatchError(err)
//     }

//   }

//   const onEndCallRemote = () => {
//     setStatus("end")
//     notify.destroy()
//     playAudio("/sound/reject.mp3")
//     endStreaming()
//     setOpen(true)

//   }

//   const redirectOnCallEnd = () => {
//       setOpen(false);
//       navigate("/app");
//   };

//   //event listeners
//   useEffect(() => {
//     socket.on("offer", onOffer)
//     socket.on("candidate", onCandidate)
//     socket.on("answer", onAnswer)
//     socket.on("end", onEndCallRemote)

//     return () => {
//       socket.off("offer", onOffer)
//        socket.off("candidate", onCandidate);
//       socket.off("answer", onAnswer)
//         socket.off("end", onEndCallRemote);
// }
//   }, [])

//     useEffect(() => {
//       if (sdp) {
//         notify.destroy();
//         // eslint-disable-next-line react-hooks/set-state-in-effect
//         onOffer(sdp);
//       }
//     }, [sdp]);

//   if (!liveActiveSession) {
//     navigate("/app")
//     return null
//   }

//   // ── PRE-CALL SCREEN ─────────────────────────────────────────────────────────
//   if (!isCallStarted) {
//     const remote = participants[1];
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
//         <Card
//           title={
//             <div className="text-center w-full font-semibold text-slate-700">
//               Audio Call
//             </div>
//           }>
//           <div className="flex flex-col items-center gap-5 py-8 px-6">
//             {/* Remote user avatar */}
//             <div className="relative p-1.5 rounded-full bg-slate-100 ring-2 ring-slate-200">
//               {remote.image ? (
//                 <img
//                   src={remote.image}
//                   alt={remote.name}
//                   className="w-28 h-28 rounded-full object-cover shadow-sm"
//                 />
//               ) : (
//                 <div className="w-28 h-28 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-inner">
//                   {remote.initials}
//                 </div>
//               )}
//             </div>

//             <div className="text-center">
//               <p className="text-lg font-semibold text-slate-800 capitalize">
//                 {remote.name}
//               </p>
//               <p className="text-sm text-slate-400 mt-1">Ready to connect</p>
//             </div>

//             {/* Start Call button */}
//             <button
//               onClick={() => setIsCallStarted(true)}
//               className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-emerald-100 transition-all cursor-pointer">
//               <i className="ri-phone-fill text-2xl"></i>
//             </button>

//             <p className="text-xs text-slate-400">Tap to start audio call</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   // ── ACTIVE CALL SCREEN ──────────────────────────────────────────────────────
//   return (
//     <div className="space-y-6 md:space-y-8">
//       {/* Single hidden audio element for local mic monitoring (muted to prevent echo) */}
//       <audio hidden ref={localAudio} muted playsInline />
//       <audio hidden ref={remoteAudio} autoPlay playsInline />

//       {/* PARTICIPANTS GRID — Mobile: 1 Col | sm+: 2 Cols */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {participants.map((user, idx) => (
//           <Card
//             key={idx}
//             title={
//               <div className="text-center w-full font-semibold text-slate-700">
//                 {user.name}
//                 {user.isLocal && (
//                   <span className="ml-2 text-xs font-normal text-slate-400">
//                     (You)
//                   </span>
//                 )}
//               </div>
//             }>
//             <div className="flex flex-col items-center justify-center py-6">
//               {/* Avatar with speaking ring */}
//               <div
//                 className={`relative p-1.5 rounded-full transition-all duration-300 ${
//                   user.isSpeaking
//                     ? "bg-emerald-500/10 ring-4 ring-emerald-500 animate-pulse"
//                     : "bg-slate-100 ring-2 ring-slate-200"
//                 }`}>
//                 {user.image ? (
//                   <img
//                     src={user.image}
//                     alt={`${user.name} avatar`}
//                     className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover shadow-sm"
//                   />
//                 ) : (
//                   <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-inner">
//                     {user.initials}
//                   </div>
//                 )}

//                 {/* Mic status badge */}
//                 <div
//                   className={`absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
//                     user.isSpeaking
//                       ? "bg-emerald-500 text-white"
//                       : "bg-slate-400 text-white"
//                   }`}>
//                   <i
//                     className={
//                       user.isSpeaking
//                         ? "ri-mic-line animate-bounce"
//                         : "ri-mic-off-line"
//                     }></i>
//                 </div>
//               </div>

//               <span
//                 className={`text-xs font-medium mt-4 ${
//                   user.isSpeaking ? "text-emerald-600" : "text-slate-400"
//                 }`}>
//                 {user.isSpeaking ? "Speaking..." : "Muted"}
//               </span>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* BOTTOM CONTROLS */}
//       <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
//         <div className="flex items-center gap-3">
//           {/* Mic toggle — wired to toggleMic, reflects isMic state */}
//           <button
//             onClick={toggleMic}
//             className={`w-12 h-12 rounded-full transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md ${
//               isMic
//                 ? "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-100"
//                 : "bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-slate-100"
//             }`}>
//             <i
//               className={`text-xl ${isMic ? "ri-mic-line" : "ri-mic-off-line"}`}></i>
//           </button>

//           {/* Speaker / output device */}
//           <button className="bg-slate-100 text-slate-600 w-12 h-12 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
//             <i className="ri-volume-up-line text-xl"></i>
//           </button>

//           {(status === "pending" || status === "end") && (
//             <Button icon="phone-line" type="success" onClick={startCall}>
//               Start Call
//             </Button>
//           )}
//           {(status === "calling" || status === "talking") && (
//             <Button icon="phone-line" type="success" onClick={endCallOnLocal}>
//               End Call
//             </Button>
//           )}
//         </div>

//         {/* End Call */}
//         <div className="w-full sm:w-auto">
//           <Button
//             onClick={endCall}
//             icon="close-circle-fill"
//             type="danger"
//             className="w-full sm:w-auto justify-center py-3 text-center flex items-center">
//             End Call
//           </Button>
//         </div>
//       </div>
//       <Modal
//         open={open}
//         footer={null}
//         centered
//         mask={{ closable: true }}
//         onCancel={redirectOnCallEnd}>
//         <div className="text-center space-y-4">
//           <h1 className="text-2xl font-semibold">Call Ended</h1>
//           <Button type="danger" onClick={redirectOnCallEnd}>
//             Thank you !
//           </Button>
//         </div>
//       </Modal>
//       {notifyUi}
//     </div>
//   );
// };

// export default AudioChat;















//////////////////////////////////////////////


/* import { useContext, useEffect, useRef, useState, type JSX } from "react";
import Button from "../shared/Button";
import Card from "../shared/Card";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../../Context";
import CatchError from "../../lib/CatchError";
import HttpInterceptor from "../../lib/HttpInterceptor";
import { Modal, notification } from "antd";
import socket from "../../lib/socket";
import type {
  CallType,
  OnAnswerInterface,
  OnCandidiateInterface,
  OnOfferInterface,
} from "./Video";

const getInitials = (name: string = "") =>
  name
    .split(" ")
    .map((n) => n[0] || "")
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

const AudioChat = (): JSX.Element | null => {
  const { id } = useParams();
  const [isMic, setIsMic] = useState(false);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [status, setStatus] = useState<CallType>("pending");
  const [open, setOpen] = useState(false);
  const [isSpeakingLocal, setIsSpeakingLocal] = useState(false);
  const [isSpeakingRemote, setIsSpeakingRemote] = useState(false);

  const navigate = useNavigate();
  const { session, liveActiveSession, sdp, setSdp } = useContext(Context);

  const localAudio  = useRef<HTMLAudioElement | null>(null);
  const remoteAudio = useRef<HTMLAudioElement | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const rtc         = useRef<RTCPeerConnection | null>(null);
  const audio       = useRef<HTMLAudioElement | null>(null);

  const [notify, notifyUi] = notification.useNotification();

  const participants = [
    {
      name: session?.fullname || "You",
      initials: getInitials(session?.fullname),
      isSpeaking: isSpeakingLocal,
      image: session?.image || "",
      isLocal: true,
    },
    {
      name: liveActiveSession?.fullname || "Unknown",
      initials: getInitials(liveActiveSession?.fullname),
      isSpeaking: isSpeakingRemote,
      image: liveActiveSession?.image || "",
      isLocal: false,
    },
  ];

  // ── Sound helpers ───────────────────────────────────────────────────────────
  const stopAudio = () => {
    if (!audio.current) return;
    audio.current.pause();
    audio.current.currentTime = 0;
  };

  const playAudio = (src: string, loop = false) => {
    stopAudio();
    if (!audio.current) audio.current = new Audio();
    const player = audio.current;
    player.src = src;
    player.loop = loop;
    player.play().catch(() => {});
  };

  // ── Stop all media tracks ───────────────────────────────────────────────────
  const endStreaming = () => {
    localStream.current?.getTracks().forEach((track) => track.stop());
    if (localAudio.current)  localAudio.current.srcObject  = null;
    if (remoteAudio.current) remoteAudio.current.srcObject = null;
  };


  const toggleMic = async () => {
    try {
      if (!isMic && !localAudio.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        if (localAudio.current) localAudio.current.srcObject = stream;

        // Update track in active peer connection
        const audioTrack = stream.getAudioTracks()[0];
        const sender = rtc.current
          ?.getSenders()
          .find((s) => s.track?.kind === "audio");
        if (sender) {
          await sender.replaceTrack(audioTrack);
        }

        localStream.current = stream;
        setIsMic(true);
      } else {
        localStream.current
          ?.getAudioTracks()
          .forEach((track) => (track.enabled = false));
        setIsMic(false);
      }
    } catch (err) {
      CatchError(err);
    }
  };

  const stopAllMediaAndNotifications = () => {
    stopAudio();
    notify.destroy(); // This clears all lingering notification popups
  };

  const cleanupRTC = () => {
    rtc.current?.getSenders().forEach((sender) => {
      try {
        sender.replaceTrack(null);
      } catch {}
    });

    rtc.current?.close();
    rtc.current = null;

    localStream.current?.getTracks().forEach((track) => track.stop());
    localStream.current = null;
  };

  // ── Ensures mic is on before any RTC connection ─────────────────────────────
  const ensureMic = async () => {
    if (localStream.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // localAudio ref is always mounted (outside both screen conditions)
    if (localAudio.current) localAudio.current.srcObject = stream;
    localStream.current = stream;
    setIsMic(true);
  };

  // ── RTCPeerConnection setup ─────────────────────────────────────────────────
  const connection = async () => {
    try {
      console.log("Creating RTC", rtc.current);
      const { data } = await HttpInterceptor.get("/twilio/turn-server");
      rtc.current = new RTCPeerConnection({ iceServers: data });

      const localStreaming = localStream.current;
      if (!localStreaming) return;

      localStreaming.getTracks().forEach((track) => {
        rtc.current?.addTrack(track, localStreaming);
      });

      rtc.current.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("candidate", { candidate: e.candidate, to: id });
        }
      };

      rtc.current.onconnectionstatechange = () => {
        console.log("RTC state:", rtc.current?.connectionState);
      };

      rtc.current.ontrack = (e) => {
        // remoteAudio ref is always mounted — safe to use here
        if (e && remoteAudio.current) {
          remoteAudio.current.srcObject = e.streams[0];
        }
      };
    } catch (err) {
      CatchError(err);
    }
  };

  // ── Initiate outgoing call (triggered by pre-call phone button) ─────────────
  const startCall = async () => {
    try {
      await ensureMic();
      await connection();
      if (!rtc.current) return;

      const offer = await rtc.current.createOffer();
      await rtc.current.setLocalDescription(offer);

      notify.open({
        message: (
          <h1 className="capitalize font-medium">{liveActiveSession?.fullname}</h1>
        ),
        description: "Calling...",
        duration: 30,
        placement: "bottomRight",
        onClose: stopAudio,
        actions: [
          <button
            key="end"
            onClick={endCallOnLocal}
            className="w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-rose-400 text-white h-10 hover:bg-rose-500">
            End call
          </button>,
        ],
      });

      playAudio("/sound/ring.mp3", true);
      setStatus("calling");
      socket.emit("offer", { offer, to: id, from: session, type: "audio" });
    } catch (err) {
      CatchError(err);
    }
  };

  // ── Pre-call phone button handler ───────────────────────────────────────────
  // Sets active screen first (so participant cards are visible while call connects)
  // then fires startCall. Audio refs are always mounted so ensureMic() works fine.
  const handleCallClick = async () => {
    setIsCallStarted(true);
    await startCall();
  };

  // ── Accept incoming call ────────────────────────────────────────────────────
  const acceptCall = async (payload: OnOfferInterface) => {
    try {
      console.count("Accept Click");
      setSdp(null);
      setIsCallStarted(true); // FIX: move remote user to active screen on accept
      await ensureMic();
      await connection();
      if (!rtc.current) return;

      const offer = new RTCSessionDescription(payload.offer);
      console.log("Signal State:", rtc.current?.signalingState);
      console.log("Connection State:", rtc.current?.connectionState);
      await rtc.current.setRemoteDescription(offer);

      const answer = await rtc.current.createAnswer();
      await rtc.current.setLocalDescription(answer);

      stopAllMediaAndNotifications();
      setStatus("talking");
      stopAudio();
      socket.emit("answer", { answer, to: id });
    } catch (err) {
      CatchError(err);
    }
  };

  // ── End WebRTC session from local side ──────────────────────────────────────
  const endCallOnLocal = () => {
    setStatus("end");
    playAudio("/sound/reject.mp3");
    notify.destroy();
    socket.emit("end", { to: id });
    endStreaming();
    setOpen(true);
    cleanupRTC()
  };

  // ── Leave page without an active call ──────────────────────────────────────
  const endCall = () => {
    endStreaming();
    localStream.current = null;
    setIsMic(false);
    setIsCallStarted(false);
    navigate("/app");
  };

  const redirectOnCallEnd = () => {
    setOpen(false);
    navigate("/app");
  };

  // ── Socket: incoming offer ──────────────────────────────────────────────────
  const onOffer = (payload: OnOfferInterface) => {
    try {
      // notifyUi is always in the DOM now — notification renders on any screen
       console.log("AUDIO OFFER");
      notify.open({
        message: (
          <h1 className="capitalize font-medium">{payload.from.fullname}</h1>
        ),
        description: "Incoming call...",
        duration: 30,
        placement: "bottomRight",
        onClose: stopAudio,
        actions: [
          <button
            key="accept"
            onClick={() => acceptCall(payload)}
            className="mr-3 text-xs py-2 px-3 rounded-xl font-bold bg-green-400 text-white h-10 hover:bg-green-500">
            Accept
          </button>,
          <button
            key="reject"
            onClick={endCallOnLocal}
            className="text-xs py-2 px-3 rounded-xl font-bold bg-rose-400 text-white h-10 hover:bg-rose-500">
            Reject
          </button>,
        ],
      });
      playAudio("/sound/ring.mp3", true);
      setStatus("incoming");
    } catch (err) {
      CatchError(err);
    }
  };

  // ── Socket: answer received ─────────────────────────────────────────────────
  const onAnswer = async (payload: OnAnswerInterface) => {
    try {
      if (!rtc.current) return;
      
      console.log("Answer State:", rtc.current.signalingState);

      if (rtc.current.signalingState !== "have-local-offer") {
        console.warn("Duplicate answer ignored");
        return;
      }

      const answer = new RTCSessionDescription(payload.answer);
      await rtc.current.setRemoteDescription(answer);
      setStatus("talking");
      stopAudio();
      notify.destroy();
    } catch (err) {
      CatchError(err);
    }
  };

  // ── Socket: ICE candidate ───────────────────────────────────────────────────
  const onCandidate = async (payload: OnCandidiateInterface) => {
    try {
      if (!rtc.current) return;
      const candidate = new RTCIceCandidate(payload.candidate);
      await rtc.current.addIceCandidate(candidate);
    } catch (err) {
      CatchError(err);
    }
  };

  // ── Socket: remote ended call ───────────────────────────────────────────────
  const onEndCallRemote = () => {
    setStatus("end");
    notify.destroy();
    playAudio("/sound/reject.mp3");
    endStreaming();
    setOpen(true);
    cleanupRTC()
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      localStream.current?.getTracks().forEach((t) => t.stop());
      stopAudio();
    };
  }, []);

  // Socket listeners — registered once on mount
  useEffect(() => {
    socket.on("offer",     onOffer);
    socket.on("candidate", onCandidate);
    socket.on("answer",    onAnswer);
    socket.on("end",       onEndCallRemote);
    return () => {
      socket.off("offer",     onOffer);
      socket.off("candidate", onCandidate);
      socket.off("answer",    onAnswer);
      socket.off("end",       onEndCallRemote);
    };
  }, []);

  // SDP pushed from layout (incoming call before page was loaded)
  useEffect(() => {
    if (sdp) {
      console.log("SDP EFFECT");
      notify.destroy();
      onOffer(sdp);
    }
  }, [sdp]);

  useEffect(() => {
    console.log("Audio Mounted");

    return () => console.log("Audio Unmounted");
  }, []);




  if (!liveActiveSession) {
    navigate("/app");
    return null;
  }

  // ── SINGLE RETURN — audio elements + notifyUi are ALWAYS in the DOM ─────────
  // This fixes two bugs:
  // 1. notifyUi not in DOM on pre-call screen → incoming notification never showed
  // 2. localAudio/remoteAudio refs null when acceptCall ran → tracks never attached
  return (
    <>
      {/* Always mounted — refs must be available before any screen is visible */
//       <audio hidden ref={localAudio}  muted playsInline />
//       <audio hidden ref={remoteAudio} autoPlay playsInline />

//       {/* Always mounted — notifications must work on both screens */}
//       {notifyUi}

//       {!isCallStarted ? (
//         // ── PRE-CALL SCREEN ───────────────────────────────────────────────────
//         // Phone button now calls startCall() directly — no separate Start Call
//         // button needed anywhere in the active screen controls.
//         <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
//           <Card
//             title={
//               <div className="text-center w-full font-semibold text-slate-700">
//                 Audio Call
//               </div>
//             }>
//             <div className="flex flex-col items-center gap-5 py-8 px-6">
//               {/* Remote user avatar */}
//               <div className="relative p-1.5 rounded-full bg-slate-100 ring-2 ring-slate-200">
//                 {participants[1].image ? (
//                   <img
//                     src={participants[1].image}
//                     alt={participants[1].name}
//                     className="w-28 h-28 rounded-full object-cover shadow-sm"
//                   />
//                 ) : (
//                   <div className="w-28 h-28 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-inner">
//                     {participants[1].initials}
//                   </div>
//                 )}
//               </div>

//               <div className="text-center">
//                 <p className="text-lg font-semibold text-slate-800 capitalize">
//                   {participants[1].name}
//                 </p>
//                 <p className="text-sm text-slate-400 mt-1">Ready to connect</p>
//               </div>

//               {/* Single call button — enters active screen + fires startCall() */}
//               <button
//                 onClick={handleCallClick}
//                 className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-emerald-100 transition-all cursor-pointer">
//                 <i className="ri-phone-fill text-2xl"></i>
//               </button>

//               <p className="text-xs text-slate-400">Tap to start audio call</p>
//             </div>
//           </Card>
//         </div>
//       ) : (
//         // ── ACTIVE CALL SCREEN ────────────────────────────────────────────────
//         <div className="space-y-6 md:space-y-8">
//           {/* PARTICIPANT CARDS */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {participants.map((user, idx) => (
//               <Card
//                 key={idx}
//                 title={
//                   <div className="text-center w-full font-semibold text-slate-700">
//                     {user.name}
//                     {user.isLocal && (
//                       <span className="ml-2 text-xs font-normal text-slate-400">
//                         (You)
//                       </span>
//                     )}
//                   </div>
//                 }>
//                 <div className="flex flex-col items-center justify-center py-6">
//                   <div
//                     className={`relative p-1.5 rounded-full transition-all duration-300 ${
//                       user.isSpeaking
//                         ? "bg-emerald-500/10 ring-4 ring-emerald-500 animate-pulse"
//                         : "bg-slate-100 ring-2 ring-slate-200"
//                     }`}>
//                     {user.image ? (
//                       <img
//                         src={user.image}
//                         alt={`${user.name} avatar`}
//                         className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover shadow-sm"
//                       />
//                     ) : (
//                       <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-inner">
//                         {user.initials}
//                       </div>
//                     )}
//                     <div
//                       className={`absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
//                         user.isSpeaking
//                           ? "bg-emerald-500 text-white"
//                           : "bg-slate-400 text-white"
//                       }`}>
//                       <i
//                         className={
//                           user.isSpeaking
//                             ? "ri-mic-line animate-bounce"
//                             : "ri-mic-off-line"
//                         }></i>
//                     </div>
//                   </div>

//                   <span
//                     className={`text-xs font-medium mt-4 ${
//                       user.isSpeaking ? "text-emerald-600" : "text-slate-400"
//                     }`}>
//                     {user.isSpeaking ? "Speaking..." : "Muted"}
//                   </span>
//                 </div>
//               </Card>
//             ))}
//           </div>

//           {/* BOTTOM CONTROLS — no Start Call button, only mic + speaker + end */}
//           <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
//             <div className="flex items-center gap-3">
//               {/* Mic toggle */}
//               <button
//                 onClick={toggleMic}
//                 className={`w-12 h-12 rounded-full transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md ${
//                   isMic
//                     ? "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-100"
//                     : "bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-slate-100"
//                 }`}>
//                 <i className={`text-xl ${isMic ? "ri-mic-line" : "ri-mic-off-line"}`}></i>
//               </button>

//               {/* Speaker */}
//               <button className="bg-slate-100 text-slate-600 w-12 h-12 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
//                 <i className="ri-volume-up-line text-xl"></i>
//               </button>
//             </div>

//             {/* End call — ends WebRTC when active, leaves page otherwise */}
//             <div className="w-full sm:w-auto">
//               <Button
//                 onClick={
//                   status === "calling" || status === "talking"
//                     ? endCallOnLocal
//                     : endCall
//                 }
//                 icon="close-circle-fill"
//                 type="danger"
//                 className="w-full sm:w-auto justify-center py-3 text-center flex items-center">
//                 End Call
//               </Button>
//             </div>
//           </div>

//           {/* Call ended modal */}
//           <Modal
//             open={open}
//             footer={null}
//             centered
//             maskClosable
//             onCancel={redirectOnCallEnd}>
//             <div className="text-center space-y-4">
//               <h1 className="text-2xl font-semibold">Call Ended</h1>
//               <Button type="danger" onClick={redirectOnCallEnd}>
//                 Thank you!
//               </Button>
//             </div>
//           </Modal>
//         </div>
//       )}
//     </>
//   );
// };

// export default AudioChat; */















/* 



import { useState, useContext, useEffect } from "react";
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
import Avatar from "../shared/Avatar";
import socket from "../../lib/socket";
import type { OnOfferInterface } from "./Video";

const eightMinutesInMillisecond = 8 * 60 * 1000;
const Layout = () => {
  const params = useParams();
  const paramsArray = Object.keys(params);
  const { liveActiveSession, setLiveActiveSession, setSdp } =
    useContext(Context);
  const [leftAsideSize, setLeftAsideSize] = useState(350);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<
    "workspace" | "discover"
  >("workspace");
  const [activeRightTab, setActiveRightTab] = useState<"activity" | "explore">(
    "activity",
  );
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const rightAsideSize = 420;
  const collapseSize = 75;

  const { error } = useSWR("/auth/refresh-token", Fetcher, {
    refreshInterval: eightMinutesInMillisecond,
    shouldRetryOnError: false,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { session, setSession } = useContext(Context);

  // Check if the current route is a communication view that requires a full screen override on mobile
  const isCommunicationView =
    pathname.includes("/app/chat") ||
    pathname.includes("/app/video") ||
    pathname.includes("/app/audio");

  const menus = [
    { href: "/app/dashboard", label: "dashboard", icon: "ri-home-4-line" },
    { href: "/app/posts", label: "my posts", icon: "ri-article-line" },
    { href: "/app/friends", label: "friends", icon: "ri-team-line" },
  ];

  const getPathName = (path: string) => {
    const firstPath = path.split("/").pop();
    return firstPath?.split("-").join(" ") || "";
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
        const { data: user } = await HttpInterceptor.put(
          "/auth/profile-picture",
          { path },
        );
        setSession({ ...session, image: user.image });
        mutate("/auth/refresh-token");
      } catch (err) {
        console.error(err);
      }
    };
  };

  const logout = async () => {
    try {
      await HttpInterceptor.post("/auth/logout");
      setSession(null);
      navigate("/login");
    } catch (err) {
      CatchError(err);
    }
  };

  const onOffer = (payload: OnOfferInterface) => {
    setSdp(payload);
    setLiveActiveSession(payload.from);
    if(payload.type === 'video')
     return navigate(`/app/video/${payload.from.socketId}`);
    if (payload.type === 'audio')
      return navigate(`/app/audio/${payload.from.socketId}`)
      if (payload.type === "chat")
        return navigate(`/app/chat/${payload.from.socketId}`);
  };

  useEffect(() => {
    socket.on("offer", onOffer);
    return () => {
      socket.off("offer", onOffer);
    };
  }, []);

  useEffect(() => {
    if (error) logout();
  }, [error]);

  const ActiveSessionUi = () => {
    if (!liveActiveSession) {
      navigate("/app");
      return;
    }
    return (
      <div>
        <Avatar
          image={liveActiveSession.image ? liveActiveSession.image : "null"}
          title={liveActiveSession.fullname}
          subtitle="online"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-600">
      {/* DESKTOP ENGINE FLOW */
//       {isCommunicationView ? (
//         /* 🚀 Communication Full Screen Override View Mode
//             If a user is inside a chat conversation or a call, we drop standard tab navigation hulls
//             to let the chat box or video track take 100% viewport width and height.
//           */
//         <div className=" hidden lg:flex w-full flex-1  flex-col min-h-0 bg-white">
//           {/* Top Navigation Backbar for Full-Screen Mode */}
//           <div className="h-14 border-b border-slate-100 flex items-center px-4 gap-3 shrink-0 bg-slate-50">
//             <button
//               onClick={() => navigate("/app/dashboard")}
//               className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-700 active:scale-95 transition-transform">
//               <i className="ri-arrow-left-line text-lg"></i>
//             </button>
//             <span className="text-sm font-bold text-slate-800 uppercase tracking-wide ">
//               {paramsArray.length > 0 ? (
//                 // eslint-disable-next-line react-hooks/static-components
//                 <ActiveSessionUi />
//               ) : (
//                 getPathName(pathname)
//               )}
//             </span>
//           </div>

//           {/* Active Sub-route Content Container */}
//           <div className="flex-1 overflow-hidden">
//             <Outlet />
//           </div>
//         </div>
//       ) : (
//         <div className="hidden lg:block">
//           <DesktopLayout
//             leftAsideSize={leftAsideSize}
//             setLeftAsideSize={setLeftAsideSize}
//             rightAsideSize={rightAsideSize}
//             collapseSize={collapseSize}
//             pathname={pathname}
//             menus={menus}
//             session={session}
//             getPathName={getPathName}
//             uploadImage={uploadImage}
//             logout={logout}
//             activeRightTab={activeRightTab}
//             setActiveRightTab={setActiveRightTab}
//           />
//         </div>
//       )}

//       {/* MOBILE ENGINE FLOW */}
//       <div className=" lg:hidden flex-1 flex flex-col min-h-0">
//         {isCommunicationView ? (
//           /* 🚀 Communication Full Screen Override View Mode
//             If a user is inside a chat conversation or a call, we drop standard tab navigation hulls
//             to let the chat box or video track take 100% viewport width and height.
//           */
//           <div className="w-full flex-1 flex flex-col min-h-0 bg-white">
//             {/* Top Navigation Backbar for Full-Screen Mode */}
//             <div className="h-14 border-b border-slate-100 flex items-center px-4 gap-3 shrink-0 bg-slate-50">
//               <button
//                 onClick={() => navigate("/app/dashboard")}
//                 className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-700 active:scale-95 transition-transform">
//                 <i className="ri-arrow-left-line text-lg"></i>
//               </button>
//               <span className="text-sm font-bold text-slate-800 uppercase tracking-wide ">
//                 {paramsArray.length > 0 ? (
//                   // eslint-disable-next-line react-hooks/static-components
//                   <ActiveSessionUi />
//                 ) : (
//                   getPathName(pathname)
//                 )}
//               </span>
//             </div>

//             {/* Active Sub-route Content Container */}
//             <div className="flex-1 overflow-hidden">
//               <Outlet />
//             </div>
//           </div>
//         ) : (
//           /* Standard Shell Views (Dashboard, Friends list, Post feeds) */
//           <MobileLayout
//             pathname={pathname}
//             menus={menus}
//             session={session}
//             getPathName={getPathName}
//             uploadImage={uploadImage}
//             logout={logout}
//             isMobileProfileOpen={isMobileProfileOpen}
//             setIsMobileProfileOpen={setIsMobileProfileOpen}
//             mobileActiveTab={mobileActiveTab}
//             setMobileActiveTab={setMobileActiveTab}
//             isEditProfileModalOpen={isEditProfileModalOpen}
//             setIsEditProfileModalOpen={setIsEditProfileModalOpen}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Layout;

// */
















///////////////////////////////////////////////






/* 
import { useContext, useEffect, useRef, useState } from "react";
import CatchError from "../../lib/CatchError";
import Button from "../shared/Button";
import Context from "../../Context";
import { toast } from "react-toastify";
import socket from "../../lib/socket";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { Modal } from "antd";
import HttpInterceptor from "../../lib/HttpInterceptor";

export interface OnOfferInterface {
  offer: RTCSessionDescriptionInit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: any;
  type: 'video' | 'audio' | 'chat'
}
export interface OnAnswerInterface {
  answer: RTCSessionDescriptionInit;
  from: string;
}
export interface OnCandidiateInterface {
  candidate: RTCIceCandidateInit;
  from: string;
}

export type CallType = "pending" | "calling" | "incoming" | "talking" | "end";
export type AudioSrcType = "/sound/ring.mp3" | "/sound/reject.mp3" | "/sound/busy.mp3";

const getCallDuration = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");

  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }

  return `${pad(mins)}:${pad(secs)}`;
};

const Video = () => {
  const navigate = useNavigate();
  const { session, liveActiveSession, sdp, setSdp } = useContext(Context);
  const { id } = useParams();
  const [notify, notifyUi] = notification.useNotification();

  const localVideoContainerRef = useRef<HTMLDivElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoContainerRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const rtcRef = useRef<RTCPeerConnection | null>(null);
  const remoteSocketIdRef = useRef<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  // const rtc = rtcRef.current;

  const [isVideoSharing, setIsVideoSharing] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState<CallType>("pending");
  const [timer, setTimer] = useState(0);
  const [open, setOpen] = useState(false);

  const stopAudio = () => {
    if (!audio.current) return;
    const player = audio.current;
    player.pause();
    player.currentTime = 0;
  };

  const playAudio = (src: AudioSrcType, loop: boolean = false) => {
    stopAudio();

    if (!audio.current) audio.current = new Audio();

    const player = audio.current;
    player.src = src;
    player.loop = loop;
    player.load();
    player.play();
  };

  const toggleScreen = async () => {
    try {
      const localVideo = localVideoRef.current;
      if (!localVideo) return;
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const screenShareTrack = stream.getVideoTracks()[0];
        const senderVideoTrack = rtcRef.current
          ?.getSenders()
          .find((s) => s.track?.kind === "video");
        if (screenShareTrack && senderVideoTrack) {
          await senderVideoTrack.replaceTrack(screenShareTrack);
        }
        localVideo.srcObject = stream;
        localStreamRef.current = stream;
        setIsScreenSharing(true);

        //detect screen sharing off
        screenShareTrack.onended = async () => {
          setIsScreenSharing(false);
          const videoCamStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          const videoTrack = videoCamStream.getVideoTracks()[0];
          const senderTrack = rtcRef.current
            ?.getSenders()
            .find((s) => s.track?.kind === "video");
          if (videoTrack && senderTrack) {
            await senderTrack.replaceTrack(videoTrack);
          }
          localVideo.srcObject = videoCamStream;
          localStreamRef.current = videoCamStream;
          // setIsScreenSharing(true);
        };
      } else {
        const localStream = localStreamRef.current;
        if (!localStream) return;
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
        localVideo.srcObject = null;
        localStreamRef.current = null;
        setIsScreenSharing(false);
      }
    } catch (err) {
      CatchError(err);
    }
  };
  const toggleVideo = async () => {
    try {
      const localVideo = localVideoRef.current;
      if (!localVideo) return;

      if (!isVideoSharing) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localVideo.srcObject = stream;
        localStreamRef.current = stream;
        setIsVideoSharing(true);
        setIsMuted(false);
      } else {
        const localStream = localStreamRef.current;
        if (!localStream) return;
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
        localVideo.srcObject = null;
        localStreamRef.current = null;
        setIsVideoSharing(false);
        setIsMuted(true);
      }
    } catch (err) {
      CatchError(err);
    }
  };
  const toggleMic = async () => {
    try {
      const localStream = localStreamRef.current;
      if (!localStream) return;
      const audioTrack = localStream
        .getTracks()
        .find((track) => track.kind === "audio");

      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    } catch (err) {
      CatchError(err);
    }
  };

  const toggleFullScreen = (type: "local" | "remote") => {
    try {
      if (!isVideoSharing && !isScreenSharing) {
        toast.warning("Please start your video firest! ", {
          position: "top-center",
        });
        return;
      }

      const videoContainer =
        type === "local"
          ? localVideoContainerRef.current
          : remoteVideoContainerRef.current;
      if (!videoContainer) return;
      if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } catch (err) {
      CatchError(err);
    }
  };

  //older with bugs
  /*  const webRtcConnection = () => {
    //new added line
    if (rtcRef.current) {
      return rtcRef.current;
    }

    rtcRef.current = new RTCPeerConnection(config);

    const localStream = localStreamRef.current;

    if (!rtcRef.current || !localStream) return;

    localStream.getTracks().forEach((track) => {
      rtcRef.current?.addTrack(track, localStream);
    });

    rtcRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("candidate", { candidate: e.candidate, to: id });
      }
    };
    rtcRef.current.onconnectionstatechange = () => {
      console.log(rtcRef.current?.connectionState);
    };
    rtcRef.current.ontrack = (e) => {
      console.log("recieving from remote");
      const remoteStream = e.streams[0];
      const remoteVideo = remoteVideoRef.current;
      if (!remoteStream || !remoteVideo) return;

      remoteVideo.srcObject = remoteStream;
    };
  }; */

  //new with fixes
//   const webRtcConnection = async () => {
//     // if (rtcRef.current) return rtcRef.current;
//     const { data } = await HttpInterceptor.get("/twilio/turn-server");

//     rtcRef.current = new RTCPeerConnection({ iceServers: data });

//     const localStream = localStreamRef.current;
//     if (localStream) {
//       localStream.getTracks().forEach((track) => {
//         rtcRef.current?.addTrack(track, localStream);
//       });
//     }

//     rtcRef.current.onicecandidate = (e) => {
//       if (e.candidate) {
//         const target = remoteSocketIdRef.current || id;
//         socket.emit("candidate", { candidate: e.candidate, to: target });
//       }
//     };

//     rtcRef.current.onconnectionstatechange = () => {
//       console.log("Connection state:", rtcRef.current?.connectionState);
//     };

//     rtcRef.current.ontrack = (e) => {
//       //remoteStream = e.streams[0]
//       //remoteVideo = remoteVideoRef.current
//       if (!remoteVideoRef.current && !e.streams[0]) return;
//       if (remoteVideoRef.current && e.streams[0]) {
//         remoteVideoRef.current.srcObject = e.streams[0];
//       }

//       const videoTracks = e.streams[0].getVideoTracks()[0];
//       if (videoTracks) {
//         videoTracks.onmute = () => {};
//         videoTracks.onunmute = () => {};
//         videoTracks.onended = () => {};
//       }
//     };

//     return rtcRef.current;
//   };

//   //old
//   /*   const acceptCall = async (payload: OnOfferInterface) => {
//     try {
//       webRtcConnection();
//       console.log("ACCEPT CALL CLICKED");
//       if (!rtcRef.current) return;
//       const offer = new RTCSessionDescription(payload.offer);
//       await rtcRef.current.setRemoteDescription(offer);

//       const answer = await rtcRef.current.createAnswer();
//       await rtcRef.current.setLocalDescription(answer);

//       socket.emit("answer", { answer, to: id });
//     } catch (err) {
//       CatchError(err);
//     }
//   }; */

//   //new
//   const acceptCall = async (payload: OnOfferInterface) => {
//     try {
//       setSdp(null);
//       remoteSocketIdRef.current = payload.from.socketId; // ← Critical fix

//       if (!localStreamRef.current) {
//         await toggleVideo(); // ensure local media before answer
//       }

//       const rtc = await webRtcConnection();
//       if (!rtcRef.current) return;

//       const offer = new RTCSessionDescription(payload.offer);
//       await rtc.setRemoteDescription(offer);

//       const answer = await rtc.createAnswer();
//       await rtc.setLocalDescription(answer);
//       notify.destroy();
//       setStatus("talking");
//       stopAudio();

//       socket.emit("answer", { answer, to: payload.from.socketId }); // use payload.from
//     } catch (err) {
//       CatchError(err);
//     }
//   };

//   const startCall = async () => {
//     try {
//       if (!isVideoSharing && !isScreenSharing)
//         return toast("Start your video fiirst", { position: "top-center" });
//       // await toggleVideo();
//       await webRtcConnection();
//       if (!rtcRef.current) return;
//       const offer = await rtcRef.current.createOffer();
//       await rtcRef.current.setLocalDescription(offer);
//       setStatus("calling");
//       playAudio("/sound/ring.mp3", true);
//       notify.open({
//         title: (
//           <h1 className="capitalize font-medium">
//             {liveActiveSession.fullname}
//           </h1>
//         ),
//         description: "Calling....",
//         duration: 30,
//         placement: "bottomRight",
//         onClose: stopAudio,
//         actions: [
//           <button
//             onClick={endCallFromLocal}
//             key="end"
//             className="w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-rose-400 justify-center shadow-none h-10 hover:bg-rose-500">
//             End Call
//           </button>,
//         ],
//       });
//       socket.emit("offer", { offer: offer, to: id, from: session, type: 'video'});
//     } catch (err) {
//       CatchError(err);
//     }
//   };

//   const redirectOnCallEnd = () => {
//     setOpen(false);
//     navigate("/app");
//   };

//   const endStreaming = () => {
//     localStreamRef.current?.getTracks().forEach((track) => track.stop());
//     if (localVideoRef.current) localVideoRef.current.srcObject = null;
//     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
//   };

//   //to end call on local computer
//   const endCallFromLocal = () => {
//     setStatus("end");
//     playAudio("/sound/reject.mp3");
//     notify.destroy();
//     socket.emit("end", { to: id });
//     endStreaming();
//     setOpen(true);
//   };
//   //this is for who end or who rejected the call
//   //to end call on remote computer
//   const onEndCallRemote = () => {
//     setStatus("end");
//     notify.destroy();
//     playAudio("/sound/reject.mp3");
//     endStreaming();
//     setOpen(true);
//   };

//   //EventListeners

//   const onOffer = (payload: OnOfferInterface) => {
//     setStatus("incoming");

//     notify.open({
//       title: (
//         <h1 className="capitalize font-medium">{payload.from.fullname}</h1>
//       ),
//       description: "Incoming call...",
//       duration: 30,
//       placement: "bottomRight",
//       actions: [
//         <div key="calls" className="space-x-3">
//           <button
//             onClick={() => acceptCall(payload)}
//             className="w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-green-400 justify-center shadow-none h-10 hover:bg-green-500">
//             Accept
//           </button>
//           <button
//             onClick={endCallFromLocal}
//             className="w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-rose-400 justify-center shadow-none h-10 hover:bg-rose-500">
//             Decline
//           </button>
//         </div>,
//       ],
//     });
//   };

//   //connect both users via webRTC
//   const onCandidate = async (payload: OnCandidiateInterface) => {
//     try {
//       if (!rtcRef.current) return;
//       //const candidate = new RTCIceCandidate(payload.candidate);
//       await rtcRef.current.addIceCandidate(
//         new RTCIceCandidate(payload.candidate),
//       );
//     } catch (err) {
//       CatchError(err);
//     }
//   };

//   const onAnswer = async (payload: OnAnswerInterface) => {
//     try {
//       if (!rtcRef.current) return;

//       //const answer = new RTCSessionDescription(payload.answer);
//       await rtcRef.current.setRemoteDescription(
//         new RTCSessionDescription(payload.answer),
//       );
//       setStatus("talking");
//       notify.destroy();
//       stopAudio();
//       // console.log("REMOTE DESCRIPTION SET");
//     } catch (err) {
//       CatchError(err);
//     }
//   };

//   useEffect(() => {
//     socket.on("offer", onOffer);
//     socket.on("candidate", onCandidate);

//     socket.on("answer", onAnswer);
//     socket.on("end", onEndCallRemote);
//     return () => {
//       socket.off("offer", onOffer);
//       socket.off("candidate", onCandidate);

//       socket.off("answer", onAnswer);
//       socket.off("end", onEndCallRemote);
//     };
//   }, []);

//   useEffect(() => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     let interval: any;
//     if (status === "talking") {
//       interval = setInterval(() => {
//         setTimer((prev) => prev + 1);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [status]);

//   useEffect(() => {
//     if (!liveActiveSession) {
//       navigate("/app");
//     }
//   }, [liveActiveSession, navigate]);

//   //detect coming offer
//   useEffect(() => {
//     if (sdp) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       onOffer(sdp);
//     }

//     // return () => {};
//   }, [sdp]);

//   // if (!liveActiveSession) {
//   //   return navigate("/app")
//   // }

//   return (
//     <div className="space-y-4 p-3">
//       {/* PRINCIPAL PRIMARY FEED CAM WORKSPACE VIEWPORT */}
//       <div
//         ref={remoteVideoContainerRef}
//         className="bg-slate-950 w-full aspect-video relative rounded-2xl shadow-inner overflow-hidden border border-slate-800">
//         <video
//           ref={remoteVideoRef}
//           className="w-full h-full object-cover absolute top-0 left-0"
//           autoPlay
//           playsInline></video>

//         <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-white bg-slate-900/70 text-xs font-semibold">
//         {liveActiveSession.fullname}
//         </div>

//         <button
//           onClick={() => toggleFullScreen("remote")}
//           title="Maximize"
//           className="absolute bottom-3 right-3 w-8 h-8 rounded-lg text-white bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center transition-all active:scale-90 cursor-pointer border border-white/10">
//           <i className="ri-fullscreen-line text-sm"></i>
//         </button>
//       </div>

//       {/* SUBSCRIBER STREAM MULTI-PARTICIPANT ROW TRACK */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <div
//           ref={localVideoContainerRef}
//           className="bg-slate-900 aspect-video rounded-xl relative overflow-hidden border border-slate-800">
//           <video
//             ref={localVideoRef}
//             muted
//             className="w-full h-full object-cover absolute top-0 left-0"
//             autoPlay
//             playsInline></video>
//           <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-white bg-slate-950/50 text-[10px] font-medium capitalize">
//             {session && session.fullname}
//           </div>

//           <button
//             onClick={() => toggleFullScreen("local")}
//             title="Maximize"
//             className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-lg text-white bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center transition-all active:scale-90 cursor-pointer border border-white/10">
//             <i className="ri-fullscreen-line text-sm"></i>
//           </button>
//         </div>

//         <button
//           onClick={() => alert("Open invite modal...")}
//           className="group flex flex-col items-center justify-center gap-2 bg-slate-50 border-2 border-dashed border-slate-200 aspect-video rounded-xl transition-all hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer">
//           <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-100 text-slate-400 group-hover:text-blue-500 flex items-center justify-center transition-colors">
//             <i className="ri-user-add-line text-lg"></i>
//           </div>
//           <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-500 transition-colors">
//             Add Participant
//           </span>
//         </button>
//       </div>

//       {/* UTILITY MEDIA CALL COMMANDS CONSOLE BAR CONTAINER */}
//       <div className="bg-white border border-gray-100 p-3 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
//         <div className="flex items-center gap-2">
//           <button
//             onClick={toggleVideo}
//             className="bg-gray-100 text-gray-700 w-10 h-10 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
//             {isVideoSharing ? (
//               <i className="ri-vidicon-line text-base"></i>
//             ) : (
//               <i className="ri-video-off-line text-base"></i>
//             )}
//           </button>
//           <button
//             onClick={toggleMic}
//             className="bg-gray-100 text-gray-700 w-10 h-10 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
//             {isMuted ? (
//               <i className="ri-mic-off-line text-base"></i>
//             ) : (
//               <i className="ri-mic-line text-base"></i>
//             )}
//           </button>
//           <button
//             onClick={toggleScreen}
//             className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
//             {isScreenSharing ? (
//               <i className="ri-chat-off-line text-base"></i>
//             ) : (
//               <i className="ri-computer-line text-base"></i>
//             )}
//           </button>
//         </div>

//         <div className="w-full sm:w-auto">
//           {status === "talking" && <label>{getCallDuration(timer)}</label>}
//           {(status === "pending" || status === "end") && (
//             <Button
//               type="success"
//               icon="phone-line"
//               className="w-full sm:w-auto text-xs py-2 px-4 rounded-xl font-bold justify-center shadow-none h-10"
//               onClick={startCall}>
//               Start Connection
//             </Button>
//           )}
//           {status === "talking" && (
//             <Button
//               type="danger"
//               icon="close-circle-line"
//               className="w-full sm:w-auto text-xs py-2 px-4 rounded-xl font-bold justify-center shadow-none h-10"
//               onClick={endCallFromLocal}>
//               End
//             </Button>
//           )}
//         </div>
//       </div>
//       <Modal
//         open={open}
//         footer={null}
//         centered
//         mask={{ closable: true }}
//         onCancel={redirectOnCallEnd}>
//         <div className="text-center space-y-4">
//           <h1 className="text-2xl font-semibold">Call Ended</h1>
//           <Button type="danger" onClick={redirectOnCallEnd}>
//             Thank you !
//           </Button>
//         </div>
//       </Modal>
//       {notifyUi}
//     </div>
//   );
// };

// export default Video;















