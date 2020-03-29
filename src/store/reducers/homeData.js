const initial = {
    title: 'Home'
}

const HomeData = (state = initial, action) => {
    switch (action.type) {
        case "SET_HOME_DATA":
            return action.payload;
        default:
            return state;
    }
}

export default HomeData;