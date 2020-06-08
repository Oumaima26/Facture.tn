import React, { Component } from 'react';
import './css/Formulaire.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Menu from './layouts/Menu';


export const login = com => {
    return axios
      .post('http://localhost:3001/Commercant/login', {
        email: com.email,
        password: com.password
      })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        return res.data;
      })
      .catch(err => {
        console.log(err);
        
      });
  }
class Authentification extends Component {
    constructor(props){
        super(props);
        this.onChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
            this.state = { 
                email:'',
                password:''
            };
          }
    
    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        });
    };
    
      onSubmit(e) {
        e.preventDefault()
    
        const Commercant = {
          email: this.state.email,
          password: this.state.password
        }
        login(Commercant).then(res => {
          window.location = '/dashboard';
          }).catch(err => {
            window.location = '/authentification';
            this.setState({
              email:'',
              password:''
            })

          });
          

      }
    render() {
        return (
          <div><Menu/>
            <div className="content-header" >
                <div className="wrapper">
                    <div className="form-wrapperlog">
                        <center><h5>
                        <i className="fa fa-sign-in"></i>
                        Authentification
                        </h5></center>
                        <form onSubmit={this.onSubmit} >
                        <div className="emaillog">
                            <label htmlFor="email">Email :</label>
                            <input 
                            className="form-control" 
                            type="email" 
                            placeholder="Email"  
                            name="email" 
                            value={this.state.email}
                            onChange={this.handleChange} 
                            />
                        </div>
                        
                        <div className="passwordlog">
                            <label htmlFor="password">Mot de passe :</label>
                            <input 
                            className= "form-control" 
                            type="password" 
                            placeholder="Mot de passe"
                            name="password"                            
                            value={this.state.password}
                            onChange={this.handleChange} 
                            />
                        </div>
                        
                        <div className="createAccount">
                          <br/> 
                          <input type="submit" value="S'identifier" className="btn btn-primary btn-block" />
                        </div>
                        </form>
                        <br/>
                        <div className="text-center"><p>Vous n'avez pas de compte? {" "}
                          <Link to="/creecompte">
                            <button className="btn btn-danger" type="submit">S'inscrire</button>
                          </Link>
                        </p>
                          <a className="d-block small" href="forgot-password.html">Mot de passe oublié?</a>
                        </div>
                    </div>
                </div>
            </div>
</div>
        )
    }
}
export default Authentification;















/*import React, { Component } from 'react';
import './css/Formulaire.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Menu from './layouts/Menu';

export const login = com => {
    return axios
      .post('http://localhost:3001/Commercant/login', {
        email: com.email,
        password: com.password
      })
      .then(res => {
        localStorage.setItem('token', res.data);
        return res.data;
      })
      .catch(err => {
        console.log(err);
        
      });
  }
class Authentification extends Component {
    constructor(props){
        super(props);
        this.onChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
            this.state = { 
                email:'',
                password:''
            };
          }
    
    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        });
    };
      onSubmit(e) {
        e.preventDefault()
    
        const Commercant = {
          email: this.state.email,
          password: this.state.password
        }
        login(Commercant).then(res => {
          window.location = '/dashboard';
          }).catch(err => {
            window.location = '/';
            this.setState({
              email:'',
              password:''
            })

          });
          

      }
    render() {
        return (
<<<<<<< HEAD
          <div>
            <Menu/>
=======
          <div><Menu/>
>>>>>>> c0398c14c4262278529fec7ee82dd9bcb498370a
            <div className="content-header" >
                <div className="wrapper">
                    <div className="form-wrapperlog">
                        <center><h5>
                        <i className="fa fa-sign-in"></i>
                        Authentification
                        </h5></center>
                        <form onSubmit={this.onSubmit} >
                        <div className="emaillog">
                            <label htmlFor="email">Email :</label>
                            <input 
                            className="form-control" 
                            type="email" 
                            placeholder="Email"  
                            name="email" 
                            value={this.state.email}
                            onChange={this.handleChange} 
                            />
                        </div>
                        
                        <div className="passwordlog">
                            <label htmlFor="password">Mot de passe :</label>
                            <input 
                            className= "form-control" 
                            type="password" 
                            placeholder="Mot de passe"
                            name="password"                            
                            value={this.state.password}
                            onChange={this.handleChange} 
                            />
                        </div>
                        
                        <div className="createAccount">
                          <br/> 
                          <input type="submit" value="S'identifier" className="btn btn-primary btn-block" />
                        </div>
                        </form>
                        <br/>
                        <div className="text-center"><p>Vous n'avez pas de compte? {" "}
                          <Link to="/creecompte">
                            <button className="btn btn-danger" type="submit">S'inscrire</button>
                          </Link>
                        </p>
                          <a className="d-block small" href="forgot-password.html">Mot de passe oublié?</a>
                        </div>
                    </div>
                </div>
            </div>
          
          </div>

        )
    }
}
export default Authentification;*/
