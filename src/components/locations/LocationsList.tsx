import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLocations } from "../../store/locations";
import { AppDispatch, RootState } from "../../store/store";
import CreateLocation from "./CreateLocation";
import Location from "./Location";

const LocationsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { locations } = useSelector((store: RootState) => store.locations);

  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [createLocationModal, setCreateLocationModal] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchLocations({}));
  }, [dispatch]);

  return (
    <div className="bg-white container mx-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Locations
        </h1>

        <button className="" onClick={() => setCreateLocationModal(true)}>
          Create new location
        </button>
      </div>
      <div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            {locations.map((location) => {
              const { id, name, region, country } = location;

              return (
                <Location
                  key={id}
                  id={id}
                  name={name}
                  region={region}
                  country={country}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              );
            })}
          </div>
        </div>
      </div>
      <CreateLocation
        createLocationModal={createLocationModal}
        setCreateLocationModal={setCreateLocationModal}
      />
    </div>
  );
};

export default LocationsList;
