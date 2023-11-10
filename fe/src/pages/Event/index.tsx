import { useRoute } from "preact-iso";
import { Nav } from "../../components/nav";
import Noti from "../../components/noti";
import Tl from "../../utils/translate";
import { LocationOn } from "@mui/icons-material";

type Props = {};

const Profile = (props: Props) => {
  const { params } = useRoute();

  return (
    <div className={"h-full min-h-screen p-2 text-primary"}>
      <div className={"max-w-xl w-full m-auto flex flex-col justify-center"}>
        <Nav />
        <div className={"flex flex-row p-2"}>
          <h1 className={""}>
            <Tl>detail</Tl>
          </h1>
          •
          <button className={"btn-outline rounded px-1"}>
            <Tl>subscribe</Tl>
          </button>
        </div>
        <div className={"flex justify-center items-center flex-col gap-2"}>
          <div className="card w-full h-40 image-full">
            <figure className={""}>
              <img
                className={""}
                src="https://meetthetacs.ca/member/gettaclogo/wimtach"
                alt="food"
              />
            </figure>
          </div>
        </div>
        <div className={"flex flex-col gap-4"}>
          <div className={"flex flex-col"}>
            <label htmlFor="profile_name">
              <Tl>name</Tl>:
            </label>
            <input
              className={"btn-disabled btn-outline font-light"}
              type="text"
              value={"WimTach"}
              title={"profile_name"}
            />
          </div>
          <div className={"flex flex-col"}>
            <label htmlFor="profile_name">
              <Tl>date</Tl>:
            </label>
            <input
              className={"btn-disabled btn-outline font-light"}
              type="text"
              value={"10.11.2023 ~ 15.11.2023"}
              title={"profile_name"}
            />
          </div>
          <div className={"flex flex-col min-h-[10rem] h-full"}>
            <label htmlFor="profile_name">
              <Tl>description</Tl>:
            </label>
            <input
              className={"btn-disabled btn-outline font-light"}
              type="text"
              value={"It is example event"}
              title={"profile_name"}
            />
          </div>
          <a
            target={"_blank"}
            href={"https://maps.app.goo.gl/keD7GUg24g6jZp8UA"}
            className={"flex flex-col"}
          >
            <label htmlFor="profile_name" className={"cursor-pointer"}>
              <Tl>location</Tl>: <LocationOn />
            </label>
            <input
              className={"btn-disabled btn-outline font-light"}
              type="text"
              value={"name"}
              title={"profile_name"}
            />
          </a>
          <div className={"flex flex-col"}>
            <label htmlFor="profile_name">
              <Tl>foods</Tl>:
            </label>
            <input
              className={"btn-disabled btn-outline font-light"}
              type="text"
              value={"Pizza, Curry, Butter Chicken"}
              title={"profile_name"}
            />
          </div>
          <div className={"flex flex-col"}>
            <label htmlFor="profile_name">
              <Tl>notification</Tl>
            </label>
            <div className={"flex justify-center"}>
              <Noti />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
