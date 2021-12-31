import * as React from "react";
import { SocketContext } from "../context/socketContext";

export default function Band() {
  const [newBand, setNewBand] = React.useState("");
  const { socket } = React.useContext(SocketContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (newBand.length === 0) return;
    socket.emit("addBand", { name: newBand });
  };

  const handleChange = (e) => {
    setNewBand(e.target.value.trim());
  };
  return (
    <>
      <h3>Agregar banda</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Nuevo banda"
            onChange={handleChange}
          ></input>
        </div>
      </form>
    </>
  );
}
