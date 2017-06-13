import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//move review to actual product page duhh im an idiot, change this to show past and current orders!
//will need to be a component
const UserPage = function (props) {
    console.log('what is props ', props)
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <h1 className="accountHeader"> Account Management </h1>
                </div>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                        <span> View <Link to={`/`}>Orders</Link> </span>
                    </div>
                </div>
                </div>
            </div>
    )
}

const mapStateToProps = state => {
    console.log('state is???? ', state);
    return {
        user: state.auth
    }
}


connect(mapStateToProps)(UserPage)

export default UserPage