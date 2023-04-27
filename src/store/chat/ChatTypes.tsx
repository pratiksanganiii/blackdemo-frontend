export type ActiveUserType = { socketId: string; userId: string };

export interface ClientToServerEvents {
  chatMessageFromClient: (payload: { sendTo: string; message: string }) => void;
  userDisconnected: (userId: string) => void;
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
}
export interface ChatStateInterface {
  socket?: any;
  loading: boolean;
  chats: any[];
  error: any;
}
