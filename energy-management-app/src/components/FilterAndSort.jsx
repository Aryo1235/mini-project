import React from "react";

const FilterAndSort = ({ setFilterDate, setFilterDevice, setSortOption }) => {
  return (
    <div className="mb-4">
      {/* Filter berdasarkan tanggal */}
      <input
        type="date"
        onChange={(e) => setFilterDate(e.target.value)}
        className="p-2 border rounded-md mb-2 mr-2"
      />

      {/* Filter perangkat dengan search input */}
      <input
        type="text"
        placeholder="Cari nama perangkat"
        onChange={(e) => setFilterDevice(e.target.value)}
        className="p-2 border rounded-md mb-2 mr-2"
      />

      {/* Sortir berdasarkan watt atau durasi */}
      <select
        onChange={(e) => setSortOption(e.target.value)}
        className="p-2 border rounded-md mb-2"
      >
        <option value="">Urutkan</option>
        <option value="watt-asc">Watt (Rendah ke Tinggi)</option>
        <option value="watt-desc">Watt (Tinggi ke Rendah)</option>
        <option value="duration-asc">Durasi (Rendah ke Tinggi)</option>
        <option value="duration-desc">Durasi (Tinggi ke Rendah)</option>
      </select>
    </div>
  );
};

export default FilterAndSort;
