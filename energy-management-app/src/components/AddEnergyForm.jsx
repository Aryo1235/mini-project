import React, { useState } from "react";
import { addEnergyData } from "../utils/energyApi";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.toLocaleDateString("en-CA") : "";
    setForm((prevForm) => ({ ...prevForm, date: formattedDate }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnergyData(form).then(() => navigate("/"));
  };

  return (
    <div className="container my-5">
      <EnergyForm
        form={form}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        buttonText="Add"
        secondaryAction={() => navigate("/")}
        secondaryButtonText="Kembali"
      />
    </div>
  );
};

export default AddEnergyForm;
