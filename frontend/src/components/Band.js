import * as React from "react";
import { useSocket } from "../hooks/useSocket";

export default function Band() {
  const [newBand, setNewBand] = React.useState("");
  const { socket } = useSocket({serverUrl: `http://localhost:8080/`})

  const onSubmit = (e) => {
    e.preventDefault();
    if (newBand.length === 0) return;
    socket.emit("addBand", {name: newBand});
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
