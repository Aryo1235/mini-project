import { useEffect, useState } from "react";
import { getEnergyData, deleteEnergyData } from "../api/energyApi";
import FilterAndSort from "./FilterAndSort";
import SkeletonCard from "./SkeletonCard";
import EnergyCard from "./EnergyCard";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Pagination, Toast } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";

const EnergyList = () => {
  const [energyData, setEnergyData] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterDevice, setFilterDevice] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    getEnergyData()
      .then((res) => {
        setEnergyData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching energy data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteEnergyData(itemToDelete)
      .then(() => {
        setEnergyData((prevData) =>
          prevData.filter((item) => item.id !== itemToDelete)
        );
        setIsModalOpen(false);
        setItemToDelete(null);
        setShowToast(true);

        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((error) => console.error("Error deleting energy data:", error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  // Apply filters and sorting
  const filteredAndSortedData = energyData
    .filter((item) => (filterDate ? item.date === filterDate : true))
    .filter((item) =>
      filterDevice.length >= 2
        ? item.device.toLowerCase().includes(filterDevice.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sortOption === "watt-asc") return a.watt - b.watt;
      if (sortOption === "watt-desc") return b.watt - a.watt;
      if (sortOption === "duration-asc") return a.usageHours - b.usageHours;
      if (sortOption === "duration-desc") return b.usageHours - a.usageHours;
      return 0;
    });

  const currentItems = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-green-600">
        Daftar Konsumsi Energi
      </h2>

      {/* Filter and Sort Component */}
      <FilterAndSort
        setFilterDate={setFilterDate}
        setFilterDevice={setFilterDevice}
        setSortOption={setSortOption}
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          <SkeletonCard itemsPerPage={itemsPerPage} />
        ) : (
          currentItems.map((item) => (
            <EnergyCard key={item.id} item={item} onDelete={handleDelete} />
          ))
        )}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4">
          <Toast>
            <div className="inline-flex items-center justify-center w-10 h-10 text-green-500 bg-green-100 rounded-lg">
              <HiCheckCircle className="w-5 h-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Item berhasil dihapus.
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
    </div>
  );
};

export default EnergyList;
