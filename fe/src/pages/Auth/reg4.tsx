import { useRef, useState } from "preact/hooks";
import Logo from "../../assets/logo.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";

type Props = {
  next: () => void;
  back: () => void;
};

const Reg4 = (props: Props) => {
  const refLoca = useRef<HTMLInputElement>(null);

  const needSubmitHandler = async (e) => {
    const tk = localStorage.getItem("__authtk");
    const userType = localStorage.getItem("u_type");
    e.preventDefault();

    await axios
      .post(
        "http://localhost:1111/api/change_location",
        { location: refLoca.current.value, type: userType },
        {
          headers: {
            Authorization: tk,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        }
      })
      .catch((e) => {});
  };

  return (
    <div className={"h-screen bg-primary"}>
      <div class="h-full flex flex-col m-auto max-w-3xl w-full">
        <div className={"p-4 flex justify-between"}>
          <button title={"Back"} onClick={props.back}>
            <ArrowBackIosIcon />
          </button>
        </div>
        <form onSubmit={needSubmitHandler}>
          <div className="h-full flex justify-around items-center text-black flex-col sm:flex-row gap-1">
            <div class="flex justify-center gap-4 flex-col items-center ">
              <img
                width={"100px"}
                height={"100px"}
                src={"/assets/logo.svg"}
                alt={"Logo"}
              />
              <h1 className={"text-3xl sm:text-sm text-center text-white"}>
                Tell us your location!
              </h1>
            </div>
            <div
              className={
                "w-full flex justify-center items-center flex-col gap-2"
              }
            >
              <input
                ref={refLoca}
                title={"locatio1"}
                type={"text"}
                required
                placeholder={"City or Zipcode"}
                className={"input bg-white font-light max-w-xs w-full"}
              />
              <button
                className={
                  "btn hidden sm:flex btn-secondary btn-outline text-primary font-light  max-w-xs w-full"
                }
              >
                Submit
              </button>
            </div>
            <div className={"w-full flex justify-center  sm:hidden"}>
              <button
                className={
                  "btn btn-secondary btn-outline text-primary font-light  max-w-xs w-full"
                }
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reg4;
