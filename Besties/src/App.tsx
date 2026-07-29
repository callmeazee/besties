// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./component/Home";
// import Login from "./component/Login";
// import Signup from "./component/Signup";
// import Layout from "./component/app/Layout";
// import Post from "./component/app/Post";
// import Friends from "./component/app/friends/Friends";
// import Dashboard from "./component/app/Dashboard";
// import Video from "./component/app/Video";
// import Chat from "./component/app/Chat";
// import NotFound from "./component/shared/NotFound";
// import { ToastContainer } from "react-toastify";
// import Context from "./Context";
// import { useState } from "react";
// import AuthGuard from "./guards/AuthGuard";
// import RedirectGuard from "./guards/RedirectGuard";
// import AudioChat from "./component/app/Audio";

// const App = () => {
//   const [session, setSession] = useState(null);
//   const [liveActiveSession, setLiveActiveSession] = useState(null);
//   const [sdp, setSdp] = useState(null);
//   return (
//     <Context.Provider
//       value={{
//         session,
//         setSession,
//         liveActiveSession,
//         setLiveActiveSession,
//         sdp,
//         setSdp,
//       }}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />

//           <Route element={<RedirectGuard />}>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//           </Route>

//           <Route element={<AuthGuard />}>
//             <Route path="/app" element={<Layout />}>
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="posts" element={<Post />} />
//               <Route path="friends" element={<Friends />} />
//               <Route path="video/:id" element={<Video />} />

//               <Route path="audio/:id" element={<AudioChat /> } />
//               <Route path="chat/:id" element={<Chat />} />
//               {/* <Route path="friends" element={<Friends />} /> */}
//             </Route>
//           </Route>

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//         <ToastContainer />
//       </BrowserRouter>
//     </Context.Provider>
//   );
// };

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Context from "./Context";

import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";

import Layout from "./component/app/Layout";
import Dashboard from "./component/app/Dashboard";
import Post from "./component/app/Post";
import Profile from "./component/app/Profile";
import Friends from "./component/app/friends/Friends";
import Chat from "./component/app/Chat";
import Video from "./component/app/Video";
import AudioChat from "./component/app/Audio";

import AuthGuard from "./guards/AuthGuard";
import RedirectGuard from "./guards/RedirectGuard";

import NotFound from "./component/shared/NotFound";

const App = () => {
  const [session, setSession] = useState(null);
  const [liveActiveSession, setLiveActiveSession] = useState(null)
  const [sdp, setSdp] = useState(null)
  return (
    <Context.Provider
      value={{
        session,
        setSession,
        liveActiveSession,
        setLiveActiveSession,
        sdp,
        setSdp
      }}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />

          {/* Guest */}
          <Route element={<RedirectGuard />}>
            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected */}
          <Route element={<AuthGuard />}>
            <Route path="/app" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="posts" element={<Post />} />

              <Route path="friends" element={<Friends />} />

              <Route path="profile/:id" element={<Profile />} />

              <Route path="chat/:id" element={<Chat />} />

              <Route path="audio/:id" element={<AudioChat />} />

              <Route path="video/:id" element={<Video />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;