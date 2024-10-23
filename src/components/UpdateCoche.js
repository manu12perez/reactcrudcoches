import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import { Navigate, NavLink } from "react-router-dom";

export default class UpdateCoche extends Component {
  cajaId = React.createRef();
  cajaMarca = React.createRef();
  cajaModelo = React.createRef();
  cajaConductor = React.createRef();
  cajaImagen = React.createRef();

  state = {
    status: false,
    datosCoche: [],
  };

  findCoche = () => {
    let request = "api/coches/findCoche/" + this.props.id;
    let url = Global.urlApiCoches + request;

    axios.get(url).then((response) => {
      console.log("Detalles del coche");
      this.setState({
        datosCoche: response.data,
      });
    });
  };

  updateCoche = (e) => {
    e.preventDefault();
    let coche = this.state.datosCoche;

    coche.id = parseInt(this.cajaId.current.value);
    coche.marca = this.cajaMarca.current.value;
    coche.modelo = this.cajaModelo.current.value;
    coche.conductor = this.cajaConductor.current.value;
    coche.imagen = this.cajaImagen.current.value;

    let request = "api/coches/updatecoche";
    let url = Global.urlApiCoches + request;
    axios.put(url, coche).then((response) => {
      console.log("Coche actualizado");
      this.setState({
        status: true,
      });
    });
  };

  componentDidMount = () => {
    this.findCoche();
  };

  render() {
    return (
      <div>
        {this.state.status == true && <Navigate to="/" />}
        <h1>Modificar Coche</h1>
        <NavLink to="/" className="btn btn-secondary">
          Volver
        </NavLink>
        {/* Si this.state.coche es false, null, o undefined, la negación !this.state.coche será true, y el formulario será renderizado. */}
        {!this.state.coche && (
          <form>
            <label>Id departamento</label>
            <input
              type="text"
              ref={this.cajaId}
              defaultValue={this.props.id}
              className="form-control"
              disabled
            />
            <label>Marca</label>
            <input
              type="text"
              ref={this.cajaMarca}
              defaultValue={this.state.datosCoche.marca}
              className="form-control"
            />
            <label>Modelo</label>
            <input
              type="text"
              ref={this.cajaModelo}
              defaultValue={this.state.datosCoche.modelo}
              className="form-control"
            />
            <label>Conductor</label>
            <input
              type="text"
              ref={this.cajaConductor}
              defaultValue={this.state.datosCoche.conductor}
              className="form-control"
            />
            <label>Imagen</label>
            <input
              type="text"
              ref={this.cajaImagen}
              defaultValue={this.state.datosCoche.imagen}
              className="form-control"
            />
            <br />
            <button className="btn btn-success" onClick={this.updateCoche}>
              Modificar coche
            </button>
          </form>
        )}
      </div>
    );
  }
}
