// src/components/EditEnergyForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEnergyDataById, updateEnergyData } from "../api/energyApi";

const EditEnergyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    device: "",
    watt: "",
    usageHours: "",
    tips: "",
    date: "", // Tambahkan field untuk tanggal
  });

  useEffect(() => {
    // Fetch energy data by ID
    getEnergyDataById(id)
      .then((res) => setFormData(res.data))
      .catch((error) => console.error("Error fetching energy data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEnergyData(id, formData)
      .then(() => {
        alert("Data berhasil diperbarui!");
        navigate("/");
      })
      .catch((error) => console.error("Error updating energy data:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Konsumsi Energi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Perangkat</label>
          <input
            type="text"
            name="device"
            value={formData.device}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Watt (W)</label>
          <input
            type="number"
            name="watt"
            value={formData.watt}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Durasi Penggunaan (jam)
          </label>
          <input
            type="number"
            name="usageHours"
            value={formData.usageHours}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tanggal</label>
          <input
            type="date" // Menggunakan input tipe date
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tips Penghematan</label>
          <textarea
            name="tips"
            value={formData.tips}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate(`/detail/${id}`)} // Tambahkan navigasi ke halaman detail
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Detail
        </button>
      </form>
    </div>
  );
};

export default EditEnergyForm;
