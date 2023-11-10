import { Nav } from "../../components/nav";
import ImgUpload from "../../assets/imgUpload.svg";
import Tl from "../../utils/translate";
import i18n from "../../translations";
import axios from "axios";
import { useState } from "preact/hooks";
import { Add } from "@mui/icons-material";

type Props = {};

type uploadType = {
  name?: string;
  date?: Date;
  location?: string;
  description?: string;
  image?: string;
};

const NewEvent = (props: Props) => {
  const [uploadEv, setUploadEv] = useState<uploadType | null>(null);
  const { t } = i18n;

  const imgUploadHandler = async (e: any) => {
    const tk = localStorage.getItem("__authtk");
    const img = e.target.files[0];
    let img64 = "";
    let reader = new FileReader();

    reader.onload = () => {
      img64 = reader.result.toString().replace("data:", "").replace(/^.+,/, "");
    };
    reader.readAsDataURL(img);

    await axios.post("http://localhost:1111/api/uploadEvent", uploadEv, {
      headers: {
        Authorization: tk,
      },
    });
  };

  const eventUploadHandler = (e: any) => {
    switch (e.target.id) {
      case "titleEv":
        setUploadEv((prev) => {
          return {
            name: e.target.value,
            location: prev.location,
            date: prev.date,
            description: prev.description,
          };
        });
        break;

      case "dateEv":
        setUploadEv((prev) => {
          return {
            name: e.target.value,
            location: prev.location,
            date: new Date(Date.parse(e.target.value)),
            description: prev.description,
          };
        });
        break;

      case "locationEv":
        setUploadEv((prev) => {
          return {
            name: prev.name,
            location: e.target.value,
            date: prev.date,
            description: prev.description,
          };
        });
        break;

      case "descEv":
        setUploadEv((prev) => {
          return {
            name: prev.name,
            location: prev.location,
            date: prev.date,
            description: e.target.value,
          };
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className={"h-full min-h-screen text-primary p-2"}>
      <div
        className={"max-w-xl w-full m-auto flex flex-col justify-center gap-2"}
      >
        <Nav />
        <div className={"flex flex-row gap-2"}>
          <h1 className={""}>
            <Tl>new event</Tl>
          </h1>
          <button type={"submit"} title={"eventAddTitle"}>
            <Add />
          </button>
        </div>
        <div
          className={
            "flex justify-center items-center flex-col gap-2 p-2 min-h-[10rem] bg-gray-200 rounded-md"
          }
        >
          <div className={"flex justify-center"}>
            <label htmlFor="imgUpload">
              <img
                className={"w-16 h-16"}
                src={"/assets/imgUpload.svg"}
                alt="ImgUpload"
              />
              <input
                onChange={imgUploadHandler}
                className={"hidden"}
                type={"file"}
                title={"ImgUpload"}
                id="imgUpload"
              />
            </label>
          </div>
        </div>
        <div className={"flex flex-col gap-4"}>
          <div className={"flex flex-col text-primary"}>
            <input
              id={"titleEv"}
              onChange={eventUploadHandler}
              className={"btn btn-outline font-light"}
              type="text"
              placeholder={t("name")}
            />
          </div>
          <div className={"flex flex-col text-primary"}>
            <input
              id={"dateEv"}
              onChange={eventUploadHandler}
              className={"btn btn-outline font-light"}
              type="date"
              placeholder={t("date")}
            />
          </div>
          <div className={"flex flex-col text-primary"}>
            <input
              id={"locationEv"}
              onChange={eventUploadHandler}
              className={"btn btn-outline font-light"}
              type="text"
              placeholder={t("location")}
            />
          </div>
          <div className={"flex flex-col text-primary "}>
            <textarea
              id={"descEv"}
              onChange={eventUploadHandler}
              className={"btn btn-outline font-light min-h-[6rem]"}
              type="text"
              placeholder={t("description")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
