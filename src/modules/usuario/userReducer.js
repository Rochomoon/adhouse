import axios from 'axios'
import { getConfig, getErrorResponse } from '../../utils/utils'
import { push } from 'react-router-redux'
import _ from 'lodash'
import api from '../../config/endpoints'

const HYDRATE_USUARIOS = 'HYDRATE_USUARIOS'
const HYDRATE_USUARIO_BY_ID = 'HYDRATE_USUARIO_BY_ID'
const HYDRATE_ORGANISMOS = 'HYDRATE_ORGANISMOS'
const QUERY_ERROR = 'QUERY_ERROR'
const INTERNAL_ERROR = 'INTERNAL_ERROR'
const SUCCESSFUL = 'SUCCESSFUL'
const CLEAR_USER_RESULT = 'CLEAR_USER_RESULT'
const CLEAR_ALERT = 'CLEAR_ALERT'
const REMOVE_ROL = 'REMOVE_ROL'
const ADD_ROL = 'ADD_ROL'
const PATCH_USUARIO = 'PATCH_USUARIO'

const initialState = {
  result: [],
  alert: {},
  allRoles: [],
  allOrganismos: [],
  activeUser: {},
  activeSearch: false
}

export const clearUserResult = () => ({
  type: CLEAR_USER_RESULT
})

export const clearAlert = () => ({
  type: CLEAR_ALERT
})

export const queryError = err => ({
  type: QUERY_ERROR, err
})

export const internalError = err => ({
  type: INTERNAL_ERROR, err
})

export const successful = text => ({
  type: SUCCESSFUL, text
})

// normal action creators
export const organismosTodos = data => ({
  type: HYDRATE_ORGANISMOS, data
})

export const usuarios = data => ({
  type: HYDRATE_USUARIOS, data
})

export const usuarioById = data => ({
  type: HYDRATE_USUARIO_BY_ID, data
})

export const removerRol = data => ({
  type: REMOVE_ROL, data
})

export const agregarRol = data => ({
  type: ADD_ROL, data
})

export const patchUsuario = data => ({
  type: PATCH_USUARIO, data
})

// thunks
export const clearUsers = () => dispatch => {
  dispatch(clearUserResult())
}

