import { combineReducers } from 'redux';  
import todos from './Todos';  
import visibilityFilter from './VisibilityFilter';  
  
export default combineReducers({  
  todos,  
  visibilityFilter  
})  