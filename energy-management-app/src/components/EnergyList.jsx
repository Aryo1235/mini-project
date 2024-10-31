import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEnergyData, deleteEnergyData } from "../api/energyApi";
import FilterAndSort from "./FilterAndSort";

const EnergyList = () => {
  const [energyData, setEnergyData] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterDevice, setFilterDevice] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Jumlah item per halaman
  const navigate = useNavigate();

  useEffect(() => {
    getEnergyData()
      .then((res) => {
        setEnergyData(res.data);
      })
      .catch((error) => console.error("Error fetching energy data:", error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      deleteEnergyData(id)
        .then(() => {
          setEnergyData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
        })
        .catch((error) => console.error("Error deleting energy data:", error));
    }
  };

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

  // Menghitung data yang ditampilkan berdasarkan halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  // Handle filterDevice change to reset to first page
  const handleFilterDeviceChange = (device) => {
    setFilterDevice(device);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-green-600">
        Daftar Konsumsi Energi
      </h2>

      <FilterAndSort
        setFilterDate={setFilterDate}
        setFilterDevice={handleFilterDeviceChange} // Use the new function
        setSortOption={setSortOption}
      />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {currentItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border rounded-md shadow-sm bg-gray-50 cursor-pointer"
            onClick={() => navigate(`/${item.id}`)}
          >
            <div>
              <h3 className="text-lg font-bold text-green-700">
                {item.device}
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Tanggal:</span> {item.date}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Konsumsi:</span> {item.watt}W,{" "}
                {item.usageHours} jam
              </p>
            </div>
            <div className="flex space-x-2 mt-4">
              <Link
                to={`/edit/${item.id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400"
                onClick={(e) => e.stopPropagation()}
              >
                Edit
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Sebelumnya
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
};

export default EnergyList;
