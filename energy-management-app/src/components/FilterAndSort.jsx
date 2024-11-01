import { Datepicker, TextInput } from "flowbite-react";
import React from "react";
import { Dropdown, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const FilterAndSort = ({ setFilterDate, setFilterDevice, setSortOption }) => {
  const handleDateChange = (date) => {
    const formattedDate = date ? date.toLocaleDateString("en-CA") : ""; // Menggunakan 'en-CA' untuk format YYYY-MM-DD
    console.log("Selected date:", formattedDate);
    setFilterDate(formattedDate);
  };

  return (
    <div className="mb-4 flex  justify-between ">
      <div className="flex space-x-2">
        <Datepicker
          onChange={handleDateChange}
          className="w-48 cursor-pointer"
          placeholder="Pilih Tanggal"
        />

        {/* Filter perangkat dengan search input */}
        <TextInput
          type="text"
          placeholder="Cari nama perangkat"
          onChange={(e) => setFilterDevice(e.target.value)}
        />

        {/* Dropdown untuk pengurutan */}
        <Dropdown label="Urutkan" color="info" size="sm">
          <Dropdown.Item onClick={() => setSortOption("")}>
            Default (Terbaru)
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption("watt-asc")}>
            Watt (Rendah ke Tinggi)
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption("watt-desc")}>
            Watt (Tinggi ke Rendah)
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption("duration-asc")}>
            Durasi (Rendah ke Tinggi)
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption("duration-desc")}>
            Durasi (Tinggi ke Rendah)
          </Dropdown.Item>
        </Dropdown>
      </div>
      <Button gradientMonochrome="success">
        <Link to="/add">Tambah Data</Link>
      </Button>
    </div>
  );
};

export default FilterAndSort;
