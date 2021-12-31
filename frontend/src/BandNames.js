import React from "react";
import HomePage from "./HomePage";
import { SocketProvider } from "./context/socketContext";

const BandNames = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
};

export default BandNames;
