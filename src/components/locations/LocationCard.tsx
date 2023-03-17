import Link from "next/link";

interface LocationProps {
  id: string;
  name: string;
  region: string;
  country: string;
  selectedLocation: string;
  setSelectedLocation: (arg: any) => void;
}

const LocationCard = (props: LocationProps) => {
  const { id, name, region, country, selectedLocation, setSelectedLocation } =
    props;

  const isHovering = id === selectedLocation;

  return (
    <div
      className={`block ${
        isHovering ? "bg-green-500" : "bg-green-600"
      } rounded`}
      onMouseOver={() => setSelectedLocation(id)}
      onMouseOut={() => setSelectedLocation("")}
    >
      <Link href={`/locations/${id}`}>
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <div className="text-sm leading-5 font-medium text-white">
                  {name}
                </div>
                <div className="mt-2 flex items-center text-sm leading-5 text-white">
                  <span>
                    {region}, {country}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LocationCard;
