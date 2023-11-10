import { useRef, useState } from "preact/hooks";
import Logo from "../../assets/logo.svg";
import i18n from "../../translations";
import axios from "axios";
import { Alert } from "@mui/material";
import Tl from "../../utils/translate";

type Props = {};

const Login = (props: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [isReqErr, setIsReqErr] = useState(null);
  const [isReq, setIsReq] = useState(false);
  const { t } = i18n;

  const LoginHandler = async (e) => {
    e.preventDefault();

    setIsReqErr(false);
    setIsReq(false);

    await axios
      .post("http://localhost:1111/api/login", {
        data: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      })
      .then((res) => {
        if (!!res.data.error) {
          return setIsReqErr(res.data.error);
        }

        localStorage.setItem("__authtk", res.data["signedToken"]);
        window.location.replace("/");
      });
    setIsReq(true);
  };

  return (
    <div className={"h-screen bg-primary"}>
      <div class="h-full  m-auto max-w-3xl w-full">
        <div className="h-full flex justify-around items-center text-black flex-col sm:flex-row gap-1">
          <div class="flex justify-center gap-4 flex-col items-center ">
            <img
              width={"100px"}
              height={"100px"}
              src={"/assets/logo.svg"}
              alt={"Logo"}
            />
            <h1 className={"text-3xl text-center text-white"}>Sign In</h1>
            <span className={"text-white text-center"}>
              @Scarborough Food Network
            </span>
          </div>
          <form
            onSubmit={LoginHandler}
            class={
              "flex flex-col justify-center gap-6 items-center font-light w-full"
            }
          >
            {isReq && (
              <Alert severity={!isReqErr ? "success" : "error"} ref={errRef}>
                {isReqErr || "Successfully Logined"}
              </Alert>
            )}

            <input
              ref={emailRef}
              title={"Email"}
              type={"email"}
              placeholder={t("email")}
              required
              className={"input bg-white font-light max-w-xs w-full"}
            />
            <input
              ref={passwordRef}
              title={"Password"}
              type={"password"}
              required
              placeholder={t("password")}
              className={"input bg-white font-light max-w-xs w-full"}
            />

            <button
              className={
                "hidden sm:flex btn btn-secondary text-primary font-light max-w-xs w-full"
              }
            >
              <Tl>sign in</Tl>
            </button>
            <span class={""}>
              <Tl>You do not have an account?</Tl>
              <a href="/register" className={"font-medium"}>
                <Tl>Register</Tl>
              </a>
            </span>
          </form>
          <div class={"flex justify-center w-full sm:hidden"}>
            <button
              onClick={LoginHandler}
              className={
                "btn btn-secondary btn-outline text-primary font-light  max-w-xs w-full"
              }
            >
              <Tl>sign in</Tl>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
