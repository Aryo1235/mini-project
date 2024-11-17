import { useParams, useNavigate } from "react-router-dom";
import EnergyForm from "../components/EnergyForm";
import ToastNotification from "../components/ToastNotification";
import useEditEnergy from "../hooks/useEditEnergy";

const EditEnergyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Menggunakan custom hook
  const {
    form,
    handleChange,
    handleDateChange,
    handleSubmit,
    isProcessing,
    showToast,
  } = useEditEnergy(id);

  return (
    <div className="min-h-screen dark:bg-gray-900 p-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-600 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Edit Device
      </h2>
      {showToast && <ToastNotification message="Data berhasil diperbarui!" />}
      <EnergyForm
        form={form}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        buttonText="Update"
        secondaryAction={() => navigate(`/home/${id}`)}
        secondaryButtonText="Detail"
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default EditEnergyForm;
