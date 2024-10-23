import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import loading from './../assets/images/loading.jpg'
import { NavLink } from "react-router-dom";

export default class HomeCoches extends Component {
  state = {
    status: false,
    coches: [],
  };

  loadCoches = () => {
    let request = "api/coches";
    let url = Global.urlApiCoches + request;

    axios.get(url).then((response) => {
      console.log("Leyendo coches");
      this.setState({
        coches: response.data,
        status: true,
      });
    });
  };

  componentDidMount = () => {
    this.loadCoches();
  };

  render() {
    if (this.state.status == false) {
      return (
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
      );
    } else {
      return (
        <div>
          <h1>Home Coches</h1>
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
              {this.state.coches.map((coche, index) => {
                return (
                  <tr key={index}>
                    <td>{coche.idCoche}</td>
                    <td>{coche.marca}</td>
                    <td>{coche.modelo}</td>
                    <td>{coche.conductor}</td>
                    <td>
                      <img
                        src={coche.imagen}
                        style={{ height: "200px", width: "200px" }}
                        alt="imagenCoche"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
