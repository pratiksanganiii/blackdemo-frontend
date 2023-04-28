import React from "react";
import { ChatHistoryInterface } from "../../../store/chat/ChatTypes";

const Received = ({ data }: { data: ChatHistoryInterface }) => {
  return (
    <div style={{ maxWidth: "80%", float: "left", margin: "5px" }}>
      {data.message}
    </div>
  );
};

export default Received;
