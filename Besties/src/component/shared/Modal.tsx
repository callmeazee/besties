import type { FC } from "react";

import "remixicon/fonts/remixicon.css";
import "animate.css";

interface ModelInterface {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children?: string;
}

const Modal: FC<ModelInterface> = ({
  open = true,
  onClose,
  title = "Modal Title",
  children = "your content goes here",
}) => {
  return (
    <>
      {open && (
        <div
          className="  h-screen flex items-center justify-center fixed top-0 left-0 w-full animate__animated animate__fadeIn "
          style={{
            background: `rgba(0,0,0, 0.65)`,
          }}>
          <div className="bg-white border border-gray-100 shadow-xl px-5 py-4 rounded-lg w-120 md:w-120  relative animate__animated animate__pulse ">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="text-gray-500">{children}</div>
            <button
              className="absolute top-1.5 right-2 cursor-pointer text-gray-500 hover:text-gray-600"
              onClick={onClose}>
              <i className="ri-close-circle-fill"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
