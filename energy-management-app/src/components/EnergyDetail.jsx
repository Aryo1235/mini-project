import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEnergyDataById } from "../api/energyApi";

const EnergyDetail = () => {
  const { id } = useParams();
  const [energyData, setEnergyData] = useState(null);

  useEffect(() => {
    getEnergyDataById(id)
      .then((res) => {
        setEnergyData(res.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!energyData) {
    return <div>Loading...</div>;
  }

  const calculateEnergyCost = (watt, hours) => {
    const ratePerKWh = 0.1; // Example electricity rate per kWh
    return ((watt / 1000) * hours * ratePerKWh).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-green-600">
        Detail Konsumsi Energi
      </h2>
      <div className="p-4 mb-4 border rounded-md shadow-sm bg-gray-50">
        <h3 className="text-lg font-bold text-green-700">
          {energyData.device}
        </h3>
        <p className="text-gray-600">
          <span className="font-semibold">Konsumsi:</span> {energyData.watt}W,{" "}
          {energyData.usageHours} jam
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Tanggal:</span> {energyData.date}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Estimasi Biaya:</span> $
          {calculateEnergyCost(energyData.watt, energyData.usageHours)}
        </p>
        <p className="text-sm text-green-600 italic">{energyData.tips}</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
};

export default EnergyDetail;
