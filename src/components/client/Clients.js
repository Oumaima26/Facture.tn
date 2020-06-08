import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
const Client = props => (
  <tr>
    <td>{props.client.nom}</td>
    <td>{props.client.prenom}</td>
    <td>{props.client.email}</td>
    <td>{props.client.tel}</td>
    <td>
      <Link to={"/modifierclient/"+props.client._id}>
        <i className="nav-icon fa fa-edit" style={{"fontSize":"25px"}}></i>
      </Link>
      |
      <a href="/client" onClick={() => { props.deleteClient(props.client._id) }}>
        <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
      </a>
    </td>
  </tr>
)

export default class ClientList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduitClient = this.deleteClient.bind(this)

    this.state = {clients: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Client/')
      .then(response => {
        this.setState({ clients: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteClient(id) {
    axios.delete('http://localhost:3001/Client/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      clients: this.state.clients.filter(el => el._id !== id)
    })
  }

  clientList() {
    return this.state.clients.map(currentclient => {
      return <Client client={currentclient} deleteClient={this.deleteClient} key={currentclient._id}/>;
    })
  }

    render() {
      return (
        <div>
          <Header/>
          <Sidebar/>
          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-1">
                    <h1 className="m-0 text-dark">Dashboard</h1>
                  </div>
                  <div className="col-sm-11">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="/client">Client</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">                      
                <Link to="/ajouterclient">
                  <button className="btn btn-danger" type="submit" 
                  style={{"float":"right","position": "relative"}}>
                  Ajouter client</button>
                </Link>
                <br/>
                <h1 >
                  <center>
                    <div >Client</div>    
                  </center>
                </h1>
                <br/>
                <form>
                  <table style={{width:"100%"}} className="table  mx-auto">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>         
                    <tbody >
                      { this.clientList() }
                    </tbody>
                  </table>
                </form>
              </div>
            </section>
          </div>
          <Footer/>
        </div>
      )
    }
  }