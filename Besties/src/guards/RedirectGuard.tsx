// import CatchError from "./lib/CatchError";

import { useContext, useEffect } from "react";
import HttpInterceptor from "../lib/HttpInterceptor";
import Context from "../Context";
// import Loader from "./component/shared/Loader";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../component/shared/Loader";

const RedirectGuard = () => {
  const { session, setSession } = useContext(Context);
  const getSession = async () => {
    try {
      const { data } = await HttpInterceptor.get("/auth/session");
      setSession(data);
    } catch (err) {
      setSession(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  if (session === null) return <Loader />;
  // or we can return skeleton of antdesign also if we dont have our own loader
  // return <Skeleton active />     (import Skeleton from 'antd')

  if (session === false) return <Outlet />;

  return <Navigate to={"/app"} />;
};

export default RedirectGuard;
