'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

/**
 * 创建store
 * Middleware作用：middleware就是允许我们在dispatch action之后，到达reducer之前，搞点事情。比如：打印，报错，跟异步API通信等等
 */

const logger = store => next => action => {
	if(typeof action === 'function') console.log('dispatching a function');
	else console.log('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	return result;
}

let middlewares = [
	logger,
	thunkMiddleware
];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer)
  return store;
}
