import axios from "axios";
import { io } from "socket.io-client";

const createChatConnection = (userId: string) => {
  if (process.env.REACT_APP_API_URL) {
    const socket = io(process.env.REACT_APP_API_URL, {
      autoConnect: false,
    });
    socket.auth = { userId };
    socket.connect();
    return socket;
  } else {
    throw new Error("Connection failed.");
  }
};

const sendMessage = async (payload: {
  from: string;
  to: string;
  message: string;
}) => {
  return await axios.post("chat/save", payload);
};

const chatActions = {
  createChatConnection,
  sendMessage,
};
export default chatActions;
