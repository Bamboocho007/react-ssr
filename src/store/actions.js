import axios from "axios";
import { SET_HOME_DATA, SET_TODOS_DATA } from "./types";

const setHomeData = payload => ({ type: SET_HOME_DATA, payload });
const setTodosData = () => {
    return async (dispatch) => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        dispatch({type: SET_TODOS_DATA, payload: response.data});
    }
};
export { setHomeData, setTodosData };