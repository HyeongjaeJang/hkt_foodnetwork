import axios from "axios";

const authChecker = async () => {
  const tk = localStorage.getItem("__authtk");
  localStorage.removeItem("u_type");

  if (!tk) return false;

  await axios
    .post("http://localhost:1111/api/checkauth", null, {
      headers: {
        Authorization: tk,
      },
    })
    .then(({ data }) => {
      if (data.auth) {
        localStorage.setItem("u_type", data.type);
        return true;
      }
      return false;
    })
    .catch(() => {
      return false;
    });
};

export default authChecker;
