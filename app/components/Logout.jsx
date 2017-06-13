import React from 'react'
import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import FilterCatalog from './FilterCatalog'

const Logout = ({ logout }) => {
    // this is definitely not the ideal way of logging out but it works
    logout();
    browserHistory.push('/')
    return (<div></div>) 
}

export default connect(null, {logout})(Logout)