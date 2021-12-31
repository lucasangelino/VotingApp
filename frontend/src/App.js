import * as React from "react";

// Components
import Band from "./components/Band";
import BandList from "./components/BandList";
import { useSocket } from "./hooks/useSocket";


function App() {

  const [bands, setBands] = React.useState([]);
  const {socket, online} = useSocket({
    serverUrl: `http://localhost:8080/`
  });

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
