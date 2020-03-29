import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setTodosData } from "./../../store/actions";

function Todos({ todos, fetchTodos }) {

    useEffect(() => {
        fetchTodos()
    }, []);

    return (
        <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
