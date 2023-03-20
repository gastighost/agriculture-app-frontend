import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store/store";
import { fetchFarm } from "../../store/farms";
import FarmDetails from "../../components/farms/FarmDetails";

const FarmPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const { farmId } = router.query;

    if (router.isReady) {
      dispatch(fetchFarm(farmId as string));
    }
  }, [router, dispatch]);

  return <FarmDetails />;
};

export default FarmPage;
