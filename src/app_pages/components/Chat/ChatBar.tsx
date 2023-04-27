import React, { useEffect, useState } from "react";
import Sent from "./Sent";
import Received from "./Received";
import { Input } from "antd";
import { useSelector } from "react-redux";
import {
  ActiveUserType,
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../store/chat/ChatTypes";
import { Socket } from "socket.io-client";

const ChatBar = ({ sendTo }: { sendTo: ActiveUserType | undefined }) => {
  // const { user } = useSelector((state: any) => state.auth);
  const [message, setMessage] = useState("");
  const {
    socket,
  }: { socket: Socket<ServerToClientEvents, ClientToServerEvents> } =
    useSelector((state: any) => state.chat);

  useEffect(() => {
    socket.on("chatMessageFromServer", ({ from, message, userId }) => {
      //
    });
    const chatLog = document.getElementById("chatLog")
    if(chatLog){
      chatLog.scrollTo({top:chatLog.scrollHeight})
    }
  }, [socket]);

  return (
    <div style={{ width: "75%", padding: "5px" }}>
      <header style={{ height: "5%" }}>{sendTo?.userId}</header>
      <div
        id="chatLog"
        style={{
          height: "90%",
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        <Sent />
        <Received />
        <Sent />
        <Received />
        <Sent />
        <Received />
        <Sent />
        <Received />
        <Sent />
        <Received />
        <Sent />
        <Received />
      </div>
      {socket ? (
        <div style={{ height: "5%" }}>
          <Input
            onPressEnter={() => {
              if (sendTo?.socketId && message) {
                socket.emit("chatMessageFromClient", {
                  sendTo: sendTo?.socketId,
                  message,
                });
                setMessage("");
              }
            }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Type a message"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChatBar;
