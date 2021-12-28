import * as React from "react";

export default function BandList({ data, vote, removeBand, handleChangeName }) {
  const [bands, setBands] = React.useState(data);

  React.useEffect(() => {
    setBands(data);
  }, [data]);

  const handleChange = (e, id) => {
    const newName = e.target.value;
    setBands(
      bands.map((band) => (band.id === id ? { ...band, name: newName } : band))
    );
  };

  const onLostFocus = (e, id) => {
    const newName = e.target.value;
    handleChangeName(id, newName);
  };

  function createRow({ id, name, votes }) {
    return (
      <tr key={id}>
        <td>
          <button className="btn btn-primary" onClick={() => vote(id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={name}
            onChange={(e) => handleChange(e, id)}
            onBlur={(e) => onLostFocus(e, id)}
          />
        </td>
        <td>
          <h3>{votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => removeBand(id)}>
            Borrar
          </button>
        </td>
      </tr>
    );
  }

  return (
    <>
      <h3>Bandas</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{bands.map((band) => createRow(band))}</tbody>
      </table>
    </>
  );
}
