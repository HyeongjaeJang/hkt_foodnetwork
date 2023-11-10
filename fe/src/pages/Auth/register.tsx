import Logo from "../../assets/logo.svg";
import Tl from "../../utils/translate";

type Props = {
  next: () => void;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
};

const Register = (props: Props) => {
  return (
    <div className={"h-screen "}>
      <div class="h-full max-w-3xl w-full m-auto">
        <div className="h-full flex justify-center items-center  flex-col sm:flex-row gap-4">
          <div class="flex justify-center gap-4 flex-col items-center ">
            <img
              width={"100px"}
              height={"100px"}
              src={"/assets/logo.svg"}
              alt={"Logo"}
            />
            <h1 className={"text-3xl text-center"}>Scarborough Food Network</h1>
            <span className={"font-light text-sm text-center"}>
              <Tl>For the Community, by the Community</Tl>
            </span>
          </div>
          <div
            class={"flex flex-col justify-center gap-6 items-center font-light"}
          >
            <button
              onClick={() => {
                props.next();
                props.setIsUser(true);
              }}
              className={"btn btn-primary font-light max-w-xs w-full"}
            >
              <Tl>user</Tl>
            </button>
            <button
              onClick={() => {
                props.next();
                props.setIsUser(false);
              }}
              className={"btn btn-primary font-light max-w-xs w-full"}
            >
              <Tl>operator</Tl>
            </button>
            <a href={"/"}>
              <Tl>Login as a guest</Tl>
            </a>
            <span>
              <Tl>have an account?</Tl>{" "}
              <a class={"font-medium"} href={"/login"}>
                <Tl>login</Tl>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
