import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFarms } from "../../store/farms";
import { fetchLocation } from "../../store/locations";
import { AppDispatch, RootState } from "../../store/store";
import FarmLocationCard from "../farms/FarmLocationCard";

interface LocationProps {
  locationId: string;
}

const Location = ({ locationId }: LocationProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { location } = useSelector((store: RootState) => store.locations);
  const { farms } = useSelector((store: RootState) => store.farms);

  useEffect(() => {
    if (locationId) {
      dispatch(fetchLocation(locationId));
      dispatch(fetchFarms({ locationId }));
    }
  }, [dispatch, locationId]);

  if (!location) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center justify-center space-x-2 text-green-700">
          <svg
            className="animate-spin h-5 w-5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm0-16a8 8 0 018 8h4a12.015 12.015 0 00-3-8.938A7.962 7.962 0 0112 4z"
            ></path>
          </svg>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">{location.name}</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-100 px-4 py-2 rounded-lg text-gray-800 font-medium">
            Edit
          </button>
          <button className="bg-red-500 px-4 py-2 rounded-lg text-white font-medium">
            Delete
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <Image
            src="/farm-stock-photo.jpeg"
            alt="farm-photo"
            width={400}
            height={300}
            className="rounded-lg"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>
        <div>
          <h2 className="text-xl font-medium mb-2">Location details</h2>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Region:</span> {location.region}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Country:</span> {location.country}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Latitude:</span> {location.latitude}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Longitude:</span> {location.longitude}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-medium mb-2">Farms in {location.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {farms.map((farm) => (
            <FarmLocationCard key={farm.id} location={location} farm={farm} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Location;
