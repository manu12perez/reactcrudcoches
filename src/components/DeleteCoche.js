import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import loading from "./../assets/images/loading.jpg";
import { NavLink, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default class DeleteCoche extends Component {
  state = {
    status: false,
    completado: false,
    coche: null,
  };

  findCoche = () => {
    let request = "api/coches/findCoche/" + this.props.id;
    let url = Global.urlApiCoches + request;

    axios.get(url).then((response) => {
      console.log("Detalles del coche");
      this.setState({
        status: true,
        coche: response.data
      });
    });
  };

  componentDidMount = () => {
    this.findCoche();
  };

  deleteCoche = () => {
    // Mostrar alerta de confirmación antes de eliminar
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
      cancelButtonText: "No, ¡cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        let id = this.props.id;
        let request = "api/coches/deletecoche/" + id;
        let url = Global.urlApiCoches + request;

        // Si se confirma, realiza la eliminación
        axios.delete(url).then((response) => {
          console.log("Eliminado " + id);
          this.setState({
            completado: true,
          });

          // Mostrar alerta de éxito
          Swal.fire({
            title: "¡Eliminado!",
            text: "El coche ha sido eliminado.",
            icon: "success",
          });
        });
      }
    });
  };

  render() {
    if (this.state.completado === true) {
      return <Navigate to="/" />;
    }
    return (
      <div>
        <h1>Eliminar Coche</h1>
        <NavLink to="/" className="btn btn-secondary">
          Volver
        </NavLink>
        {this.state.status === true ? (
          <div>
            <ul className="list-group-item">
              {this.state.coche && (
                  <div>
                    <li className="list-group-item">Id: {this.props.id}</li>
                    <li className="list-group-item">
                      Marca: {this.state.coche.marca}
                    </li>
                    <li className="list-group-item">
                      Modelo: {this.state.coche.modelo}
                    </li>
                    <li className="list-group-item">
                      Conductor: {this.state.coche.conductor}
                    </li>
                    <li className="list-group-item">
                      Imagen:{" "}
                      <img
                        src={this.state.coche.imagen}
                        style={{ height: "200px", width: "200px" }}
                        alt="imagenCoche"
                      />
                    </li>
                  </div>
                )}
            </ul>
            <button className="btn btn-dark" onClick={this.deleteCoche}>
              Eliminar Coche
            </button>
          </div>
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
