import * as React from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = React.createContext();
SocketContext.displayName = "SocketContext";

export const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket({ serverUrl: `http://localhost:8080/` });
  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
