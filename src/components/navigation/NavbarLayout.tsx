import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { AppDispatch } from "../../store/store";

import Navbar from "./Navbar";
import { fetchUser } from "../../store/users";

const NavbarLayout = ({ children }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (router.pathname !== "/login" && router.pathname !== "/") {
      dispatch(fetchUser());
    }
  }, [dispatch, router]);

  return (
    <div>
      <Navbar />
      <div className="mt-16">{children}</div>
    </div>
  );
};

export default NavbarLayout;
