// EnergyCard.js
import { Link } from "react-router-dom";
import { Button, Card } from "flowbite-react";

const EnergyCard = ({ item, onDelete }) => {
  return (
    <Card className="cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg">
      <h3 className="text-lg font-bold text-green-800">{item.device}</h3>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Tanggal:</span> {item.date}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Konsumsi:</span> {item.watt}W,{" "}
        {item.usageHours} jam
      </p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
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
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EnergyCard;
