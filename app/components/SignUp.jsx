import React from 'react';
import {login} from 'APP/app/reducers/auth';
import {connect} from 'react-redux';

class SignUp extends React.Component{
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
	  <h1>Create a new user</h1>
	  <div id="signup" className="col-lg-12 col-md-12">
	    <form className="form-horizontal" onSubmit={this.handleSubmit}>
	      <fieldset>
	        <legend>User details</legend>
		<div className="form-group">
		  <label>first name</label>
		  <input className="form-control" name="firstname" />
		  <label>last name</label>
		  <input className="form-control" name="lastname" />
		  <label>email</label>
		  <input className="form-control" name="email" />
		  <label>password</label>
		  <input className="form-control" name="password" type="password" />
		</div>
		<div className="form-group">
		  <button type="submit" className="btn btn-default">Submit</button>
		</div>
	      </fieldset>
	    </form>
	  </div>
	</div>
      </div>
    );
  }
}

const mapDispatch = {login};
export default connect(null, mapDispatch)(SignUp);
