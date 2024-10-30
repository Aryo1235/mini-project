import React, { useState } from "react";
import { addEnergyData } from "../api/energyApi";
import { useNavigate } from "react-router-dom";

const AddEnergyForm = () => {
  const [form, setForm] = useState({
    device: "",
    watt: "",
    usageHours: "",
    tips: "",
    date: "", // Adding date to the form state
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white border rounded-md shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold text-green-600">
        Tambah Data Energi
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Device
        </label>
        <input
          type="text"
          name="device"
          placeholder="Device"
          value={form.device}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Watt</label>
        <input
          type="number"
          name="watt"
          placeholder="Watt"
          value={form.watt}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Usage Hours
        </label>
        <input
          type="number"
          name="usageHours"
          placeholder="Usage Hours"
          value={form.usageHours}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tips</label>
        <input
          type="text"
          name="tips"
          placeholder="Tips"
          value={form.tips}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Tanggal
        </label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <button
        type="submit"
        className="btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
      >
        Add
      </button>
    </form>
  );
};

export default AddEnergyForm;
