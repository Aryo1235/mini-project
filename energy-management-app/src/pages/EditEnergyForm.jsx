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
