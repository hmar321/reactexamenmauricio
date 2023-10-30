import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

export default class Menu extends Component {
    state = {
        series: [],
        statusSer: false
    }
    cargaSeries = () => {
        var request = "api/series";
        var url = Global.urlApiSeries + request;
        axios.get(url).then(res => {
            this.setState({
                series: res.data,
                statusSer: true
            })
        })
    }
    componentDidMount = () => {
        this.cargaSeries();
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Cine</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/nuevopersonaje">Nuevo personaje</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/modificarpersonajes">Modificar personajes</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="/serie" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Series
                                </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {/* <li><NavLink className="dropdown-item" to="#">Action</NavLink></li> */}
                                    {
                                        this.state.statusSer===true&&
                                        (
                                            this.state.series.map((serie,index)=>{
                                                return (
                                                    <li key={index}><NavLink className="dropdown-item" to={"/serie/"+serie.idSerie}>{serie.nombre}</NavLink></li>
                                                )
                                            })
                                        )
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
