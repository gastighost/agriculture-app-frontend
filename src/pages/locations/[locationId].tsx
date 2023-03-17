import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import api from "../../common/api";
import Location from "../../components/locations/Location";

const LocationPage = () => {
  const router = useRouter();
  const [location, setLocation] = useState<any>({});

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await api.getLocation(
          router.query.locationId as string
        );

        setLocation(response.data.location);
      } catch (error) {
        toast.error("Failed!");
      }
    };

    if (router.isReady) {
      getLocation();
    }
  }, [router]);

  return <Location currentLocation={location} />;
};

export default LocationPage;
