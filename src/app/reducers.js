/* Dependencies */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

/* Import Other Reducers */
import userReducer from '../modules/usuario/userReducer'


/* Combine & Export Reducers to Store */
const appReducer = combineReducers({

  userReducer,
  
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer