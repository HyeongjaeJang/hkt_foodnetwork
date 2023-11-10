import { useEffect, useState } from "preact/hooks";
import { Nav } from "../../components/nav";
import axios from "axios";
import Tl from "../../utils/translate";

type Props = {};

type Profile = {
  name: string;
  mail: string;
  address?: string;
  preferences: string[];
};

const Profile = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [profileInfo, setProfileInfo] = useState<Profile | null>({
    mail: "",
    name: "",
    preferences: [],
    address: "",
  });

  const editToggle = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    const getProfileData = async () => {
      await axios
        .get("http://localhost:1111/api/profile", {
          headers: {
            Authorization: localStorage.getItem("__authtk"),
          },
        })
        .then((res) => {
          if (!!res) {
            setProfileInfo({
              name: res.data.name,
              mail: res.data.mail,
              preferences: res.data.preferences || [],
              address: res.data.address || "",
            });
          }
        });
    };

    getProfileData();
  }, []);

  return (
    <div className={"h-full min-h-screen "}>
      <div className={"max-w-xl w-full m-auto flex flex-col justify-center"}>
        <Nav />
        <h1 className={""}>
          <Tl>profile</Tl>
        </h1>
        <div className={"flex justify-center items-center flex-col gap-2"}>
          <div className="avatar">
            <div className="w-24 mask mask-circle">
              <img alt={"Profile"} src="/art-1699977_1280.jpg" />
            </div>
          </div>
          <button onClick={editToggle} className={"btn btn-sm btn-link"}>
            <Tl>edit account</Tl>
          </button>
        </div>
        <div className={"flex flex-col gap-4"}>
          <div className={"flex flex-col text-primary"}>
            <label htmlFor="profile_name">
              <Tl>name</Tl>:
            </label>
            <input
              className={`${!isEdit && "btn-disabled"} btn-outline font-light`}
              type="text"
              value={profileInfo.name}
              title={"profile_name"}
            />
          </div>
          <div className={"flex flex-col text-primary"}>
            <label htmlFor="profile_name">
              <Tl>email</Tl>
            </label>
            <input
              className={`${!isEdit && "btn-disabled"} btn-outline font-light`}
              type="text"
              value={profileInfo.mail}
              title={"profile_name"}
            />
          </div>
          <div className={"flex flex-col text-primary"}>
            <label htmlFor="profile_name">
              <Tl>address</Tl>:
            </label>
            <input
              className={`${!isEdit && "btn-disabled"} btn-outline font-light`}
              type="text"
              value={profileInfo.address}
              title={"profile_name"}
            />
          </div>
          <div className={"flex flex-col text-primary"}>
            <label htmlFor="profile_name">
              <Tl>preferences</Tl>:
            </label>
            <div className={"flex gap-2 flex-wrap flex-row p-2"}>
              {!!profileInfo.preferences &&
                profileInfo.preferences.map((el) => {
                  return <div className="badge badge-outline">{el}</div>;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
