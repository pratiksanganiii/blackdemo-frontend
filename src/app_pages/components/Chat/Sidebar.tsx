import React, { Dispatch, SetStateAction, useState } from "react";
import User from "./User";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import {
  ActiveUserType,
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../store/chat/ChatTypes";

const Sidebar = ({
  setSendTo,
  sendTo,
}: {
  setSendTo: Dispatch<SetStateAction<ActiveUserType | undefined>>;
  sendTo: ActiveUserType | undefined;
}) => {
  const {
    socket,
  }: { socket: Socket<ServerToClientEvents, ClientToServerEvents> } =
    useSelector((state: any) => state.chat);
  const { user } = useSelector((state: any) => state.auth);
  const [activeUsers, setActiveUsers] = useState<ActiveUserType[]>([]);

  if (socket) {
    socket.on("users", (users) => {
      setActiveUsers(users);
    });
  }

  return (
    <div
      style={{ width: "25%", padding: "5px", borderRight: "1px solid grey" }}
    >
      <span>{user?.email}</span>
      <div id="chatUserList">
        {activeUsers.map((activeUser) => (
          <User
            isSelected={
              sendTo ? activeUser.socketId === sendTo?.socketId : false
            }
            setSendTo={setSendTo}
            key={activeUser.userId}
            activeUser={activeUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;