import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatComponent from "./components/Chat/ChatComponent";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div>
      <ChatComponent />
    </div>
  );
};

export default Dashboard;
