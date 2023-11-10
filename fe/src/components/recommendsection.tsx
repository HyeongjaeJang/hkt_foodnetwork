import { Button, ButtonGroup } from "@mui/material";
import Recommend from "./recommend";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import Tl from "../utils/translate";

type Props = {};

const Recommendsection = (props: Props) => {
  return (
    <div className={" flex gap-2 flex-col p-2"}>
      <div
        className={
          "font-medium flex flex-row items-center justify-between gap-2"
        }
      >
        <span>
          <Tl>recommendation</Tl>
        </span>
        <div>
          {/* @ts-ignore */}
          <ButtonGroup>
            <Button size="small">
              {/* @ts-ignore */}
              <ArrowLeft />
            </Button>
            <Button size="small">
              {/* @ts-ignore */}
              <ArrowRight />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className={"flex flex-row gap-2 overflow-scroll "}>
        <Recommend />
        <Recommend />
        <Recommend />
      </div>
    </div>
  );
};

export default Recommendsection;
