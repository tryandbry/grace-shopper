import React from 'react';
import {login} from 'APP/app/reducers/auth';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

class LoginPage extends React.Component{
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault();
    this.props.login(evt.target.username.value, evt.target.password.value)
    browserHistory.push('/');
  }

  render(){

    return (
      <div className="container">
        <div className="row">
	  <h1>Rocks</h1>
	  <div id="login" className="col-lg-5 col-md-5">
	    <form className="form-horizontal" onSubmit={this.handleSubmit}>
	      <fieldset>
	        <legend>Log In</legend>
		<div className="form-group">
		  <label>User Name</label>
		  <input className="form-control" name="username" />
		  <label>Password</label>
		  <input className="form-control" name="password" type="password" />
		</div>
		<div className="form-group">
		  <button type="submit" className="btn btn-default">Submit</button>
		</div>
	      </fieldset>
	    </form>
	  </div>
	  <div className="col-lg-2 col-md-2">
	    <p>Or</p>
	  </div>
	  <div className="col-lg-5 col-md-5">
	    <h4>Sign in with Google</h4>
	    <a href="/api/auth/login/google">
	      <button className="btn btn-default">Google</button>
	    </a>
	  </div>
	  <div className="col-lg-12 col-md-12">
	    <p>Don't have a login yet?  Sign up!</p>
	    <h4>Sign Up</h4>
	    <a href="/*FILL ME IN*/">
	      <button className="btn btn-success btn-google">Sign Up</button>
	    </a>
	  </div>
	</div>
      </div>
    );
  }
}

const mapDispatch = {login};
export default connect(null, mapDispatch)(LoginPage);
