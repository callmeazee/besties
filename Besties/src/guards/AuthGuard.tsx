// import CatchError from "./lib/CatchError";

import { useContext, useEffect, useRef } from "react";
import HttpInterceptor from "../lib/HttpInterceptor";
import Context from "../Context";
// import Loader from "./component/shared/Loader";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../component/shared/Loader";
import socket from "../lib/socket";

const AuthGuard = () => {
  const { session, setSession } = useContext(Context);
  const joinHandlerRef = useRef<(() => void) | null>(null);

  const getSession = async () => {
    try {
      const { data } = await HttpInterceptor.get("/auth/session");
      setSession(data);
      // Connect socket and join signaling room
      socket.connect();
      const userId = data?.id || data?._id;
      if (userId) {
        const joinHandler = () => {
          socket.emit("join", userId);
        };
        joinHandlerRef.current = joinHandler;
        socket.on("connect", joinHandler);
        // If already connected, join immediately
        if (socket.connected) {
          socket.emit("join", userId);
        }
      }
    } catch (err) {
      setSession(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getSession();
    return () => {
      if (joinHandlerRef.current) {
        socket.off("connect", joinHandlerRef.current);
      }
      socket.disconnect();
    };
  }, []);

  if (session === null) return <Loader />;
  // return <Loader />;
  if (session === false) return <Navigate to="/login" />;

  return <Outlet />;
};

export default AuthGuard;
