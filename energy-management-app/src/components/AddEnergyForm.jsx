import React, { useState } from "react";
import { addEnergyData } from "../utils/energyApi";
import { useNavigate } from "react-router-dom";
import ToastNotification from "./ToastNotification";
import EnergyForm from "./EnergyForm";

const AddEnergyForm = () => {
  const [form, setForm] = useState({
    device: "",
    status: "",
    watt: "",
    usageHours: "",
    tips: "",
    date: "",
  });
  const [isProcessing, setIsProcessing] = useState(false); // State untuk mengelola status loading
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.toLocaleDateString("en-CA") : "";
    setForm((prevForm) => ({ ...prevForm, date: formattedDate }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await addEnergyData(form); // Proses penambahan data
      setShowToast(true); // Menampilkan toast untuk notifikasi sukses
      setTimeout(() => setShowToast(false), 3000); // Sembunyikan notifikasi setelah 3 detik
    } catch (error) {
      console.error("Error saat menambahkan data energi:", error); // Log error

      // Anda juga dapat menampilkan pesan error pada UI
    } finally {
      setIsProcessing(false); // Pastikan loading dinonaktifkan meskipun terjadi error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-transparent dark:from-green-950 dark:bg-gray-950 p-4">
      {showToast && <ToastNotification message="Data berhasil ditambahkan!" />}
      <EnergyForm
        form={form}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        buttonText="Add"
        secondaryAction={() => navigate("/")}
        secondaryButtonText="Kembali"
        isProcessing={isProcessing} // Kirim status loading ke komponen EnergyForm
      />
    </div>
  );
};

export default AddEnergyForm;
