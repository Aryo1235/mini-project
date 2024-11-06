import {
  HiOutlineLightningBolt,
  HiOutlineDeviceMobile,
  HiOutlineCog,
} from "react-icons/hi";

export default function FeaturesCard() {
  return (
    <div className="flex justify-center mt-12">
      <div className="flex w-full max-w-4xl divide-x divide-gray-300">
        {/* Card 1 */}
        <div className="p-8 bg-white dark:bg-gray-900 text-center">
          <HiOutlineLightningBolt className="w-10 h-10 mx-auto mb-4 text-green-500" />
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            Analisis Konsumsi Energi
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tampilkan data konsumsi energi setiap perangkat, memberikan insight
            yang mendalam untuk penghematan dan efisiensi.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 bg-white dark:bg-gray-900 text-center">
          <HiOutlineDeviceMobile className="w-10 h-10 mx-auto mb-4 text-green-500" />
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            Filter dan Sortir Data
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sesuaikan tampilan data berdasarkan perangkat, tanggal, atau
            konsumsi untuk analisis yang lebih mudah.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-8 bg-white dark:bg-gray-900 text-center">
          <HiOutlineCog className="w-10 h-10 mx-auto mb-4 text-green-500" />
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            Pengelolaan Data Terpusat
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Kelola data energi dengan mudah, mulai dari penambahan, pengeditan,
            hingga penghapusan melalui sistem terpusat.
          </p>
        </div>
      </div>
    </div>
  );
}
