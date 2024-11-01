import React, { useState } from "react";
import { addEnergyData } from "../api/energyApi";
import { useNavigate } from "react-router-dom";
import { TextInput, Button, Label } from "flowbite-react";

const AddEnergyForm = () => {
  const [form, setForm] = useState({
    device: "",
    watt: "",
    usageHours: "",
    tips: "",
    date: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnergyData(form).then(() => navigate("/"));
  };

  return (
    <div className="container my-5">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-white border rounded-md shadow-md max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold text-green-600">
          Tambah Data Energi
        </h2>
        <div className="mb-4">
          <Label htmlFor="device" value="Device" />
          <TextInput
            type="text"
            name="device"
            id="device"
            placeholder="Device"
            value={form.device}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="watt" value="Watt" />
          <TextInput
            type="number"
            name="watt"
            id="watt"
            placeholder="Watt"
            value={form.watt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="usageHours" value="Usage Hours" />
          <TextInput
            type="number"
            name="usageHours"
            id="usageHours"
            placeholder="Usage Hours"
            value={form.usageHours}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="tips" value="Tips" />
          <TextInput
            type="text"
            name="tips"
            id="tips"
            placeholder="Tips"
            value={form.tips}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="date" value="Tanggal" />
          <TextInput
            type="date"
            name="date"
            id="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full" gradientDuoTone="greenToBlue">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddEnergyForm;
