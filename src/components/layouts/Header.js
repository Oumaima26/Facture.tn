import React,{useContext} from 'react';
import AuthContext from '../context/authContext/authContext';

const Header =()=> {
  const { logout, clearErrors } = useContext(AuthContext)
  const onLogout = () => {
    logout();
    clearErrors();
  }
  return (
    <nav className="main-header navbar navbar-expand navbar-dark navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="/" role="button">
          <i className="fa fa-bars "> </i></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/dashboard" className="nav-link">Home</a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/" className="nav-link">Contact</a>
        </li>
      </ul>  
      <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>  
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
          <a className="nav-link" href="/profil" role="button">
            <i className="fa fa-user"></i>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link"  href="/" onClick={onLogout} role="button">
            <i className="fa fa-sign-out"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Header;