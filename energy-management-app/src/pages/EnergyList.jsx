import { useEffect, useState } from "react";
import { getEnergyData, deleteEnergyData } from "../utils/ServiceApi/energyApi";
import EnergyCard from "../components/EnergyList/EnergyCard";
import SkeletonCard from "../components/EnergyList/SkeletonCard";
import FilterAndSort from "../components/EnergyList/FilterAndSort";
import DeleteConfirmationModal from "../components/DeleteConfirmModal";
import { Pagination } from "flowbite-react";
import { getFilteredAndSortedData } from "../utils/getFilteredAndSortedData";
import ToastNotification from "../components/ToastNotification";

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

  console.log("energyData", filterDate);

  // Fetch energy data when the component mounts
  useEffect(() => {
    const fetchEnergyData = async () => {
      try {
        const res = await getEnergyData();
        setEnergyData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching energy data:", error);
        setLoading(false);
      }
    };
    fetchEnergyData();
  }, []);

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEnergyData(itemToDelete); // Langkah 1: Memanggil API untuk menghapus data
      setEnergyData(
        (prevData) => prevData.filter((item) => item.id !== itemToDelete) // Langkah 2: Menghapus item dari state
      );
      setIsModalOpen(false); // Langkah 3: Menutup modal konfirmasi
      setItemToDelete(null); // Langkah 4: Menghapus item yang akan dihapus dari state
      setShowToast(true); // Langkah 5: Menampilkan toast notifikasi

      setTimeout(() => {
        setShowToast(false); // Langkah 6: Menyembunyikan toast setelah 3 detik
      }, 3000);
    } catch (error) {
      console.error("Error deleting energy data:", error); // Langkah 7: Menangani error jika penghapusan gagal
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  // Panggil fungsi utility
  const filteredAndSortedData = getFilteredAndSortedData(
    energyData,
    filterDate,
    filterDevice,
    sortOption
  );

  const currentItems = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage, //start index
    currentPage * itemsPerPage //end index
  );
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  return (
    <div className="min-h-screen pb-5 bg-gradient-to-br from-green-100 via-transparent dark:from-green-950 dark:bg-gray-950">
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
        {showToast && <ToastNotification message="Data berhasil dihapus!" />}
      </div>
    </div>
  );
};

export default EnergyList;
