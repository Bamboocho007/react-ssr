const initial = [];

const TodosData = (state = initial, action) => {
    switch (action.type) {
        case "SET_TODOS_DATA":
            return action.payload;
        default:
            return state;
    }
}

export default TodosData;