import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLocations } from "../../store/locations";
import { AppDispatch, RootState } from "../../store/store";
import CreateLocation from "./CreateLocation";
import Location from "./Location";
import LocationSearchbar from "./LocationSearchbar";

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
    <div className="bg-white container mx-auto pt-4">
      <LocationSearchbar setCreateLocationModal={setCreateLocationModal} />

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
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
