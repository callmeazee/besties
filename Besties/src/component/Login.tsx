import Card from "./shared/Card";
import Input from "./shared/Input";
import Button from "./shared/Button";
import IconButton from "./shared/IconButton";
import { Link, useNavigate } from "react-router-dom";
import Form, { type FormDataType } from "./shared/Form";
import HttpInterceptor from "../lib/HttpInterceptor";
import CatchError from "../lib/CatchError";

import { useContext } from "react";
import Context from "../Context";

const Login = () => {
  const { setSession } = useContext(Context);
  const navigate = useNavigate();
  const handleLogin = async (values: FormDataType) => {
    try {
      await HttpInterceptor.post("/auth/login", values);
      const { data } = await HttpInterceptor.get("/auth/session");
      setSession(data);
      navigate("/app/dashboard");
    } catch (err: unknown) {
      CatchError(err);
    }
  };
  return (
    // Centered outer canvas block wrapper layout
    <div className="bg-slate-50 flex items-center justify-center min-h-screen px-4 py-8">
      {/* Fluid width constraint matching the signup card metrics for layout symmetry */}
      <div className="w-full max-w-4xl min-w-0">
        <Card noPadding className="shadow-2xl border border-slate-100">
          {/* Main Layout Splitting Track: Column on mobile, Row on medium screens upwards */}
          <div className="flex flex-col md:flex-row w-full min-w-0">
            {/* 1. LEFT SIDE: DECORATIVE CINEMATIC GRAPHIC PANEL */}
            {/* FIX: Force minimum height match and use flex-col justify-between to anchor vector flush to base */}
            <div className="hidden md:flex flex-1 min-w-0 min-h-137.5 bg-linear-to-b from-indigo-600 to-purple-600 p-8 pb-0 flex-col justify-between text-center relative isolate overflow-hidden animate__animated animate__fadeIn">
              {/* Background Accent Subtle Geometric Blur Glows */}
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none"></div>

              {/* 1. TEXT BANNER INFO - SHIFTED TO THE TOP FOR DESIGN BALANCE */}
              <div className="text-white max-w-64 mx-auto z-10 mt-4 animate__animated animate__fadeInDown">
                <h3 className="text-sm font-black tracking-wider uppercase opacity-95 flex items-center justify-center gap-1.5">
                  <i className="ri-team-fill text-amber-300"></i> Welcome Back!
                </h3>
                <p className="text-xs text-indigo-100/80 mt-2 leading-relaxed font-semibold wrap-break-words">
                  Jump back into your feed! Connect with friends, share your
                  latest updates, stream live moments, and see what's trending
                  across your global community right now
                </p>
              </div>

              {/* 2. VECTOR SVG IMAGE CONTAINMENT BOUNDS - PINNED FLUSH TO BOTTOM WITHOUT CLIPPING */}
              {/* FIX: Using absolute bottom positioning anchors it cleanly so slide-up physics display beautifully */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-56 lg:max-w-60 transform hover:scale-102 transition-all duration-500 ease-out z-10 select-none flex items-end justify-center animate__animated animate__slideInUp">
                <img
                  src="/images/login.svg"
                  alt="Secure authorization illustration graphic asset"
                  className="w-full h-auto drop-shadow-2xl object-bottom align-bottom block"
                  style={{ display: "block", margin: 0, padding: 0 }}
                />
              </div>
            </div>

            {/* 2. RIGHT SIDE: AUTHORIZATION FORM INTERACTIVE PANEL */}
            <div className="flex-1 min-w-0 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              {/* Heading Section */}
              <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                  Account Sign In
                </h1>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  Enter your credentials to re-initialize your workspace
                  tracking feed.
                </p>
              </div>

              {/* Form Submission Execution Engine */}
              <Form className="space-y-4" onValue={handleLogin}>
                <div className="space-y-3.5">
                  <Input
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                  />
                  <div className="space-y-1">
                    <Input
                      name="password"
                      placeholder="Enter security password"
                      type="password"
                    />
                    {/* Forgot Password Link Helper */}
                    <div className="flex justify-end px-1">
                      <button
                        type="button"
                        className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                        onClick={() =>
                          alert("Password reset trigger initialized.")
                        }>
                        Forgot Password?
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submitting Actions Row using global component primitives */}
                <div className="pt-2">
                  <Button
                    type="secondary"
                    icon="login-box-fill"
                    className="w-full py-3 rounded-xl font-bold tracking-wide shadow-md shadow-indigo-100">
                    Initialize Login
                  </Button>
                </div>
              </Form>

              {/* Third-Party OAuth Sign-In Split */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 border-t border-slate-100 w-full"></div>
                <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Or Connect Via
                </span>
              </div>

              {/* Quick Social Authentication Row utilizing your IconButton primitives */}
              <div className="flex gap-3 justify-center">
                <IconButton
                  icon="google-fill"
                  type="primary"
                  title="Sign In with Google"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-600 rounded-xl"
                  onClick={() =>
                    alert("Google Single-Sign-On handshake handled!")
                  }
                />
                <IconButton
                  icon="github-fill"
                  type="primary"
                  title="Sign In with GitHub"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-800 rounded-xl"
                  onClick={() => alert("GitHub OAuth handshake handled!")}
                />
              </div>

              {/* Auxiliary Redirect Anchor Link Footer */}
              <p className="text-xs text-center text-slate-400 font-medium mt-8">
                New to the system track?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 font-bold hover:underline cursor-pointer">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
