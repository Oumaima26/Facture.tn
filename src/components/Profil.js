import React, { Component } from 'react';

import MyContext from './MyContext';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
class Profil extends Component {
  render() {
    return (
      
    <MyContext.Consumer>
    {
      data =>{
        return(
        <div>
      <Header/>
      <Sidebar/>
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto" >
            <tbody>
              <tr>
                <td>Nom:</td>
                <td>{data.nom}</td>
              </tr>
              <tr>
                <td>Prenom:</td>
                <td>{data.prenom}</td>
              </tr>
              
              <tr>
                <td>Nom Entreprise:</td>
                <td>{data.nomentreprise}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <td>Tel:</td>
                <td>{data.tel}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
        )
      }
    }
  </MyContext.Consumer>
      
    )
  }
}
export default Profil;