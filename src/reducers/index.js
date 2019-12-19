import { combineReducers } from 'redux';
import auth from './auth';
import detail from './detail';
import manage from './manage';


export default combineReducers({
  auth,
  detail,
  manage
});
