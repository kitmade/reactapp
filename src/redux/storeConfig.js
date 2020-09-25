import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const storeConfig = () => {
  let store;

  const sagaMiddleware = createSagaMiddleware();

  const middlewareEnhancer = applyMiddleware(sagaMiddleware);
  const composeEnhancers = compose(middlewareEnhancer);
  store = createStore(rootReducer, composeEnhancers);
  sagaMiddleware.run(rootSaga);

  return store;
};

export default storeConfig;
