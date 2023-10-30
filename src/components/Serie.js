import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Serie extends Component {
    state = {
        serie: {},
        status: false
    }
    cargarSerie = () => {
        var id = this.props.idserie;
        var request = "api/series/" + id;
        var url = Global.urlApiSeries + request;
        axios.get(url).then(res => {
            this.setState({
                serie: res.data,
                status: true
            });
        });
    }
    componentDidMount = () => {
        this.cargarSerie();
    }
    componentDidUpdate = (oldProps) => {
        if (oldProps.idserie != this.props.idserie) {
            this.cargarSerie();
        }
    }
    render() {
        return (
            <div className='container'>
                <h1>Serie {this.props.idserie}</h1>
                {
                    this.state.status === true &&
                    (
                        <div className="card" style={{ "width": "18rem;" }}>
                            <img src={this.state.serie.imagen} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{this.state.serie.nombre}</h5>
                                <p className="card-text">IMDB: {this.state.serie.puntuacion}</p>
                                <NavLink to={"/personajes/"+this.props.idserie} className="btn btn-primary">Personajes</NavLink>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}
