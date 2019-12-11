import { combineReducers } from 'redux';
import auth from './auth';
import teacher from './teacher';


export default combineReducers({
  auth,
  teacher
});
