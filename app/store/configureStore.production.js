import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../core'

const enhancer = applyMiddleware(thunk)

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
