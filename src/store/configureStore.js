import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger                                      from 'redux-logger'
import reducers                                          from '../reducers'

const createStoreWithMiddleware = applyMiddleware(
    createLogger()
)(createStore);


export default function configureStore(initialState) {
    return createStoreWithMiddleware(combineReducers(reducers), initialState);
}
