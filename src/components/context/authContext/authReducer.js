import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
  } from '../types'
  
  export default (state, { type, payload }) => {
    switch (type) {
      case LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token)
        return {
          ...state,
          ...payload,
          isAuthencated: true,
          loading: false,
          error: null
        }
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
        localStorage.removeItem('token')
        return {
          ...state,
          token: null,
          isAuthencated: null,
          commercant: null,
          loading: false,
          error: payload
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        }
      default:
        return state
    }
  }