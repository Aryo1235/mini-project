import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEnergyDataById } from "../utils/energyApi";
import { Card, Button, Label, Select, Badge } from "flowbite-react";
import { FaBolt, FaCalendarAlt } from "react-icons/fa";

const EnergyDetail = () => {
  const { id } = useParams();
  const [energyData, setEnergyData] = useState(null);
  const [ratePerKWh, setRatePerKWh] = useState(1352); // Default rate for R-1
  const [selectedGolongan, setSelectedGolongan] = useState("R-1");

  useEffect(() => {
    getEnergyDataById(id)
      .then((res) => setEnergyData(res.data))
      .catch((error) => console.error(error));
  }, [id]);

  const golonganTariffs = {
    "R-1": 1352, // Tarif per kWh untuk R-1 900 VA
    "R-2": 1699, // Tarif per kWh untuk R-2
    Bisnis: 2000, // Tarif per kWh untuk golongan Bisnis
  };

  const handleGolonganChange = (e) => {
    const golongan = e.target.value;
    setSelectedGolongan(golongan);
    setRatePerKWh(golonganTariffs[golongan]);
  };

  const calculateEnergyCost = (watt, hours, rate) => {
    const cost = (watt / 1000) * hours * rate;
    return cost.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  if (!energyData) {
    return <div>Loading...</div>;
  }

  const statusColor = energyData.status === "Aktif" ? "success" : "failure";

  return (
    <div className="dark:bg-gray-900 min-h-screen py-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-600 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Detail Konsumsi Energi
      </h2>
      <Card className="flex flex-col mx-auto max-w-lg bg-gradient-to-br from-white to-green-100 dark:bg-gradient-to-br from-bg-gray-800 shadow-lg rounded-2xl p-8">
        <h3 className="text-2xl text-center font-semibold text-green-800 mb-4 dark:text-green-500">
          {energyData.device}
        </h3>

        <Badge
          className="text-md font-semibold w-36"
          size="sm"
          color={statusColor}
        >
          Status: {energyData.status}
        </Badge>

        <div className="text-gray-800 grid grid-cols-1  gap-4 border-b pb-4 dark:text-white">
          <p className="flex items-center">
            <FaBolt className="mr-1 text-yellow-400" />
            <span className="font-medium mr-1">Konsumsi:</span>
            {energyData.watt} W, {energyData.usageHours} jam
          </p>
          <p className="flex items-center">
            <FaCalendarAlt className="mr-1 text-blue-500" />
            <span className="font-medium mr-1">Tanggal:</span>
            {energyData.date}
          </p>
        </div>

        <div className="mt-4">
          <Label
            htmlFor="golongan"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Pilih Golongan
          </Label>
          <Select
            id="golongan"
            value={selectedGolongan}
            onChange={handleGolonganChange}
            className="w-full"
          >
            <option value="R-1">R-1 (900 VA)</option>
            <option value="R-2">R-2 (3.500 VA - 5.500 VA)</option>
            <option value="Bisnis">Bisnis</option>
          </Select>
        </div>

        <Label
          htmlFor="rate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tarif per kWh:{" "}
          {ratePerKWh.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Label>

        <div className="bg-green-50 p-4 rounded-lg shadow-inner border-l-4 border-gray-500">
          <p className="text-gray-700 text-lg font-medium">
            Estimasi Biaya:{" "}
            <span className="text-green-700 font-bold">
              {calculateEnergyCost(
                energyData.watt,
                energyData.usageHours,
                ratePerKWh
              )}
            </span>
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400 shadow-sm">
          <p className="text-green-800 text-lg font-medium mb-1">
            Tips Hemat Energi:
          </p>
          <p className="text-sm text-gray-700 italic">{energyData.tips}</p>
        </div>

        <Link to="/" className="flex justify-center mt-5">
          <Button color="success" size="lg">
            Kembali
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default EnergyDetail;
