import React from 'react';
import {login} from 'APP/app/reducers/auth';
import {connect} from 'react-redux';

class LoginPage extends React.Component{
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault();
    this.props.login(evt.target.username.value, evt.target.password.value)
  }

  render(){

    return (
      <div className="container">
        <div className="row">
	  <div className="col-lg-4 col-md-4" />
	  <div id="login" className="col-lg-4 col-md-4">
	    <h1>Rocks</h1>
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
	    <br />
	    <h3>Or sign in with Google</h3>
	    <a href="/api/auth/login/google">
	      <button className="btn btn-success btn-google">Google</button>
	    </a>
	  </div>
	  <div className="col-lg-4 col-md-4" />
	</div>
      </div>
    );
  }
}

const mapDispatch = {login};
export default connect(null, mapDispatch)(LoginPage);
