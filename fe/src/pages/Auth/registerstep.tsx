import * as React from "react";
import { Register } from ".";
import Reg2 from "./reg2";
import Reg3 from "./reg3";
import Reg4 from "./reg4";

export default function Registerstep() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isUser, setIsUser] = React.useState(true);

  const handleNext = () => {
    if (activeStep <= 2) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep !== 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    <Register setIsUser={setIsUser} next={handleNext} />,
    <Reg2 isuser={isUser} next={handleNext} back={handleBack} />,
    localStorage.getItem("u_type") === "normal" && (
      <Reg3 back={handleBack} next={handleNext} />
    ),
    localStorage.getItem("u_type") === "normal" && (
      <Reg4 back={handleBack} next={handleNext} />
    ),
  ];

  return <div>{steps[activeStep]}</div>;
}
