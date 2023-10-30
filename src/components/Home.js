import React, { Component } from 'react';
import home from "../assets/images/home.png";

export default class Home extends Component {
  render() {
    return (
      <div className='container'>
        
        <h1>Home</h1>
        <img className='img img-thumbnail' src={home} />
      </div>
    )
  }
}
