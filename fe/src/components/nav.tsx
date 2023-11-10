import Drawer from "@mui/material/Drawer";
import { useState } from "preact/hooks";
import Sidebar from "./sidebar";

interface Props {}

export function Nav(props: Props) {
  const [isLeftDrawer, setIsLeftDrawer] = useState(false);

  const leftNavDrawer = () => {
    setIsLeftDrawer(!isLeftDrawer);
  };

  return (
    <div className="navbar bg-base-100 text-primary">
      <Drawer
        anchor={"left"}
        open={isLeftDrawer}
        onClose={() => setIsLeftDrawer(false)}
      >
        {/* @ts-ignore */}
        <Sidebar />
      </Drawer>
      <div className="flex-none">
        <button
          onClick={leftNavDrawer}
          title={"more"}
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a href={"/"} className="  normal-case text-xl">
          SFN
        </a>
      </div>
      {localStorage.getItem("u_type") && (
        <div className="flex-none">
          <div className="avatar">
            <div className="w-10 mask mask-squircle">
              <img alt={"Profile"} src="/art-1699977_1280.jpg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
