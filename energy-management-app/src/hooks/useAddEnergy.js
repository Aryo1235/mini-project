import { addEnergyData } from "../utils/ServiceApi/energyApi";
import { useState } from "react";

const useAddEnergy = () => {
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
  return {
    form,
    handleChange,
    handleDateChange,
    handleSubmit,
    isProcessing,
    showToast,
  };
};

export default useAddEnergy;