export const getUsuarioById = (id) => dispatch => {
  let config = getConfig()
  let queryStringOrganismos = '?sort_by=nombre'

  axios.all([
    axios.get(api.usuarios + '/' + id, config),
    axios.get(api.roles, config),
    axios.get(api.organismos + queryStringOrganismos, config)
  ])
    .then(axios.spread(function (usuario, roles, organismos) {
      return { usuario: usuario.data.data, roles: roles.data.data, organismos: organismos.data.data }
    }))
    .then(data => {
      dispatch(usuarioById(data))
    })
    .catch(err => {
      if (err.response && err.response.status){
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const getUsuarios = (nombre, email, organismo) => dispatch => {
  let config = getConfig()
  let queryString = ''
  if (nombre != '') queryString += '?nombre=' + nombre
  if (email != '') queryString += (queryString == '') ? '?email=' + email : '&email=' + email
  if (organismo != '-1') queryString += (queryString == '') ? '?organismo_id=' + organismo : '&organismo_id=' + organismo
  let queryStringOrganismos = '?sort_by=nombre'

  axios.all([
    axios.get(api.usuarios + queryString, config),
    axios.get(api.organismos + queryStringOrganismos, config)
  ])
    .then(axios.spread(function (usuarios, organismos) {
      return { usuarios: usuarios.data.data, organismos: organismos.data.data }
    }))
    .then(data => {
      dispatch(usuarios(data))
    })
    .catch(err => {
      if (err.response && err.response.status){
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const updateUsuario = (idUsuario, nombre, organismo_id, password, verificacion_password) => dispatch => {
  let config = getConfig()
  let body = {}
  if (nombre) body.nombre = nombre
  if (organismo_id) body.organismo_id = organismo_id
  if (password) body.password = password
  if (verificacion_password) body.verificacion_password = verificacion_password

  axios.patch(api.usuarios + '/' + idUsuario, body, config)
    .then(res => { 
      return res.data.data 
    } )
    .then(() => {
      dispatch(getUsuarioById(idUsuario))
      dispatch(successful('El usuario se actualizó correctamente'))
    })
    .catch(err => {
      if (err.response && err.response.status){
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const createUsuario = (nombre, email, verificacion_email, organismo_id, password, verificacion_password) => dispatch => {

  let config = getConfig()
  let body = {
    nombre: nombre,
    organismo_id: organismo_id,
    email: email,
    verificacion_email: verificacion_email,
    password: verificacion_password,
    verificacion_password: verificacion_password
  }

  axios.post(api.usuarios, body, config)
    .then(res => res.data.data)
    .then(data => {
      dispatch(push('/' + api.claveUsuarios + '/' + data.id))
    })
    .catch(err => {
      if (err.response && err.response.status){
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}


export const obtenerOrganismos = () => dispatch => {
  let config = getConfig()
  let queryStringOrganismos = '?sort_by=nombre'
  axios.get(api.organismos + queryStringOrganismos, config)
    .then(res => res.data.data)
    .then(data => {
      dispatch(organismosTodos(data))
    })
    .catch(err => {
      if (err.response && err.response.status){
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const deleteRol = (idUsuario, idRol) => dispatch => {
  let config = getConfig()
  axios.delete(api.usuarios + '/' + idUsuario + '/' + api.claveRoles + '/' + idRol, config)
    .then(res => res.data.data)
    .then(() => {
      dispatch(removerRol(idRol))
      dispatch(successful('El rol se eliminó correctamente'))            
    })
    .catch(err => {
      if (err.response && err.response.status){
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const addRol = (idUsuario, idRol) => dispatch => {
  let config = getConfig()
  let body = { rol_id: idRol }
  axios.post(api.usuarios + '/' + idUsuario + '/' + api.claveRoles, body, config)
    .then(res => res.data.data)
    .then(() => {
      dispatch(agregarRol(idRol))
      dispatch(successful('El rol se agregó correctamente'))      
    })
    .catch(err => {
      if (err.response && err.response.status){
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

const fetchUsuariosTable = (data) => {
  let returnValue = []
  data.map(function (rowObject) {
    returnValue.push({ id: rowObject.id, nombre: rowObject.nombre, email: rowObject.email, organismo: rowObject.Organismo.nombre })
  })
  return returnValue
}

// Auxiliares

const getRolRemover = (rolId, activeUsuario) => {
  let rolesActuales = activeUsuario.roles
  let nuevosRoles = _.differenceBy(rolesActuales, [{ id: rolId }], 'id')
  return nuevosRoles
}

const getRolAdd = (nuevoRolId, roles, allRoles) => {
  let nuevoRol = _.find(allRoles, { 'id': parseInt(nuevoRolId) })
  roles.push(nuevoRol)
  return roles
}

const fetchRoles = (data) => {
  let returnValue = []
  data.map(function (rowObject) {
    returnValue.push({ id: rowObject.id, nombre: rowObject.nombre, descripcion: rowObject.descripcion })
  })
  return returnValue
}

const fetchOrganismos = (data) => {
  let returnValue = []
  data.map(function (rowObject) {
    returnValue.push({ id: rowObject.id, nombre: rowObject.nombre, sigla: rowObject.sigla })
  })
  return returnValue
}

const fetchUsuario = (data) => {
  let returnValue = []
  data.Roles.map(function (rowObject) {
    returnValue.push({ id: rowObject.id, nombre: rowObject.nombre, descripcion: rowObject.descripcion })
  })
  return { id: data.id, nombre: data.nombre, email: data.email, roles: returnValue, organismo: data.Organismo }
}

export default (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE_ORGANISMOS:
    return {
      ...state,
      result: [],
      allOrganismos: fetchOrganismos(action.data),
    }
  case HYDRATE_USUARIOS:
    return {
      ...state,
      result: fetchUsuariosTable(action.data.usuarios),
      allOrganismos: fetchOrganismos(action.data.organismos),
      activeSearch: true
    }
  case HYDRATE_USUARIO_BY_ID:
    return {
      ...state,
      result: [],
      activeUser: fetchUsuario(action.data.usuario),
      allRoles: fetchRoles(action.data.roles),
      allOrganismos: fetchOrganismos(action.data.organismos),
    }
  case REMOVE_ROL:
    return {
      ...state,
      activeUser: { ...state.activeUser, roles: getRolRemover(action.data, state.activeUser) },
    }
  case ADD_ROL:
    return {
      ...state,
      activeUser: { ...state.activeUser, roles: getRolAdd(action.data, state.activeUser.roles, state.allRoles) },
    }
  case QUERY_ERROR:
    return { ...state, alert: { style: 'danger', text: action.err.message } }
  case INTERNAL_ERROR:
    return { ...state, alert: { style: 'danger', text: 'Ocurrió un error inesperado' } }  
  case SUCCESSFUL:
    return { ...state, alert: { style: 'success', text: action.text } }
  case CLEAR_ALERT:
    return {...state, alert: {}}  
  case CLEAR_USER_RESULT:
    return { ...state, result: [], activeSearch: false }
  default:
    return state
  }
}