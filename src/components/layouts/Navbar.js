import React, {  useContext } from 'react'
import AuthContext from '../context/authContext/authContext'
import Header from './Header';
import Sidebar from './Sidebar';
import Menu from './Menu';

const Navbar = ({ title, icon }) => {
  const { isAuthencated } = useContext(AuthContext)

  const nonconnecter = (
      <div>
      <Header/>
      <Sidebar/></div>
  );

  const connecter = (
    <div>
        <Menu/></div>
  );

  return (
    <div >
        {isAuthencated ? nonconnecter : connecter}
    </div>
  )
}

export default Navbar
