import React, { Dispatch, SetStateAction } from "react";
import User from "./User";
import { useSelector } from "react-redux";
import { ActiveUserType } from "../../../store/chat/ChatTypes";

const Sidebar = ({ 
  setSendTo,
  sendTo,
  activeUsers,
}: {
  setSendTo: Dispatch<SetStateAction<ActiveUserType | undefined>>;
  sendTo: ActiveUserType | undefined;
  activeUsers: ActiveUserType[];
}) => {
  const { user } = useSelector((state: any) => state.auth);

  // useEffect(() => {
  //   setSendTo((prev) => {
  //     if (prev) {
  //       return activeUsers.find((user) => user.userId === prev.userId);
  //     }
  //     return undefined;
  //   });
  // }, [activeUsers, setSendTo]);

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
