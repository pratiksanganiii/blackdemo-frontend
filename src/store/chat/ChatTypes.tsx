export type ActiveUserType = { socketId: string; userId: string };

export interface ClientToServerEvents {
  chatMessageFromClient: (payload: { sendTo: string; message: string }) => void;
  userDisconnected: (userId: string) => void;
  userConnected: (payload: { userId: string; socketId: string }) => void;
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
  }: {
    userId: string;
    socketId: string;
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
  chats: any[];
  error: any;
}

export interface ChatHistoryInterface {
  type: "sent" | "received";
  message: string;
}
