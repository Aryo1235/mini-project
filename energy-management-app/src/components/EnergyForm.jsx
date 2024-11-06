import React from "react";
import { TextInput, Button, Label, Select } from "flowbite-react";
import { Datepicker } from "flowbite-react";

const EnergyForm = ({
  form,
  handleChange,
  handleDateChange,
  handleSubmit,
  buttonText,
  secondaryAction,
  secondaryButtonText,
  isProcessing, // Terima properti isProcessing
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 dark:bg-gray-900 bg-white border rounded-md shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold text-green-600">
        Form Konsumsi Energi
      </h2>

      <div>
        <Label htmlFor="device" value="Device" />
        <TextInput
          type="text"
          name="device"
          id="device"
          placeholder="Device"
          value={form.device}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="status" value="Status" />
        <Select name="status" value={form.status} onChange={handleChange}>
          <option value="">Pilih Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="date" value="Tanggal" />
        <Datepicker
          selected={form.date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="YYYY-MM-DD"
        />
      </div>

      <div>
        <Label htmlFor="watt" value="Watt" />
        <TextInput
          type="number"
          name="watt"
          id="watt"
          placeholder="Watt"
          value={form.watt}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="usageHours" value="Usage Hours" />
        <TextInput
          type="number"
          name="usageHours"
          id="usageHours"
          placeholder="Usage Hours"
          value={form.usageHours}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="tips" value="Tips" />
        <TextInput
          type="text"
          name="tips"
          id="tips"
          placeholder="Tips"
          value={form.tips}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-between space-x-10">
        {secondaryAction && (
          <Button
            onClick={secondaryAction}
            className="w-full"
            gradientDuoTone="purpleToBlue"
          >
            {secondaryButtonText}
          </Button>
        )}
        <Button
          type="submit"
          className="w-full"
          gradientDuoTone="greenToBlue"
          isProcessing={isProcessing} // Menambahkan isProcessing ke tombol utama
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default EnergyForm;
