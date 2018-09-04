import store from '../app/store'
import React from 'react'
import striptags from 'striptags'
import _ from 'lodash'
import JgmReferences from './JgmReferences'
const GET_USUARIOS = 'GET_USUARIOS'
const EDIT_USUARIOS = 'EDIT_USUARIOS'
const GET_ROLES = 'GET_ROLES'
const EDIT_ROLES = 'EDIT_ROLES'
const GET_INFORMES = 'GET_INFORMES'
const EDIT_INFORMES = 'EDIT_INFORMES'
// const GET_DERIVACIONES = 'GET_DERIVACIONES'
const EDIT_DERIVACIONES = 'EDIT_DERIVACIONES'
// const GET_RESPUESTAS = 'GET_RESPUESTAS'
const EDIT_RESPUESTAS = 'EDIT_RESPUESTAS'

export const getUsuarios = () => {
  return GET_USUARIOS
}

export const getRoles = () => {
  return GET_ROLES
}

export const editUsuarios = () => {
  return EDIT_USUARIOS
}

export const editRoles = () => {
  return EDIT_ROLES
}


export const getConfig = () => ({
  headers: {
    'Authorization': store.getState().authReducer.user.token,
  }
})

export const getFileConfig = () => ({
  headers: {
    'Authorization': store.getState().authReducer.user.token,
    
  },
  responseType: 'blob'
})

export const getConfigMultipart = () => ({
  headers: {
    'Authorization': store.getState().authReducer.user.token,
    'content-type': 'multipart/form-data'
  }
})

export const displayPreview = (blob) => {
  let newBlob = new Blob([blob], {type: 'application/pdf'})
  // En internet explorer no se pueden crear links href a partir de blobs, con lo cual
  // se utiliza msSaveOrOpenBlob, de la api de Explorer para abrir el archivo
  // IMPORTANTE: probar esto en explorer
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob)
    return
  }
  const data = window.URL.createObjectURL(newBlob)
  var link = document.createElement('a')
  link.href = data
  link.download='vistaPrevia.pdf'
  window.open(link)
}

export const getErrorResponse = (err) => {
  let messageContainer = err.response.data.message.msg
  let message = (Array.isArray(messageContainer))? messageContainer[0].message : messageContainer
  return { status: err.response.status, message: message }
}

export const tienePermiso = (permisos, permiso) => {
  return (_.indexOf(permisos, permiso) != -1) ? true : false
}

export const permisoGetRoles = (permisos) => {
  return tienePermiso(permisos, GET_ROLES)
}

export const permisoGetInformes = (permisos) => {
  return tienePermiso(permisos, GET_INFORMES)
}

export const permisoEditInformes = (permisos) => {
  return tienePermiso(permisos, EDIT_INFORMES)
}

export const permisoGetUsuarios = (permisos) => {
  return tienePermiso(permisos, GET_USUARIOS)
}

export const permisoEditRoles = (permisos) => {
  return tienePermiso(permisos, EDIT_ROLES)
}

export const permisoEditUsuarios = (permisos) => {
  return tienePermiso(permisos, EDIT_USUARIOS)
}

export const permisoEditDerivaciones = (permisos) => {
  return tienePermiso(permisos, EDIT_DERIVACIONES)
}

export const permisoEditRespuestas = (permisos) => {
  return tienePermiso(permisos, EDIT_RESPUESTAS)
}

export const formatearFechaDDMMAA = (data) => {
  let fechas = data.split('-')
  let dia = fechas[2].split('T')
  let fullDate = dia[0] + '-' + fechas[1] + '-' + fechas[0]
  return fullDate
}

export const obtenerConsolidadaPorNombre = (nombre, array) => {
  let error = _.find(array, { 'nombre': nombre })
  return error
}

export const getOrganismoSearchOptions = (allOrganismos) => {
  let organismoRenderSearch = []
  organismoRenderSearch.push(<option key={'organismoVacioSearch'} value={-1} ></option>)
  allOrganismos.forEach(function (organismo) {
    organismoRenderSearch.push(<option key={organismo.id + 'Search'} value={organismo.id} >{organismo.nombre}</option>)
  }, this)

  return organismoRenderSearch
}

export const getOrganismoOptions = (allOrganismos) => {
  let organismoRender = []
  allOrganismos.forEach(function (organismo) {
    organismoRender.push(<option key={organismo.id} value={organismo.id} >{organismo.nombre}</option>)
  }, this)

  return organismoRender
}

export const getOrganismoSelectOptions = (allOrganismos,with_jgm = false) => {
  let organismoOptions = []
  allOrganismos.forEach(function (organismo) {
    if (organismo.nombre !==JgmReferences.NOMBRE_JGM ||with_jgm){
      organismoOptions.push({ value: organismo.id, label: organismo.nombre })
    }
  }, this)

  return organismoOptions
}
export const getEstadoDerivacionesSelectOptions = (allEstadoDerivaciones) => {
  let estadosOptions = []
  allEstadoDerivaciones.forEach(function (estado) {
    estadosOptions.push({ value: estado.id, label: estado.nombre })
  }, this)

  return estadosOptions
}

export const getTextFromHTML = (input) => {
  return striptags(input).replace(/&nbsp;/g,' ').trim()
}
export const getDescripcionAutor = (autor) => {
  let descripcionAutor = ''
  if (autor.bloque) {
    descripcionAutor += descripcionAutor ? ' - ' + autor.bloque : autor.bloque
  }
  if (autor.interbloque) {
    descripcionAutor += descripcionAutor ? ' - ' + autor.interbloque : autor.interbloque
  }
  if (autor.nombre) {
    descripcionAutor += descripcionAutor ? ' - ' + autor.nombre : autor.nombre
  }
  return descripcionAutor
}

export const contentEstaVacio = (content) => {
  let text = getTextFromHTML(content)
  return (text.trim() == '' || text.trim() == null)
}

export const getAutoresSelectOptions = (allAutores, camara) => {
  let autoresOptions = []
  allAutores.forEach(function (autor) {
    if (autor.camara === camara) {
      let descripcionAutor = getDescripcionAutor(autor)
      autoresOptions.push({ value: autor.id, label: descripcionAutor })
    }
  }, this)

  return autoresOptions
}

export const getEstadosSelectOptions = (allEstados) => {
  let estadosOptions = []
  allEstados.forEach(function (estado) {
    estadosOptions.push({ value: estado.id, label: estado.nombre })
  }, this)

  return estadosOptions
}