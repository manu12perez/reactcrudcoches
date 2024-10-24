import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import loading from "./../assets/images/loading.jpg";
import { NavLink } from "react-router-dom";

export default class DetalleCoche extends Component {
  state = {
    coche: null,
  };

  findCoche = () => {
    let request = "api/coches/findCoche/" + this.props.id;
    let url = Global.urlApiCoches + request;

    axios.get(url).then((response) => {
      console.log("Detalles del coche");
      this.setState({
        coche: response.data,
      });
    });
  };

  componentDidMount = () => {
    this.findCoche();
  };

  render() {
    return (
      <div>
        <NavLink to="/" className="btn btn-secondary">
          Volver
        </NavLink>
        <h1> Detalle del Coche</h1>
        {this.state.coche ? (
          <table className="table table-border">
            <thead>
              <tr>
                <th>Id</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Conductor</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.id}</td>
                <td>{this.state.coche.marca}</td>
                <td>{this.state.coche.modelo}</td>
                <td>{this.state.coche.conductor}</td>
                <td>
                  <img
                    src={this.state.coche.imagen}
                    style={{ height: "200px", width: "200px" }}
                    alt="imagenCoche"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <img
            src={loading}
            style={{
              display: "block",
              margin: "0 auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>
    );
  }
}
