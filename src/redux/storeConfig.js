import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';

const storeConfig = () => {
  let store;

  store = createStore(rootReducer);

  return store;
};

export default storeConfig;
