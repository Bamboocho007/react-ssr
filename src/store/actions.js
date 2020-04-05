import { SET_HOME_DATA, SET_TODOS_DATA } from "./types";

const setHomeData = payload => ({ type: SET_HOME_DATA, payload });
const setTodosData = (payload) => {
    return async (dispatch) => {
        dispatch({type: SET_TODOS_DATA, payload});
    }
};
export { setHomeData, setTodosData };