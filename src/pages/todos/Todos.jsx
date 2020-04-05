import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import { Link } from "react-router-dom";
import { setTodosData } from "../../store/actions";
import { store } from "../../store";

function Todos({ todos }) {

    useEffect(() => {
        if ( window?.__INITIAL_DATA__ ) {
            Todos.fetchInitialData(store, window?.__INITIAL_DATA__);
            delete window.__INITIAL_DATA__;
        } else {
            Todos.fetchInitialData(store);
        }
    }, []);

    return (
        <div className="todosBox">
            Todos page
            <Link to="/about">About</Link>
            <Link to="/">Home</Link>
            {todos.map( t =>(
                <p key={t.id}>{t.title}</p>
            ))}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        todos: state.TodosData 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTodos: (data) => dispatch(setTodosData(data))
    }
}

Todos.fetchInitialData = async (storeInstance, initialData) => {
    if( !initialData ) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        storeInstance.dispatch( setTodosData(response.data) );
        return response.data;
    } else {
        storeInstance.dispatch( setTodosData( initialData ) );
        return initialData;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
