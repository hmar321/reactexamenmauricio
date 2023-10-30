import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Serie from './Serie';
import Home from './Home';
import Menu from './Menu';
import Personajes from './Personajes';
import ModificarPersonajes from './ModificarPersonajes';
import NuevoPersonaje from './NuevoPersonaje';

export default class Router extends Component {
    render() {
        function SerieElement() {
            var {idserie}=useParams();
            return (<Serie idserie={idserie}/>)
        }
        function PersonajesElement() {
            var {idserie}=useParams();
            return (<Personajes idserie={idserie}/>)
        }
        return (
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/nuevopersonaje' element={<NuevoPersonaje />} />
                    <Route path='/modificarpersonajes' element={<ModificarPersonajes />} />
                    <Route path='/serie/:idserie' element={<SerieElement />} />
                    <Route path='/personajes/:idserie' element={<PersonajesElement />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
