import { Label, Select } from "flowbite-react";

const GolonganSelector = ({ selectedGolongan, onChange, ratePerKWh }) => {
  return (
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
        onChange={onChange}
        className="w-full"
      >
        <option value="R-1">R-1 (900 VA)</option>
        <option value="R-2">R-2 (3.500 VA - 5.500 VA)</option>
        <option value="Bisnis">Bisnis</option>
      </Select>
      <Label
        htmlFor="rate"
        className="block text-sm font-medium text-gray-700 mb-1 mt-2"
      >
        Tarif per kWh:{" "}
        {ratePerKWh.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </Label>
    </div>
  );
};

export default GolonganSelector;
