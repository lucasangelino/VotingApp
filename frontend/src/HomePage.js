import * as React from "react";

// Components
import BandList from "./components/BandList";
import Band from "./components/Band";

// Socket
import { SocketContext } from "./context/socketContext";

function HomePage() {
  // const [bands, setBands] = React.useState([]);
  const { online } = React.useContext(SocketContext);

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
          <BandList />
        </div>
        <div className="col-4">
          <Band />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
