'use strict';

import { combineReducers } from 'redux';
import loginIn from './loginReducer';

/**
 * 合并reducers
 */
const rootReducer = combineReducers({
  loginIn: loginIn,
});

export default rootReducer;
