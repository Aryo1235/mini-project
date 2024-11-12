// EnergyCard.js
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Badge } from "flowbite-react";
import { FaCalendarAlt, FaBolt } from "react-icons/fa"; // Import ikon

const EnergyCard = ({ item, onDelete }) => {
  const navigate = useNavigate();
  const statusColor = item.status === "Aktif" ? "success" : "failure";

  return (
    <Card
      className="cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg 
        bg-gradient-to-br from-green-300 to-blue-100 dark:bg-gray-700 rounded-lg shadow-md p-5"
      onClick={() => navigate(`/home/${item.id}`)}
    >
      {/* Header Device */}
      <h3 className="font-serif text-lg font-bold text-cyan-700 mb-2 flex items-center justify-center">
        {item.device}
      </h3>

      {/* Status */}
      <Badge
        color={statusColor}
        className="text-sm font-semibold w-36"
        size="sm"
      >
        Status: {item.status}
      </Badge>

      {/* Date */}
      <p className="text-sm text-gray-700 mb-1 flex items-center">
        <FaCalendarAlt className="mr-2" />
        <span className="font-semibold">Tanggal :</span> {item.date}
      </p>

      {/* Consumption Info */}
      <p className="text-gray-700 mb-2 flex items-center">
        <FaBolt className="mr-2" />
        <span className="font-semibold mr-1">Konsumsi :</span>
        <span>{item.watt}W</span>, {item.usageHours} jam
      </p>

      {/* Action Buttons */}

      <div className="flex space-x-2 mt-3 w-full">
        <Button outline gradientDuoTone="greenToBlue">
          <Link to={`/edit/${item.id}`} onClick={(e) => e.stopPropagation()}>
            Edit
          </Link>
        </Button>
        <Button
          outline
          gradientDuoTone="pinkToOrange"
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering card click
            onDelete(item.id);
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default EnergyCard;
