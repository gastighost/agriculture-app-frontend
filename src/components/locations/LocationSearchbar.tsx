import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchLocations } from "../../store/locations";
import { AppDispatch } from "../../store/store";

interface LocationSearchbarProps {
  setCreateLocationModal: (arg: any) => void;
}

const LocationSearchbar = (props: LocationSearchbarProps) => {
  const { setCreateLocationModal } = props;

  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(
      () => dispatch(fetchLocations({ name, region, country })),
      500
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [name, region, country, dispatch]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Search Locations</h2>
      <div className="flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-4 pr-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="form-input w-full"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Paris"
          />
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-4 pr-2">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="region"
          >
            Region
          </label>
          <input
            className="form-input w-full"
            id="region"
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="e.g. Provence"
          />
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <input
            className="form-input w-full"
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. France"
          />
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-4 pr-2">
          <button
            className="h-10 bg-green-600 hover:bg-green-700 text-white px-4 rounded-md"
            onClick={() => setCreateLocationModal(true)}
          >
            Create new location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearchbar;
