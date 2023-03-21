import { useEffect } from "react";
import { useDispatch } from "react-redux";

import UsersList from "../../components/users/UsersList";
import { AppDispatch } from "../../store/store";
import { fetchOtherUsers } from "../../store/users";

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOtherUsers());
  }, [dispatch]);

  return <UsersList />;
};

export default UsersPage;
