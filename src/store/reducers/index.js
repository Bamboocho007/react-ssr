import { combineReducers } from 'redux';
import HomeData from './homeData';
import TodosData from './todosData';

export default combineReducers({
  HomeData,
  TodosData
});