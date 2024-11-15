import React from "react";
import { FaBolt, FaCalendarAlt } from "react-icons/fa";
import { Badge } from "flowbite-react";

const EnergyInfo = ({ device, status, watt, usageHours, date }) => {
  const statusColor = status === "Aktif" ? "success" : "failure";

  return (
    <div>
      <h3 className="text-2xl text-center font-semibold text-green-800 mb-4 dark:text-green-500">
        {device}
      </h3>
      <Badge
        className="text-md font-semibold w-36 my-2"
        size="sm"
        color={statusColor}
      >
        Status: {status}
      </Badge>
      <div className="text-gray-800 grid grid-cols-1 gap-4 border-b pb-4 dark:text-white">
        <p className="flex items-center">
          <FaBolt className="mr-1 text-yellow-400" />
          <span className="font-medium mr-1">Konsumsi:</span>
          {watt} W, {usageHours} jam
        </p>
        <p className="flex items-center">
          <FaCalendarAlt className="mr-1 text-blue-500" />
          <span className="font-medium mr-1">Tanggal:</span>
          {date}
        </p>
      </div>
    </div>
  );
};

export default EnergyInfo;
