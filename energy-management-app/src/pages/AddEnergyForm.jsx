import { useNavigate } from "react-router-dom";
import ToastNotification from "../components/ToastNotification";
import EnergyForm from "../components/EnergyForm";
import useAddEnergy from "../hooks/useAddEnergy";

const AddEnergyForm = () => {
  const navigate = useNavigate();

  // Menggunakan custom hook
  const {
    form,
    handleChange,
    handleDateChange,
    handleSubmit,
    isProcessing,
    showToast,
  } = useAddEnergy();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-transparent dark:from-green-950 dark:bg-gray-950 p-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-600 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Tambah Device
      </h2>
      {showToast && <ToastNotification message="Data berhasil ditambahkan!" />}
      <EnergyForm
        form={form}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        buttonText="Add"
        secondaryAction={() => navigate("/home")}
        secondaryButtonText="Kembali"
        isProcessing={isProcessing} // Kirim status loading ke komponen EnergyForm
      />
    </div>
  );
};

export default AddEnergyForm;
