import React, { useEffect, useState } from "react";
import Sent from "./Sent";
import Received from "./Received";
import { Input } from "antd";
import { useSelector } from "react-redux";
import {
  ActiveUserType,
  ChatHistoryInterface,
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../store/chat/ChatTypes";
import { Socket } from "socket.io-client";

const ChatBar = ({ sendTo }: { sendTo: ActiveUserType | undefined }) => {
  // const { user } = useSelector((state: any) => state.auth);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistoryInterface[]>([]);

  const { user } = useSelector((state: any) => state.auth);
  const {
    socket,
  }: { socket: Socket<ServerToClientEvents, ClientToServerEvents> } =
    useSelector((state: any) => state.chat);
  // const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    socket.on("chatMessageFromServer", ({ message, userId }) => {
      setChatHistory((chat) => {
        return [...chat, { type: "received", message }];
      });
    });
    const chatLog = document.getElementById("chatLog");
    if (chatLog) {
      chatLog.scrollTo({ top: chatLog.scrollHeight });
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        {chatHistory.map((chat, id) =>
          chat.type === "sent" ? (
            <Sent key={id} data={chat} />
          ) : (
            <Received key={id} data={chat} />
          )
        )}
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
                setChatHistory((chats) => {
                  return [...chats, { type: "sent", message }];
                });
                setMessage("");
              }
            }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              socket.emit("userTypingStatus", {
                isTyping: true,
                from: user._id,
                to: sendTo?.userId ?? "",
              });
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
