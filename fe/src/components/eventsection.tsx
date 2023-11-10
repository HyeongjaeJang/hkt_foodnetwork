import Event from "./event";
import { Button, ButtonGroup } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import Tl from "../utils/translate";

type Props = {};

const Eventsection = (props: Props) => {
  return (
    <div className={" flex gap-2 flex-col p-2"}>
      <div
        className={
          "font-medium flex flex-row justify-between items-center gap-2"
        }
      >
        <span>
          <Tl>upcoming</Tl>
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
      <Event />
      <Event />
      <Event />
    </div>
  );
};

export default Eventsection;
