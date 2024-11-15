import React from "react";

const EnergyTips = ({ tips }) => {
  return (
    <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400 shadow-sm">
      <p className="text-green-800 text-lg font-medium mb-1">
        Tips Hemat Energi:
      </p>
      <p className="text-sm text-gray-700 italic">{tips}</p>
    </div>
  );
};

export default EnergyTips;
