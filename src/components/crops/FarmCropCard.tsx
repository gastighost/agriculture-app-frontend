import { Crop } from "../../store/crops";

interface FarmCropCardProps {
  crop: Crop;
}

const FarmCropCard = ({ crop }: FarmCropCardProps) => {
  return (
    <div className="bg-white w-56 drop-shadow-2xl rounded-md m-4 p-4">
      <h2 className="font-bold text-lg mb-2">{crop.name}</h2>
      <p className="text-gray-500 mb-4">Status: {crop.status}</p>
      <ul className="mb-4">
        <li>
          <strong>Planting Date:</strong>{" "}
          {new Date(crop.plantingDate).toLocaleDateString("en-US")}
        </li>
        <li>
          <strong>Harvest Date:</strong>{" "}
          {new Date(crop.harvestDate).toLocaleDateString("en-US")}
        </li>
        <li>
          <strong>Area:</strong> {crop.area} sqm
        </li>
      </ul>
    </div>
  );
};

export default FarmCropCard;
