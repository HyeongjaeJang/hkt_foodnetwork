import { useRef, useState } from "preact/hooks";
import Logo from "../../assets/logo.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { Alert } from "@mui/material";
import i18n from "../../translations";

type Props = {
  next: () => void;
  back: () => void;
  isuser: boolean;
};

const Reg2 = (props: Props) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const [isReqErr, setIsReqErr] = useState(null);
  const [isReqSuccess, setIsReqSuccess] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(true);
  const { t } = i18n;

  const RegisterHandler = async (e) => {
    e.preventDefault();

    setIsReqErr(false);
    setIsReqSuccess(false);
    if (passwordConfirm)
      await axios
        .post("http://localhost:1111/api/signup", {
          data: {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            type: props.isuser ? "normal" : "org",
          },
        })
        .then((res) => {
          if (!!res.data.error) {
            setIsReqErr(res.data.error);
          } else {
            if (res.data.success) {
              setIsReqSuccess(res.data.message);
              localStorage.setItem("__authtk", res.data.signedToken);
              localStorage.setItem("u_type", props.isuser ? "normal" : "org");
              if (!props.isuser) {
                window.location.replace("/");
              }
            }
            setTimeout(() => {
              props.next();
            }, 1000);
          }
        });
  };

  const pwConfirmHandler = () => {
    if (passwordRef.current.value === password2Ref.current.value)
      setPasswordConfirm(true);
    else setPasswordConfirm(false);
  };

  return (
    <div className={"h-screen bg-primary"}>
      <div class="h-full flex flex-col m-auto max-w-3xl w-full">
        <div className={"p-4 flex justify-between"}>
          <button title={"Back"} onClick={props.back}>
            <ArrowBackIosIcon />
          </button>
        </div>
        <div className="flex-1 flex justify-around items-center text-black flex-col sm:flex-row gap-1">
          <div class="flex justify-center gap-4 flex-col items-center ">
            <img
              width={"100px"}
              height={"100px"}
              src={"/assets/logo.svg"}
              alt={"Logo"}
            />
            <h1 className={"text-3xl text-center "}>User</h1>
            <span className={" text-center"}>@Scarborough Food Network</span>
          </div>
          <form onSubmit={RegisterHandler} className={"w-full"}>
            <div
              class={
                "flex flex-col justify-center gap-6 items-center font-light w-full"
              }
            >
              {isReqErr && <Alert severity="error">{isReqErr}</Alert>}
              {isReqSuccess && <Alert severity="success">{isReqSuccess}</Alert>}
              <input
                ref={usernameRef}
                title={props.isuser ? "Username" : "Operator Name"}
                type={"text"}
                placeholder={props.isuser ? t("username") : t("operator name")}
                required
                className={"input font-light max-w-xs w-full text-secondary"}
              />
              <input
                ref={emailRef}
                title={"Email"}
                type={"email"}
                placeholder={t("email")}
                required
                className={"input  font-light max-w-xs w-full  text-secondary"}
              />
              <input
                onChange={pwConfirmHandler}
                ref={passwordRef}
                title={"Password"}
                type={"password"}
                required
                placeholder={t("password")}
                className={"input font-light max-w-xs w-full  text-secondary"}
              />
              <input
                onChange={pwConfirmHandler}
                title={"Password"}
                type={"password"}
                ref={password2Ref}
                required
                placeholder={t("confirm password")}
                className={`input ${
                  !passwordConfirm && "input-error"
                }  font-light max-w-xs w-full  text-secondary`}
              />

              <button
                className={
                  "hidden btn-outline sm:flex btn btn-secondary text-secondary font-light max-w-xs w-full"
                }
              >
                Register
              </button>
            </div>
            <div class={"flex justify-center w-full sm:hidden"}>
              <button
                className={
                  "btn btn-outline btn-secondary text-secondary font-light  max-w-xs w-full"
                }
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reg2;
