import * as React from 'react';
const io = require('socket.io-client');


export const useSocket = ({serverUrl}) => {
    const [online, setOnline] = React.useState(true);
    const socket = React.useMemo( () => io( serverUrl , {transports: ["websocket"]}), [ serverUrl ]);

    React.useEffect(() => {
        socket.on("connect", () => {
          setOnline(true);
        });
      }, [socket]);
    
      React.useEffect(() => {
        socket.on("disconnect", () => {
          setOnline(false);
        });
        return () => socket.disconnect();
      }, [socket]);


    return {
        socket,
        online
    }
}