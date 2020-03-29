import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { setHomeData } from "./../../store/actions";

function Home( props ) {
    console.log( props );
    return (
        <div>
            Home page
            <Link to="/about">About</Link>
            <Link to="/todos">Todos</Link>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        home: state.HomeData 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetHomeData: data => {
            dispatch(setHomeData(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
