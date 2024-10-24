import React, { Component } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import MenuCoches from "./MenuCoches";
import HomeCoches from "./HomeCoches";
import CreateCoche from "./CreateCoche";
import DetalleCoche from "./DetalleCoche";
import UpdateCoche from "./UpdateCoche";
import DeleteCoche from "./DeleteCoche";

export default class Router extends Component {

  render() {
    
  function DetalleCocheElement () {
    let {idCoche} = useParams();
    return (
      <DetalleCoche id={idCoche} />
    )
  }

  function UpdateCocheElement () {
    let {idCoche} = useParams();
    return(
      <UpdateCoche id={idCoche}/>
    )
  }

  function DeleteCocheElement() {
    let {idCoche} = useParams();
    return (
        <DeleteCoche id={idCoche} />
    )
}

    return( 
    <BrowserRouter>
        <MenuCoches />
        <Routes>
            <Route path="/" element={<HomeCoches />} />
            <Route path="/create" element={<CreateCoche />} />
            <Route path="/detalle/:idCoche" element={<DetalleCocheElement />} />
            <Route path="/update/:idCoche" element={<UpdateCocheElement />} />
            <Route path="/delete/:idCoche" element={<DeleteCocheElement />} />
        </Routes>
    </BrowserRouter>
    )
  }
}
