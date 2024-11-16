// hooks/useEnergyForm.js

import { useState, useEffect } from "react";
import { getEnergyDataById, updateEnergyData } from "../utils/energyApi"; // Pastikan path sesuai

// Custom hook untuk mengelola form dan pengambilan data energi
const useEditEnergy = (id) => {
  const [form, setForm] = useState({
    device: "",
    status: "",
    watt: "",
    usageHours: "",
    tips: "",
    date: "",
  });
  const [isProcessing, setIsProcessing] = useState(false); // Mengelola status loading
  const [showToast, setShowToast] = useState(false); // Menampilkan notifikasi

  // Mengambil data energi berdasarkan id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEnergyDataById(id);
        setForm(res.data); // Mengatur form dengan data yang diterima dari API
      } catch (error) {
        console.error("Error fetching energy data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Mengelola perubahan input pada form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Mengelola perubahan tanggal
  const handleDateChange = (date) => {
    const formattedDate = date ? date.toLocaleDateString("en-CA") : "";
    setForm((prevForm) => ({ ...prevForm, date: formattedDate }));
  };

  // Menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // Mengaktifkan status loading
    try {
      await updateEnergyData(id, form); // Mengirim data ke API untuk update
      setShowToast(true); // Menampilkan toast notifikasi
      setTimeout(() => setShowToast(false), 3000); // Menyembunyikan toast setelah 3 detik
    } catch (error) {
      console.error("Error updating energy data:", error);
    } finally {
      setIsProcessing(false); // Mematikan status loading setelah proses selesai
    }
  };

  return {
    form,
    handleChange,
    handleDateChange,
    handleSubmit,
    isProcessing,
    showToast,
    setShowToast,
  };
};

export default useEditEnergy;
