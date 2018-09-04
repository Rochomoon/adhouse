import { base } from './api'
const login = 'token'
const usuarios = 'usuarios'
const roles = 'roles'
const permisos = 'permisos'
const informes = 'informes'
const preguntas_originales = 'preguntas_originales'
const preguntas_consolidadas = 'preguntas_consolidadas'
const organismos = 'organismos'
const autores = 'autores'
const estadoOriginales = 'estado_preguntas_originales'
const estadoDerivaciones = 'estado_derivaciones'
const motivoOriginales = 'motivos_consolidacion'
const consolidaciones = 'consolidaciones'
const derivaciones = 'derivaciones'
const anexos = 'anexos'
const respuestas = 'respuestas'
const excel = 'excel'
const confirmacionInforme = 'cerrar_informe'
const cierreInforme = 'cierres'
const imagenes = 'imagenes'

export default {
  base: base,
  login: base + login,
  usuarios: base + usuarios,
  roles: base + roles,
  permisos: base + permisos,
  organismos: base + organismos,
  informes: base + informes,
  respuestas: base + respuestas,
  preguntas_de_informe: (informe_id) => {
    return base + informes + '/' + informe_id + '/' + preguntas_originales
  },
  preguntas_de_informe_csv: (informe_id) => {
    return base + informes + '/' + informe_id + '/' + preguntas_originales + '/' + excel
  },
  preguntas_consolidadas_de_informe: (informe_id) => {
    return base + informes + '/' + informe_id + '/' + preguntas_consolidadas
  },
  consolidaciones_de_informe: (informe_id) => {
    return base + informes + '/' + informe_id + '/' + consolidaciones
  },
  anexo_de_derivacion: (derivacion_id) => {
    return base + derivaciones + '/' + derivacion_id + '/' + anexos
  },
  anexo_de_respuesta: (respuesta_id) => {
    return base + respuestas + '/' + respuesta_id + '/' + anexos
  },
  imagen_de_respuesta: (respuesta_id) => {
    return base + respuestas + '/' + respuesta_id + '/' + imagenes
  },
  confirmar_informe: (informe_id) => {
    return base + informes + '/' + informe_id + '/' + confirmacionInforme
  },
  cerrar_informe: (informe_id) => {
    return base + informes + '/' + informe_id + '/' + cierreInforme
  },

  limitPreguntasOriginales: '5000',
  autores: base + autores,
  estadoOriginales: base + estadoOriginales,
  estadoDerivaciones: base + estadoDerivaciones,
  motivoOriginales: base + motivoOriginales,
  derivaciones: base + derivaciones,
  claveInformes: informes,
  claveRoles: roles,
  clavePermisos: permisos,
  claveUsuarios: usuarios,
  claveOrganismos: organismos,
}