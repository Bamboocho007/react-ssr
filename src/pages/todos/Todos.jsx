import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setTodosData } from "../../store/actions";
import { store } from "../../store";

function Todos({ todos, fetchTodos }) {

    useEffect(() => {
        Todos.fetchInitialData(store);
    }, []);

    return (
        <div className="todosBox">
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
        fetchTodos: () => dispatch(setTodosData())
    }
}

Todos.fetchInitialData = async (storeInstance) => {
    return storeInstance.dispatch( setTodosData() );
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
