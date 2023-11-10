import { Logout, Login } from "@mui/icons-material";

import i18n from "../translations";
import axios from "axios";
import Tl from "../utils/translate";

type Props = {};

const Sidebar = (props: Props) => {
  const langChange = async (lng: "en" | "fr" | "hd" | "md") => {
    await i18n.changeLanguage(lng).then(() => window.location.reload());
  };

  const themeChange = (theme: "light" | "dark" | "luxury") => {
    localStorage.setItem("theme", theme);
    window.location.reload();
  };

  const logoutHandler = async () => {
    await axios
      .post("http://localhost:1111/api/logout", null, {
        headers: {
          Authorization: localStorage.getItem("__authtk"),
        },
      })
      .then(() => {
        localStorage.removeItem("u_type");
        localStorage.removeItem("__authtk");
        location.reload();
      });
  };

  return (
    <div className={"flex flex-col justify-between h-full p-4"}>
      <ul>
        {localStorage.getItem("u_type") === "org" && (
          <li>
            <a
              href={"/newevent"}
              className={
                "btn font-light btn-primary max-w-xs w-full btn-sm btn-outline m-2"
              }
            >
              <Tl>new event</Tl>
            </a>
          </li>
        )}
        {localStorage.getItem("__authtk") && (
          <li>
            <a
              href={"/profile"}
              className={
                "btn font-light btn-primary max-w-xs w-full btn-sm btn-outline m-2"
              }
            >
              <Tl>profile</Tl>
            </a>
          </li>
        )}
        <li>
          <a
            href={"/"}
            className={
              "btn font-light btn-primary max-w-xs w-full btn-sm btn-outline m-2"
            }
          >
            <Tl>events</Tl>
          </a>
        </li>

        <li>
          <div className="dropdown w-full">
            <label
              tabIndex={0}
              className="btn font-light btn-primary max-w-xs w-full btn-sm btn-outline m-2"
            >
              <Tl>theme</Tl>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 text-secondary rounded-box w-full"
            >
              <li
                onClick={() => {
                  themeChange("light");
                }}
              >
                <a>Light</a>
              </li>
              <li
                onClick={() => {
                  themeChange("dark");
                }}
              >
                <a>Dark</a>
              </li>
              <li
                onClick={() => {
                  themeChange("luxury");
                }}
              >
                <a>Contract</a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="dropdown w-full">
            <label
              tabIndex={0}
              className="btn font-light btn-primary max-w-xs w-full btn-sm btn-outline m-2"
            >
              <Tl>language</Tl>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 text-secondary rounded-box w-full"
            >
              <li
                onClick={() => {
                  langChange("en");
                }}
              >
                <a>English</a>
              </li>
              <li
                onClick={() => {
                  langChange("fr");
                }}
              >
                <a>français</a>
              </li>
              <li
                onClick={() => {
                  langChange("md");
                }}
              >
                <a>中文 (简体)</a>
              </li>
              <li
                onClick={() => {
                  langChange("hd");
                }}
              >
                <a>हिन्दी</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div className={"flex justify-between items-center"}>
        {!!localStorage.getItem("u_type") ? (
          <>
            <span>
              <Tl>sign out</Tl>
            </span>
            <button
              onClick={logoutHandler}
              className={"btn font-light btn-sm btn-outline"}
              title="Sign out"
            >
              <Logout />
            </button>
          </>
        ) : (
          <>
            <span>Login</span>
            <button
              onClick={() => {
                window.location.replace("/login");
              }}
              className={"btn font-light btn-sm btn-outline"}
              title="Sign out"
            >
              <Login />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
