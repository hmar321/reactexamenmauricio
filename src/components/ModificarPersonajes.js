import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class ModificarPersonajes extends Component {
    cajaSerie = React.createRef();
    cajaPersonaje = React.createRef();

    state = {
        series: [],
        statusSer: false,
        personajes: [],
        statusPer: false,
        serie: null,
        personaje: null,
        statusMod: false
    }

    cargarSeries = () => {
        var request = "api/series";
        var url = Global.urlApiSeries + request;
        axios.get(url).then(res => {
            this.setState({
                series: res.data,
                statusSer: true
            });
        });
    }

    cargarPersonajes = () => {
        var request = "api/personajes";
        var url = Global.urlApiSeries + request;
        axios.get(url).then(res => {
            this.setState({
                personajes: res.data,
                statusPer: true
            });
        });
    }

    componentDidMount = () => {
        this.cargarSeries();
        this.cargarPersonajes();
    }

    selectSerie = (e) => {
        e.preventDefault();
        var idserie = parseInt(this.cajaSerie.current.value);
        for (var serie of this.state.series) {
            if (serie.idSerie === idserie) {
                this.setState({
                    serie: serie
                });
            }
        }
    }
    selectPersonaje = (e) => {
        e.preventDefault();
        var idpersonaje = parseInt(this.cajaPersonaje.current.value); for (var personaje of this.state.personajes) {
            if (personaje.idPersonaje === idpersonaje) {
                this.setState({
                    personaje: personaje
                });
            }
        }
    }

    addPersonaje = (e) => {
        e.preventDefault();
        var idser = parseInt(this.cajaSerie.current.value);
        var idper = parseInt(this.cajaPersonaje.current.value);
        if (idser === -1) {
            alert("No se ha seleccionado serie");
            return;
        }
        if (idper === -1) {
            alert("No se ha seleccionado personaje");
            return;
        }
        var request = "api/personajes/" + idper + "/" + idser;
        var url = Global.urlApiSeries + request;
        axios.put(url).then(res => {
            this.setState({
                statusMod: true
            })
        });
    }

    render() {
        return (
            <div className='container'>
                {
                    this.state.statusMod===true&&
                    (<Navigate to={"/personajes/"+this.state.serie.idSerie}/>)
                }
                <h1>Modificar Personajes</h1>
                <form>
                    <div className='mb-3' style={{ width: "18rem" }}>
                        {
                            this.state.statusSer === true &&
                            (
                                <select onChange={this.selectSerie} ref={this.cajaSerie} className='form-select'>
                                    <option value="-1" hidden>Selecciona una serie</option>
                                    {
                                        this.state.statusSer === true &&
                                        (
                                            this.state.series.map((serie, index) => {
                                                return (
                                                    <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                                                )
                                            })
                                        )
                                    }
                                </select>
                            )
                        }
                    </div>
                    <div className='mb-3' style={{ width: "18rem" }}>
                        {
                            this.state.statusPer === true &&
                            (
                                <select onChange={this.selectPersonaje} ref={this.cajaPersonaje} className='form-select'>
                                    <option value="-1" hidden>Selecciona una serie</option>
                                    {
                                        this.state.statusPer === true &&
                                        (
                                            this.state.personajes.map((personaje, index) => {
                                                return (
                                                    <option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>
                                                )
                                            })
                                        )
                                    }
                                </select>
                            )
                        }
                    </div>
                    {
                        (this.state.statusSer === true && this.state.statusPer === true) &&
                        (
                            <button onClick={this.addPersonaje} className='btn btn-success'>Añadir personaje</button>
                        )
                    }
                </form>
                {
                    this.state.serie != null &&
                    (
                        <div className='mb-2'>
                            <h1>{this.state.serie.nombre}</h1>
                            <img className='rounded' style={{ width: "20rem", height: "15rem" }} src={this.state.serie.imagen} />
                        </div>
                    )
                }
                {
                    this.state.personaje != null &&
                    (
                        <div className='mb-2'>
                            <h1>{this.state.personaje.nombre}</h1>
                            <img className='rounded' style={{ width: "20rem", height: "15rem" }} src={this.state.personaje.imagen} />
                        </div>
                    )
                }
            </div>
        )
    }
}
