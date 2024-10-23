import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import { Navigate } from "react-router-dom";

export default class CreateCoche extends Component {
  cajaId = React.createRef();
  cajaMarca = React.createRef();
  cajaModelo = React.createRef();
  cajaConductor = React.createRef();
  cajaImagen = React.createRef();

  state = {
    status: false,
  }

  insertarCoche = (e) => {
    e.preventDefault();

    let id = parseInt(this.cajaId.current.value);
    let marca = this.cajaMarca.current.value;
    let modelo = this.cajaModelo.current.value;
    let conductor = this.cajaConductor.current.value;
    let imagen = this.cajaImagen.current.value;

    let coche = {
        idCoche: id,
        marca: marca,
        modelo: modelo,
        conductor: conductor,
        imagen: imagen
    }

    let request = "api/coches/insertCoche";
    let url = Global.urlApiCoches + request;

    axios.post(url, coche).then(response => {
        console.log("Coche insertado")
        this.setState({
            status: true,
        })
    })
  }

  render() {
    if (this.state.status == true) {
        return(
            <Navigate to="/" />
        )
    } else {
      return (
        <div>
          <h1>Nuevo Coche</h1>
          <form>
            <label>Id coche</label>
            <input type="text" ref={this.cajaId} className="form-control" />
            <label>Marca</label>
            <input type="text" ref={this.cajaMarca} className="form-control" />
            <label>Modelo</label>
            <input type="text" ref={this.cajaModelo} className="form-control" />
            <label>Conductor</label>
            <input type="text" ref={this.cajaConductor} className="form-control" />
            <label>Imagen</label>
            <input type="text" ref={this.cajaImagen} className="form-control" />
            <button onClick={this.insertarCoche} className="btn btn-info">Insertar coche</button>
          </form>
        </div>
      );
    }
  }
}
