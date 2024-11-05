import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEnergyDataById, updateEnergyData } from "../utils/energyApi";
import EnergyForm from "./EnergyForm";
import { Flowbite } from "flowbite-react";

const EditEnergyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    device: "",
    status: "",
    watt: "",
    usageHours: "",
    tips: "",
    date: "",
  });

  useEffect(() => {
    getEnergyDataById(id)
      .then((res) => setForm(res.data))
      .catch((error) => console.error("Error fetching energy data:", error));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.toLocaleDateString("en-CA") : "";
    setForm((prevForm) => ({ ...prevForm, date: formattedDate }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEnergyData(id, form)
      .then(() => {
        alert("Data berhasil diperbarui!");
        navigate("/");
      })
      .catch((error) => console.error("Error updating energy data:", error));
  };

  return (
    <div className=" min-h-screen dark:bg-gray-900 p-4">
      <EnergyForm
        form={form}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        buttonText="Update"
        secondaryAction={() => navigate(`/${id}`)}
        secondaryButtonText="Detail"
      />
    </div>
  );
};

export default EditEnergyForm;
