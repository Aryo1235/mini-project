import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEnergyData, deleteEnergyData } from "../api/energyApi";

const EnergyList = () => {
  const [energyData, setEnergyData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getEnergyData()
      .then((res) => {
        setEnergyData(res.data);
        const savedFavorites =
          JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    deleteEnergyData(id).then(() => {
      setEnergyData((prevData) => prevData.filter((item) => item.id !== id));
    });
  };

  const handleFavorite = (id) => {
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter((fav) => fav !== id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, id];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const filteredData = energyData.filter((item) =>
    filterDate ? item.date === filterDate : true
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-green-600">
        Daftar Konsumsi Energi
      </h2>
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className="mb-4 p-2 border rounded-md"
      />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredData.map((item) => (
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(item.id);
                }}
                className={`px-3 py-1 rounded-md ${
                  favorites.includes(item.id) ? "bg-blue-500" : "bg-gray-300"
                } text-white hover:bg-blue-400`}
              >
                {favorites.includes(item.id) ? "Batal Favorit" : "Favorit"}
              </button>
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
    </div>
  );
};

export default EnergyList;
