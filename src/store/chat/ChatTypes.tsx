export type ActiveUserType = {
  socketId: string;
  userId: string;
  unseenCount: number;
  email?: string;
};

export interface ClientToServerEvents {
  chatMessageFromClient: (
    payload: { sendTo: string; message: string; from: string; to: string },
    callback: (res: any) => void
  ) => void;
  userDisconnected: (userId: string) => void;
  userConnected: (payload: {
    userId: string;
    socketId: string;
    email?: string;
  }) => void;
  userTypingStatus: (payload: {
    isTyping: boolean;
    from: string;
    to: string;
  }) => void;
}

export interface ServerToClientEvents {
  sent: () => void;
  users: (activeUsers: ActiveUserType[]) => void;
  chatMessageFromServer: ({
    from,
    message,
    userId,
  }: {
    from: string;
    message: string;
    userId: string;
  }) => void;
  userConnected: ({
    userId,
    socketId,
    email
  }: {
    userId: string;
    socketId: string;
    email?:string
  }) => void;
  userDisconnected: ({
    userId,
    socketId,
  }: {
    userId: string;
    socketId: string;
  }) => void;
}
export interface ChatStateInterface {
  socket?: any;
  loading: boolean;
  chats: any;
  error: any;
}

export interface ChatHistoryInterface {
  type: "sent" | "received";
  message: string;
}
