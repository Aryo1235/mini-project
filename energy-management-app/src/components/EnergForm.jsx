// EnergyForm.js
import React from "react";
import { TextInput, Button, Label, Select } from "flowbite-react";
import { Datepicker } from "flowbite-react"; // pastikan ini sudah di-install

const EnergyForm = ({
  formData,
  handleChange,
  handleDateChange,
  handleSubmit,
  title,
  navigateTo,
}) => {
  return (
    <div className="container my-5">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-white border rounded-md shadow-md max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold text-green-600">{title}</h2>
        <div className="mb-4">
          <Label htmlFor="device" value="Device" />
          <TextInput
            type="text"
            name="device"
            id="device"
            placeholder="Device"
            value={formData.device}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="status" value="Status" />
          <Select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Pilih Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="watt" value="Watt" />
          <TextInput
            type="number"
            name="watt"
            id="watt"
            placeholder="Watt"
            value={formData.watt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="usageHours" value="Usage Hours" />
          <TextInput
            type="number"
            name="usageHours"
            id="usageHours"
            placeholder="Usage Hours"
            value={formData.usageHours}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="tips" value="Tips" />
          <TextInput
            type="text"
            name="tips"
            id="tips"
            placeholder="Tips"
            value={formData.tips}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="date" value="Tanggal" />
          <Datepicker
            selected={formData.date}
            onChange={handleDateChange}
            placeholderText="Pilih Tanggal"
          />
        </div>
        <div className="flex justify-between space-x-10">
          <Button
            onClick={navigateTo}
            className="w-full"
            gradientDuoTone="purpleToBlue"
          >
            Kembali
          </Button>
          <Button
            type="submit"
            className="w-full"
            gradientDuoTone="greenToBlue"
          >
            {title === "Tambah Data Energi" ? "Tambah" : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnergyForm;
