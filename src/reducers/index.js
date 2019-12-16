import { combineReducers } from 'redux';
import auth from './auth';
import detail from './detail';


export default combineReducers({
  auth,
  detail
});
