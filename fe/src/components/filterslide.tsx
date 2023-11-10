import { useState } from "preact/hooks";
import Tl from "../utils/translate";

type Props = {};

const Filterslide = (props: Props) => {
  const [cateArr, setCateArr] = useState<string[]>([]);
  const [routeArr, setRouteArr] = useState<string[]>([]);

  const routeHandler = (e) => {
    const val = e.target.value;
    setRouteArr((prevArr) =>
      prevArr.includes(val)
        ? prevArr.filter((el) => el !== val)
        : [...prevArr, val]
    );
  };

  const cateHandler = (e) => {
    const val = e.target.value;
    setCateArr((prevValues) =>
      prevValues.includes(val)
        ? prevValues.filter((prevValue) => prevValue !== val)
        : [...prevValues, val]
    );
  };

  return (
    <div
      className={
        "max-w-xs w-full m-auto flex flex-col justify-center items-center gap-2"
      }
    >
      <span className={"text-xl font-semibold"}>
        <Tl>Search Filter</Tl>
      </span>
      <div className={"grid grid-cols-2 gap-4"}>
        <span class={"col-span-2"}>
          <Tl>category</Tl>
        </span>
        <button
          onClick={cateHandler}
          value={"Food Bank"}
          className={`btn ${!cateArr.includes("Food Bank") && "btn-outline"}`}
        >
          Food Bank
        </button>
        <button
          onClick={cateHandler}
          value={"Donation"}
          className={`btn ${!cateArr.includes("Donation") && "btn-outline"}`}
        >
          Donation
        </button>
        <button
          onClick={cateHandler}
          value={"Asian"}
          className={`btn ${!cateArr.includes("Asian") && "btn-outline"}`}
        >
          Asian
        </button>
        <button
          onClick={cateHandler}
          value={"Vegan"}
          className={`btn ${!cateArr.includes("Vegan") && "btn-outline"}`}
        >
          Vegan
        </button>
        <button
          onClick={cateHandler}
          value={"Indian"}
          className={`btn ${!cateArr.includes("Indian") && "btn-outline"}`}
        >
          Indian
        </button>
        <button
          onClick={cateHandler}
          value={"European"}
          className={`btn ${!cateArr.includes("European") && "btn-outline"}`}
        >
          European
        </button>
      </div>
      <div className={"grid grid-cols-2 gap-4"}>
        <span class={"col-span-2"}>
          <Tl>route</Tl>
        </span>
        <button
          value={"Walk"}
          onClick={routeHandler}
          className={`btn ${!routeArr.includes("Walk") && "btn-outline"}`}
        >
          Walk
        </button>
        <button
          value={"Bus"}
          onClick={routeHandler}
          className={`btn ${!routeArr.includes("Bus") && "btn-outline"}`}
        >
          Bus
        </button>
        <button
          value={"Subway"}
          onClick={routeHandler}
          className={`btn ${!routeArr.includes("Subway") && "btn-outline"}`}
        >
          Subway
        </button>
        <button
          value={"Car"}
          onClick={routeHandler}
          className={`btn ${!routeArr.includes("Car") && "btn-outline"}`}
        >
          Car
        </button>
      </div>
    </div>
  );
};

export default Filterslide;
