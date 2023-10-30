import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class NuevoPersonaje extends Component {
    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    cajaSerie = React.createRef();
    state = {
        series: [],
        statusSer: false,
        statusInsert: false,
        idSerie:-1
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

    componentDidMount = () => {
        this.cargarSeries();
    }

    insertarPersonaje = (e) => {
        e.preventDefault();
        var nombre = this.cajaNombre.current.value;
        var imagen = this.cajaImagen.current.value;
        var serie = parseInt(this.cajaSerie.current.value);
        var request = "api/personajes";
        var url = Global.urlApiSeries + request;
        var personaje = {
            idPersonaje: 0,
            nombre: nombre,
            imagen: imagen,
            idSerie: serie
        }
        console.log(personaje);
        console.log(url);
        axios.post(url, personaje).then(res => {
            this.setState({
                statusInsert: true,
                idSerie:serie
            });
        });
    }
    render() {
        return (
            <div className='container'>
                {
                    this.state.statusInsert===true&&
                    (<Navigate to={"/personajes/"+this.state.idSerie}/>)
                }
                <h1>Nuevo Personaje</h1>
                <form>
                    <div className='mb-3' style={{ width: "400px" }}>
                        <label className='form-label'>Nombre</label>
                        <input type='text' ref={this.cajaNombre} className='form-control' placeholder='Nombre' />
                    </div>
                    <div className='mb-3' style={{ width: "400px" }}>
                        <label className='form-label'>Imagen</label>
                        <input type='text' ref={this.cajaImagen} className='form-control' placeholder='Imagen' />
                    </div>
                    {
                        this.state.statusSer === true &&
                        (
                            <div className='mb-3' style={{ width: "400px" }}>
                                <label className='form-label'>Serie</label>
                                <select ref={this.cajaSerie} className='form-select'>
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
                            </div>
                        )
                    }
                    <button onClick={this.insertarPersonaje} className='btn btn-success'>Accion</button>
                </form>
            </div>
        )
    }
}
