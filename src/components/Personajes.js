import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

export default class Personajes extends Component {
    state = {
        personajes: [],
        status: false
    }
    cargarPersonajes = () => {
        var id = this.props.idserie;
        var request = "api/series/personajesserie/" + id;
        var url = Global.urlApiSeries + request;
        axios.get(url).then(res => {
            this.setState({
                personajes: res.data,
                status: true
            });
        });
    }
    componentDidMount = () => {
        this.cargarPersonajes();
    }
    render() {
        return (
            <div className='container'>
                <h1>Personajes {this.props.idserie}</h1>
                <NavLink to={"/serie/" + this.props.idserie} className='mb-3 btn btn-danger'>Volver</NavLink>
                {
                    this.state.status === true &&
                    (
                        <table className='table table-dark table-striped'>
                            <thead>
                                <tr>
                                    <th>Personaje</th>
                                    <th>Imagen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.personajes.map((personaje,index)=>{
                                        return (
                                            <tr>
                                                <td>{personaje.nombre}</td>
                                                <td><img src={personaje.imagen} style={{"width":"150px","height":"150px"}}/></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        )
    }
}
