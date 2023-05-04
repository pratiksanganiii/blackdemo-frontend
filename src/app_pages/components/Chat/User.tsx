import React, { Dispatch, SetStateAction } from "react";
import { ActiveUserType } from "../../../store/chat/ChatTypes";

const User = ({
  activeUser,
  isSelected,
  setSendTo,
}: {
  isSelected: boolean;
  activeUser: ActiveUserType;
  setSendTo: Dispatch<SetStateAction<ActiveUserType | undefined>>;
}) => {
  return (
    <>
      <div
        id={`chatUser`}
        onClick={() => {
          setSendTo(activeUser);
        }}
        className={`${isSelected ? "chatUserSelected" : ""}`}
      >
        <span>{activeUser.email}</span>
        {activeUser.unseenCount!==0 && <span>{activeUser.unseenCount}</span>}
      </div>
    </>
  );
};

export default User;
