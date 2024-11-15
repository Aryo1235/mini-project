import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEnergyDataById } from "../utils/energyApi";
import EnergyCardDetail from "../components/EnergyDetail/EnergyCardDetail";
import EnergyInfo from "../components/EnergyDetail/EnergyInfo";
import GolonganSelector from "../components/EnergyDetail/GolonganSelector";
import EnergyEstimator from "../components/EnergyDetail/EnergyEstimator";
import EnergyTips from "../components/EnergyDetail/EnergyTips";
import { Button } from "flowbite-react";

const EnergyDetail = () => {
  const { id } = useParams();
  const [energyData, setEnergyData] = useState(null);
  const [ratePerKWh, setRatePerKWh] = useState(1352); // Default rate for R-1
  const [selectedGolongan, setSelectedGolongan] = useState("R-1");

  const golonganTariffs = {
    "R-1": 1352,
    "R-2": 1699,
    Bisnis: 2000,
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

  useEffect(() => {
    getEnergyDataById(id)
      .then((res) => setEnergyData(res.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!energyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark:bg-gray-900 min-h-screen py-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-600 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Detail Konsumsi Energi
      </h2>
      <EnergyCardDetail>
        <EnergyInfo
          device={energyData.device}
          status={energyData.status}
          watt={energyData.watt}
          usageHours={energyData.usageHours}
          date={energyData.date}
        />
        <GolonganSelector
          selectedGolongan={selectedGolongan}
          onChange={handleGolonganChange}
          ratePerKWh={ratePerKWh}
        />
        <EnergyEstimator
          cost={calculateEnergyCost(
            energyData.watt,
            energyData.usageHours,
            ratePerKWh
          )}
        />
        <EnergyTips tips={energyData.tips} />
        <Link to="/home" className="flex justify-center mt-5">
          <Button color="success" size="lg">
            Kembali
          </Button>
        </Link>
      </EnergyCardDetail>
    </div>
  );
};

export default EnergyDetail;
