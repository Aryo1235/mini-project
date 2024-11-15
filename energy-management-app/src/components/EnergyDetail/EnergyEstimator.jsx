import React from "react";

const EnergyEstimator = ({ cost }) => {
  return (
    <div className="bg-green-50 p-4 rounded-lg shadow-inner border-l-4 border-gray-500">
      <p className="text-gray-700 text-lg font-medium">
        Estimasi Biaya: <span className="text-green-700 font-bold">{cost}</span>
      </p>
    </div>
  );
};

export default EnergyEstimator;
