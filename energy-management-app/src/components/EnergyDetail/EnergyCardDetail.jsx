import React from "react";
import { Card } from "flowbite-react";
const EnergyCardDetail = ({ children }) => {
  return (
    <Card className=" flex flex-col mx-auto max-w-lg  shadow-lg rounded-2xl p-8">
      {children}
    </Card>
  );
};

export default EnergyCardDetail;
