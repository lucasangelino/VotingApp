import * as React from "react";

export default function Band({ addBand }) {
  const [newBand, setNewBand] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (newBand.length === 0) return;

    addBand(newBand);
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
