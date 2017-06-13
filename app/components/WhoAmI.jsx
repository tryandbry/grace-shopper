import React from 'react'

export const WhoAmI = ({ user, logout }) => {
  console.log("WhoAmI component:",user);
  return (
    <div className="whoami">
      <span className="whoami-user-name">Welcome, {user && user.fullName} </span>
      <button className="btn btn-primary btn-logout" onClick={logout}>Logout</button>
    </div>
  )
}

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)