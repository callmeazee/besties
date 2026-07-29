// import { useState } from "react";
import Card from "./shared/Card";
import Input from "./shared/Input";
import Button from "./shared/Button"; // Imported your global button primitive
import { Link, useNavigate } from "react-router-dom";
import Form, { type FormDataType } from "./shared/Form";
import HttpInterceptor from "../lib/HttpInterceptor";
import CatchError from "../lib/CatchError";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (values: FormDataType) => {
    try {
      await HttpInterceptor.post("/auth/signup", values);
      navigate("/login");
    } catch (err: unknown) {
      CatchError(err);
    }
  };

  return (
    // Centered outer canvas block wrapper layout
    <div className="bg-slate-50 flex items-center justify-center min-h-screen px-4 py-8">
      {/* FIX: Replaced w-6/12 with a dynamic fluid boundary max-w-4xl and w-full */}
      <div className="w-full max-w-4xl min-w-0">
        <Card noPadding className="shadow-2xl border border-slate-100">
          {/* Main Layout Splitting Track: Column on mobile, Row on medium screens upwards */}
          <div className="flex flex-col md:flex-row w-full min-w-0">
            {/* 1. LEFT SIDE: AUTHORIZATION FORM INTERACTIVE PANEL */}
            {/* flex-1 min-w-0 forces equal column expansion distribution layouts seamlessly */}
            <div className="flex-1 min-w-0 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              {/* Corrected typography spacing metrics */}
              <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                  Create an Account
                </h1>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  Join the network grid to broadcast system updates.
                </p>
              </div>

              {/* Form Submission Execution Engine */}
              <Form className="space-y-4" onValue={handleSignup}>
                <div className="space-y-3.5">
                  <Input name="fullname" placeholder="Enter your full name" />
                  <Input
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                  />
                  <Input
                    name="mobile"
                    placeholder="+91-9893997321"
                    type="tel"
                  />
                  <Input
                    name="password"
                    placeholder="Create a secure password"
                    type="password"
                  />
                </div>

                {/* Submitting Actions Row using global component primitives */}
                <div className="pt-2">
                  <Button
                    type="secondary"
                    icon="user-add-fill"
                    className="w-full py-3 rounded-xl font-bold tracking-wide shadow-md shadow-indigo-100">
                    Register Account
                  </Button>
                </div>
              </Form>

              {/* Auxiliary Redirect Anchor Link Footer */}
              <p className="text-xs text-center text-slate-400 font-medium mt-6">
                Already have an account?
                <Link
                  to="/login"
                  className="text-indigo-600 font-bold hover:underline cursor-pointer">
                  Sign In
                </Link>
              </p>
            </div>

            {/* 2. RIGHT SIDE: SOCIAL MEDIA THEMED GRAPHIC PANEL */}
            {/* FIX: Force an explicit minimum height and flex-col layout on the container so the vertical stretch bounds stay uniform */}
            <div className="hidden md:flex flex-1 min-w-0 min-h-137.5 bg-linear-to-t from-sky-500 to-indigo-600 p-8 pb-0 flex-col justify-between text-center relative isolate overflow-hidden animate__animated animate__fadeIn">
              {/* Background Accent Subtle Geometric Blur Glows */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-sky-400/20 blur-2xl pointer-events-none"></div>

              {/* 1. TEXT BANNER INFO (STAYS PINNED SECURELY AT THE TOP) */}
              <div className="text-white max-w-64 mx-auto z-10 mt-8 animate__animated animate__fadeInDown">
                <h3 className="text-sm font-black tracking-wider uppercase opacity-95 flex items-center justify-center gap-1.5">
                  <i className="ri-sparkling-fill text-amber-300"></i> Connect &
                  Share
                </h3>
                <p className="text-xs text-sky-100/80 mt-2 leading-relaxed font-semibold wrap-break-words">
                  Broadcast updates, stream real-time spaces, and share
                  cinematic reels natively within your social grid feed.
                </p>
              </div>

              {/* 2. VECTOR SVG IMAGE CONTAINMENT BOUNDS */}
              {/* FIX: Swapped dynamic relative sizing with absolute bottom anchoring so it rests seamlessly on the bottom pixel boundary layout lines */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-56 lg:max-w-60 transform hover:scale-102 transition-all duration-500 ease-out z-10 select-none flex items-end justify-center animate__animated animate__slideInUp">
                <img
                  src="/images/signup.svg"
                  alt="Secure registration illustration graphic asset"
                  className="w-full h-auto drop-shadow-2xl object-bottom align-bottom block vertical-align-bottom"
                  style={{ display: "block", margin: 0, padding: 0 }} // Strip raw line-height defaults from rendering engines
                />
              </div>

              {/* Live Status Tag */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] text-white font-bold tracking-wide z-10">
                <i className="ri-pulse-fill mr-1 text-green-400 animate-pulse"></i>{" "}
                14.2k Online Now
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
