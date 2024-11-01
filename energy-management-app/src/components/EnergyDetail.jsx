import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEnergyDataById } from "../api/energyApi";
import { Card, Button } from "flowbite-react";

const EnergyDetail = () => {
  const { id } = useParams();
  const [energyData, setEnergyData] = useState(null);
  const [ratePerKWh, setRatePerKWh] = useState(0.1); // Default rate per kWh

  useEffect(() => {
    getEnergyDataById(id)
      .then((res) => setEnergyData(res.data))
      .catch((error) => console.error(error));
  }, [id]);

  const calculateEnergyCost = (watt, hours, rate) => {
    return ((watt / 1000) * hours * rate).toFixed(2); // Menghitung biaya
  };

  if (!energyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-600 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Detail Konsumsi Energi
      </h2>
      <Card className="mx-auto max-w-lg bg-gradient-to-br from-white to-green-100 shadow-lg rounded-2xl p-6">
        <h3 className="text-2xl font-semibold text-green-800 mb-4">
          {energyData.device}
        </h3>
        <div className="text-gray-800 mb-4">
          <p>
            <span className="font-medium">Konsumsi:</span> {energyData.watt}W,{" "}
            {energyData.usageHours} jam
          </p>
          <p>
            <span className="font-medium">Tanggal:</span> {energyData.date}
          </p>
        </div>

        <div className="mt-4 mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tarif per kWh:
          </label>
          <input
            type="number"
            value={ratePerKWh}
            onChange={(e) => setRatePerKWh(parseFloat(e.target.value))}
            step="0.01"
            placeholder="0.1"
            className="rounded-lg shadow-inner border-gray-300"
          />
        </div>

        <p className="text-gray-700 mt-6 text-lg font-medium">
          Estimasi Biaya:{" "}
          <span className="text-green-700 font-bold">
            Rp{" "}
            {calculateEnergyCost(
              energyData.watt,
              energyData.usageHours,
              ratePerKWh
            )}
          </span>
        </p>
        <p className="text-sm text-green-600 italic mt-4">{energyData.tips}</p>

        <Link to="/">
          <Button color="success" size="sm" pill>
            Kembali
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default EnergyDetail;
