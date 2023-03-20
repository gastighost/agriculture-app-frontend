import Image from "next/image";
import Link from "next/link";

import { Farm } from "../../store/farms";
import { Location } from "../../store/locations";

interface FarmLocationCardProps {
  location: Location;
  farm: Farm;
}

const FarmLocationCard = ({ location, farm }: FarmLocationCardProps) => {
  return (
    <div key={farm.id} className="bg-white rounded-lg shadow-md p-4">
      <Link href={`/farms/${farm.id}`}>
        <Image
          src="/farm-stock-image.jpeg"
          alt={farm.name}
          width={200}
          height={150}
          className="rounded-lg"
        />
        <h3 className="text-lg font-medium my-2">{farm.name}</h3>
        <p className="text-gray-700">
          <span className="font-medium">Area size:</span> {farm.areaSize}
          sqm
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Region:</span> {location.region}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Country:</span> {location.country}
        </p>
      </Link>
    </div>
  );
};

export default FarmLocationCard;
