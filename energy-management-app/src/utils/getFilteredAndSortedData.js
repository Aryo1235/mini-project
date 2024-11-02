// utils/getFilteredAndSortedData.js
export const getFilteredAndSortedData = (
  data,
  filterDate,
  filterDevice,
  sortOption
) => {
  return data
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
};
