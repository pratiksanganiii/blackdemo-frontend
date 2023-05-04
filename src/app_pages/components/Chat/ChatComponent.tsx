import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatBar from "./ChatBar";
import { useDispatch, useSelector } from "react-redux";
import {
  createChatConnection,
  getRecentChats,
} from "../../../store/chat/chatSlice";
import { Socket } from "socket.io-client";
import {
  ActiveUserType,
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../store/chat/ChatTypes";
import { message } from "antd";

const ChatComponent = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { chats } = useSelector((state: any) => state.chat);
  const {
    socket,
  }: { socket: Socket<ServerToClientEvents, ClientToServerEvents> } =
    useSelector((state: any) => state.chat);
  const dispatch: any = useDispatch();
  const [sendTo, setSendTo] = useState<ActiveUserType | undefined>();
  const [activeUsers, setActiveUsers] = useState<ActiveUserType[]>([]);

  useEffect(() => {
    console.log("chats", chats);
  }, [chats]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getRecentChats(user._id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (process.env.REACT_APP_API_URL && user && !socket) {
      dispatch(createChatConnection(user._id));
    } else {
      if (socket) {
        socket.on("chatMessageFromServer", ({ message, userId }) => {
          if (sendTo?.userId !== userId) {
            setActiveUsers((old) => {
              return old
                .map((unActive) => {
                  unActive.userId !== userId && unActive.unseenCount++;
                  return unActive;
                })
                .sort((a, b) => b.unseenCount - a.unseenCount);
            });
          }
        });
      }
    }
  }, [user, dispatch, socket, sendTo]);

  useEffect(() => {
    if (socket) {
      socket.on("users", (users) => {
        setActiveUsers(
          users.map((old) => {
            old.unseenCount = 0;
            return old;
          })
        );
      });
      socket.on("userConnected", ({ userId, socketId, email }) => {
        message.info(`${email} Online`);
        setActiveUsers((old) => {
          if (old.findIndex((user) => user.socketId === socketId) === -1) {
            return [...old, { userId, socketId, unseenCount: 0, email }];
          }
          return old;
        });
      });
      socket.on("userDisconnected", ({ userId }) => {
        setActiveUsers((old) => {
          const newU = old.filter((user) => {
            return user.userId !== userId;
          });
          return [...newU];
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (activeUsers.length) {
      const current = activeUsers.find(
        (actives) => actives.userId === sendTo?.userId
      );
      if (current) {
        setSendTo(current);
      } else {
        setSendTo(activeUsers[0]);
      }
    } else {
      setSendTo(undefined);
    }
  }, [activeUsers, sendTo?.userId]);

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
      <Sidebar
        activeUsers={activeUsers}
        sendTo={sendTo}
        setSendTo={setSendTo}
      />
      {sendTo?.socketId ? <ChatBar sendTo={sendTo} /> : ""}
    </div>
  );
};

export default ChatComponent;
