import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Location from "./Location";

const LocationsList = () => {
  const { locations } = useSelector((store: RootState) => store.locations);

  const [selectedLocation, setSelectedLocation] = useState<string>("");

  return (
    <div className="bg-white container mx-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Locations
        </h1>
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
    </div>
  );
};

export default LocationsList;
