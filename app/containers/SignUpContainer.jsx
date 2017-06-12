import React from 'react';
import { connect } from 'react-redux';
import SignUp from '../components/SignUp';
import {newUser} from 'APP/app/reducers/auth';

class SignUpContainer extends React.Component {
    constructor() {
        super();
        this.state = {
	    firstName: "",
	    lastName: "",
	    email: "",
	    password: "",
	    verify: "",
	    errorMsgs: [],
	}

	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
    }

    //handlers for AddressForm
    /*
    onSubmitShipping = (event)=>{
      event.preventDefault();
      console.log("submitted!",this.state);
      this.setState({flowState: 1});
    }
    */

    onChange(event,val){
	this.setState({[val]: event.target.value});
    }

    onSubmit = (event)=>{
	event.preventDefault();
	let errorMsgs = [];
	console.log("onSubmit:",this.state);
	(()=>{
	    if(this.state.firstName.length == 0)
		errorMsgs.push("First Name cannot be blank");
	    if(this.state.firstName.match(/[^0-9a-zA-Z]/))
		errorMsgs.push("Please use only alphanumeric characters for your first name");
	    if(this.state.lastName.length == 0)
		errorMsgs.push("Last name cannot be blank");
	    if(this.state.lastName.match(/[^0-9a-zA-Z]/))
		errorMsgs.push("Please use only alphanumeric characters for your last name");
	    if(this.state.email.length == 0)
		errorMsgs.push("Email cannot be blank");
	    if(this.state.password == 0)
		errorMsgs.push("Password cannot be blank");
	    if(this.state.password != this.state.verify)
		errorMsgs.push("Passwords do not match");
	})();
	if(errorMsgs.length){
	    this.setState({errorMsgs});
	}
	else {
	  console.log("dispatching to create a new user!");
	  this.props.newUser(this.state.firstName,
	                     this.state.lastName,
			     this.state.email,
			     this.state.password);
	}
    }

    render () {
        return (
	  <div id="signup">
	    <SignUp
	      onChange={this.onChange}
	      onSubmit={this.onSubmit}
	      errorMsgs={this.state.errorMsgs}
	    />
	  </div>
        );
    }
}

//const mapState;
const mapDispatch = {newUser};

//export default connect(mapState,mapDispatch)(CheckoutContainer);
export default connect(null,mapDispatch)(SignUpContainer);
