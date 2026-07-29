import "remixicon/fonts/remixicon.css";
import type { FC } from "react";

interface DrawerInterface{
  children?: string
  title?: string
  open?: boolean
  onClose?: ()=> void

}

const Drawer:FC<DrawerInterface> = ({
  children = "Your content goes here",
  title = "Drawer Title",
  open = true,
  onClose,
}) => {
  return (

      <div
        style={{
          right: open ? 0 : "-50%",
          transition: "ease-in-out .4s",
        }}
        className="shadow-lg fixed top-0 w-full  md:w-6/12 h-full overflow-auto p-8 z-10000 space-y-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="border-b border-gray-100 -mx-8" />
        <div className="text-gray-500">{children}</div>
        <button
          onClick={onClose}
          className="absolute top-3 right-6 cursor-pointer">
          <i className="ri-close-circle-fill "></i>
        </button>
      </div>

  );
};

export default Drawer;
