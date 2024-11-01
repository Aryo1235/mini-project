import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEnergyData, deleteEnergyData } from "../api/energyApi";
import FilterAndSort from "./FilterAndSort";
import { Button, Card, Pagination } from "flowbite-react";

const EnergyList = () => {
  const [energyData, setEnergyData] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterDevice, setFilterDevice] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;
  const navigate = useNavigate();

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleFilterDeviceChange = (device) => {
    setFilterDevice(device);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-green-600">
        Daftar Konsumsi Energi
      </h2>

      {/* Flex Container for Filter and Add Button */}

      <FilterAndSort
        setFilterDate={setFilterDate}
        setFilterDevice={handleFilterDeviceChange}
        setSortOption={setSortOption}
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md animate-pulse h-56 space-y-6"
              >
                <div className="h-4 py-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4  py-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-4 py-3 bg-gray-300 rounded w-5/6 mb-4"></div>
                <div className="flex space-x-2 mt-4">
                  <div className="h-8 py-5 bg-gray-300 rounded w-14"></div>
                  <div className="h-8 py-5 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            ))
          : currentItems.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-green-800">
                  {item.device}
                </h3>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Tanggal:</span> {item.date}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Konsumsi:</span> {item.watt}W,{" "}
                  {item.usageHours} jam
                </p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2">
                    <Button
                      outline
                      gradientDuoTone="greenToBlue"
                      className="transition-colors duration-300"
                    >
                      <Link
                        to={`/edit/${item.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Edit
                      </Link>
                    </Button>
                    <Button
                      outline
                      gradientDuoTone="pinkToOrange"
                      size="sm"
                      className="transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
      </ul>

      {/* Flowbite Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default EnergyList;
