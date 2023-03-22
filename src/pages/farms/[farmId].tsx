import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store/store";
import { fetchFarm } from "../../store/farms";
import FarmDetails from "../../components/farms/FarmDetails";
import { fetchCrops } from "../../store/crops";

const FarmPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const { farmId } = router.query;

    if (router.isReady && farmId) {
      dispatch(fetchFarm(farmId as string));
      dispatch(fetchCrops({ farmId: farmId as string }));
    }
  }, [router, dispatch]);

  return <FarmDetails />;
};

export default FarmPage;
