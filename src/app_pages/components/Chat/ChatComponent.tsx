import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatBar from "./ChatBar";
import { useDispatch, useSelector } from "react-redux";
import { createChatConnection } from "../../../store/chat/chatSlice";
import { Socket } from "socket.io-client";
import {
  ActiveUserType, 
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../store/chat/ChatTypes";

const ChatComponent = () => {
  const { user } = useSelector((state: any) => state.auth);
  const {
    socket,
  }: { socket: Socket<ServerToClientEvents, ClientToServerEvents> } =
    useSelector((state: any) => state.chat);
  const dispatch: any = useDispatch();
  const [sendTo, setSendTo] = useState<ActiveUserType | undefined>();

  useEffect(() => {
    if (process.env.REACT_APP_API_URL && user && !socket) {
      dispatch(createChatConnection(user.email));
    }
  }, [user, dispatch, socket]);

  return (
    <div
      style={{
        width: "60vw",
        height: "80vh",
        margin: "auto",
        marginTop: "10vh",
        backgroundColor: "#69c0ff",
        border: "5px solid #69c0ff",
        borderRadius: "15px",
        display: "flex",
      }}
    >
      <Sidebar sendTo={sendTo} setSendTo={setSendTo} />
      {sendTo?.socketId ? <ChatBar sendTo={sendTo} /> : ""}
    </div>
  );
};

export default ChatComponent;
