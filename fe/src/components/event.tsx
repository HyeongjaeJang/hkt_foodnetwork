import React from "react";

type Props = {};

const Event = (props: Props) => {
  return (
    <a
      href={"/event/fds"}
      className="card w-full h-40 bg-base-100 shadow-xl image-full"
    >
      <figure>
        <img
          className={"w-full h-full image-full"}
          src="/indian-sweets-2625911_1280.jpg"
          alt="food"
        />
      </figure>
      <div className="card-body ">
        <div className={"flex items-end flex-1 justify-between"}>
          <span>Food bank @ ...</span>
          <span>date</span>
        </div>
      </div>
    </a>
  );
};

export default Event;
