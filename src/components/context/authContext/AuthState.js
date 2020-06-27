import React, { useReducer } from 'react'
import axios from 'axios'
import authReducer from '../authContext/authReducer'
import {AuthContext} from '../authContext/authContext'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

const AuthState = (props) => {
  const intialState = {
    token: localStorage.getItem('token'),
    isAuthencated: null,
    loading: true,
    Commercant: null,
    error: null,
    com:{
      nom:'',
      prenom:'',
      email:'',
      password:'',
      tel:0,
      nomentreprise:'',
      activite:'',
      pays:'',
      region:'',
      devise:'',
      codepostal:0
  }}
  const [state, dispatch] = useReducer(authReducer, intialState)

  // Load User
  //login user

  const login = async formData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('http://localhost:3001/Commercant/login', formData, config)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        commercant:res.data,
        com:{
          nom:res.data,

        }
      })
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      })
    }
  }
  const setError = (err) => {
    dispatch({
      payload: [{ msg: err }]
    })
  }



  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  
  return (
    <AuthContext.Provider value={{
      token: state.token,
      isAuthencated: state.isAuthencated,
      commercant: state.commercant,
      error: state.error,
      loading: state.loading,
      com:state.com,
      login,
      logout,
      clearErrors,
      setError
    }} >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
