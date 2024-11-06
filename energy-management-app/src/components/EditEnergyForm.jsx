import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEnergyDataById, updateEnergyData } from "../utils/energyApi";
import EnergyForm from "./EnergyForm";
import ToastNotification from "./ToastNotification";

const EditEnergyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false); // State untuk notifikasi
  const [form, setForm] = useState({
    device: "",
    status: "",
    watt: "",
    usageHours: "",
    tips: "",
    date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEnergyDataById(id);
        setForm(res.data);
      } catch (error) {
        console.error("Error fetching energy data:", error);
      }
    };
    fetchData();
  }, [id]);

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
      await updateEnergyData(id, form);
      setShowToast(true); // Tampilkan notifikasi sukses
      setTimeout(() => setShowToast(false), 3000); // Sembunyikan notifikasi setelah 3 detik
    } catch (error) {
      console.error("Error updating energy data:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 p-4">
      {showToast && <ToastNotification message="Data berhasil diperbarui!" />}
      <EnergyForm
        form={form}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        buttonText="Update"
        secondaryAction={() => navigate(`/${id}`)}
        secondaryButtonText="Detail"
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default EditEnergyForm;
