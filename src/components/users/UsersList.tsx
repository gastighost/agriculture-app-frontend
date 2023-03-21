import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import { selectChatUser } from "../../store/users";
import ChatPopup from "../chat/ChatPopup";

const UsersList = () => {
  const { otherUsers, activeChatUser } = useSelector(
    (store: RootState) => store.users
  );
  const dispatch = useDispatch<AppDispatch>();

  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleMouseEnter = (userId: string) => {
    setSelectedUser(userId);
  };

  const handleMouseLeave = () => {
    setSelectedUser("");
  };

  const activateChat = (user: any) => {
    dispatch(selectChatUser(user));
  };

  const deactivateChat = () => {
    dispatch(selectChatUser(null));
    setSelectedUser("");
  };

  return (
    <div className="container mx-auto my-10">
      <Head>
        <title>Other Users</title>
      </Head>
      <h1 className="mt-2 py-4 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
        Chat with another user
      </h1>
      <ul className="flex flex-wrap">
        {otherUsers.map((user) => (
          <li
            key={user.id}
            className="h-48 m-4 py-4 flex flex-col justify-center items-center bg-gray-200 hover:bg-green-400 rounded-md"
            onMouseEnter={() => handleMouseEnter(user.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              className="rounded-full w-40 h-10"
              src={`https://avatars.dicebear.com/api/avataaars/${user.username}.svg`}
              alt={`${user.username}'s avatar`}
              width={150}
              height={150}
            />
            <span className="mt-4 text-lg text-center font-medium text-gray-900">
              {user.username}
            </span>
            {selectedUser === user.id && (
              <button
                onClick={() => activateChat(user)}
                className="rounded bg-blue-500 hover:bg-blue-600 px-3 py-1 text-white text-sm"
              >
                Open chat
              </button>
            )}
            {user.id === activeChatUser?.id && (
              <ChatPopup userId={activeChatUser.id} onClose={deactivateChat} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
