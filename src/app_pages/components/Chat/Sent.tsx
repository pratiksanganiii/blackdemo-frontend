import React from "react";
import { ChatHistoryInterface } from "../../../store/chat/ChatTypes";

const Sent = ({ data }: { data: ChatHistoryInterface }) => {
  return (
    <div style={{ width: "100%" }}>
      <span style={{ maxWidth: "60%", float: "right" }}>{data.message}</span>
    </div>
  );
};

export default Sent;
