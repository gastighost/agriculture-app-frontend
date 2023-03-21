import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

import { AppDispatch, RootState } from "../../store/store";
import { selectChatUser } from "../../store/users";
import ChatPopup from "../chat/ChatPopup";

const UsersList = () => {
  const { otherUsers, activeChatUser, user } = useSelector(
    (store: RootState) => store.users
  );
  const dispatch = useDispatch<AppDispatch>();

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string);
    setSocket(socket);

    if (socket && user) {
      socket.on(
        user.id,
        ({ senderId, username }: { senderId: string; username: string }) => {
          dispatch(selectChatUser({ username, id: senderId }));
        }
      );
    }
  }, [dispatch, user]);

  const handleMouseEnter = (userId: string) => {
    setSelectedUser(userId);
  };

  const handleMouseLeave = () => {
    setSelectedUser("");
  };

  const activateChat = (recipientUser: any) => {
    if (socket && user) {
      socket.emit("message", {
        id: recipientUser.id,
        senderId: user.id,
        username: user.username,
      });
    }
    dispatch(selectChatUser(recipientUser));
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
