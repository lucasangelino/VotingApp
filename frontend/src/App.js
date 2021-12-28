import * as React from "react";
import io from "socket.io-client";

// Components
import Band from "./components/Band";
import BandList from "./components/BandList";

const connectSocketServer = () => {
  const socket = io("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket, setSocket] = React.useState(() => connectSocketServer());
  const [online, setOnline] = React.useState(true);
  const [bands, setBands] = React.useState([]);

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

  React.useEffect(() => {
    socket.on("bandList", (bands) => {
      setBands(bands);
    });
    return () => socket.disconnect();
  }, [socket]);

  const vote = (id) => {
    socket.emit("vote", id);
  };

  const removeBand = (id) => {
    socket.emit("removeBand", id);
  };

  const handleChangeName = (id, name) => {
    socket.emit("changeName", { id, name });
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success m-2">Online</span>
          ) : (
            <span className="text-danger m-2">Offline</span>
          )}
        </p>
      </div>
      <h1>Votos</h1>

      <hr />
      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            vote={vote}
            removeBand={removeBand}
            handleChangeName={handleChangeName}
          />
        </div>
        <div className="col-4">
          <Band />
        </div>
      </div>
    </div>
  );
}

export default App;
