import React from 'react'

export const Login = ({ login }) => (
  <form className="login" onSubmit={evt => {
    evt.preventDefault();
    login(evt.target.username.value, evt.target.password.value);
      // TODO: no feedback when trying to log in with user that doesn't exist
  } }>
    <input name="username" placeholder="username" />
    <input name="password" type="password" placeholder="password" />
    <input type="submit" value="Login" />
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
