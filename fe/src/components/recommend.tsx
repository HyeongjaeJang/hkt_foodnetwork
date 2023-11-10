import React from "react";

type Props = {};

const Recommend = (props: Props) => {
  return (
    <a
      href={"./event/fdsaf"}
      className="card flex-grow w-40 h-40 bg-base-100 shadow-xl image-full"
    >
      <figure>
        <img
          className={"w-full h-full image-full"}
          src="indian-sweets-2625911_1280.jpg"
          alt="food"
        />
      </figure>
      <div className="card-body ">
        <div className={"flex items-end flex-1"}>
          <p>Food</p>
        </div>
      </div>
    </a>
  );
};

export default Recommend;
