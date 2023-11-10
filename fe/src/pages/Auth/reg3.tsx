import { useState } from "preact/hooks";
import Logo from "../../assets/logo.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { Alert } from "@mui/material";

type Props = {
  next: () => void;
  back: () => void;
};

const Reg3 = (props: Props) => {
  const [needs, setNeeds] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const needsHandler = (e) => {
    const val = e.target.value;
    setNeeds((prevArr) =>
      prevArr.includes(val)
        ? prevArr.filter((el) => el !== val)
        : [...prevArr, val]
    );
  };

  const needSubmitHandler = async (e) => {
    const tk = localStorage.getItem("__authtk");
    const userType = localStorage.getItem("u_type");
    e.preventDefault();

    setIsSuccess(false);
    await axios
      .post(
        "http://localhost:1111/api/needs_add",
        { items: needs, type: userType },
        {
          headers: {
            Authorization: tk,
          },
        }
      )
      .then((res) => {
        setIsSuccess(true);
        if (res.status == 200) {
          setTimeout(() => {
            props.next();
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

          <button title={"Next"} onClick={props.next}>
            Skip
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
            <h1 className={"text-3xl sm:text-sm text-center text-white"}>
              Food you are interested in
            </h1>
          </div>
          <form onSubmit={needSubmitHandler} className={"w-full"}>
            <div
              className={
                "w-full flex justify-center items-center flex-col gap-2"
              }
            >
              {isSuccess && (
                <Alert severity="success">Added! {needs.length} items</Alert>
              )}
              <input
                title={"needsTitle"}
                value={"Rice"}
                onClick={needsHandler}
                className={`${
                  needs.includes("Rice") && "btn-success"
                } btn btn-secondary text-primary font-light  max-w-xs w-full`}
              >
                Rice
              </input>
              <input
                title={"needsTitle"}
                value={"Meat"}
                onClick={needsHandler}
                className={`${
                  needs.includes("Meat") && "btn-success"
                } btn btn-secondary text-primary font-light  max-w-xs w-full`}
              >
                Meat
              </input>
              <input
                title={"needsTitle"}
                value={"Vegetarian"}
                onClick={needsHandler}
                className={`${
                  needs.includes("Vegetarian") && "btn-success"
                } btn btn-secondary text-primary font-light  max-w-xs w-full`}
              >
                Vegetables
              </input>
              <button
                type={"submit"}
                className={
                  "btn hidden sm:flex btn-secondary btn-outline text-primary font-light  max-w-xs w-full"
                }
              >
                Submit
              </button>
            </div>
            <div className={"w-full flex justify-center  sm:hidden"}>
              <button
                type={"submit"}
                className={
                  "btn btn-secondary btn-outline text-primary font-light  max-w-xs w-full"
                }
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reg3;
