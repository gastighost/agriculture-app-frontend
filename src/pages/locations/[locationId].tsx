import { useRouter } from "next/router";

import Location from "../../components/locations/Location";

const LocationPage = () => {
  const router = useRouter();

  const { locationId } = router.query;

  return <Location locationId={locationId as string} />;
};

export default LocationPage;
