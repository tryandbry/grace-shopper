import React from 'react';
import { connect } from 'react-redux';
import AddressForm from '../components/AddressForm';

class CheckoutContainer extends React.Component {
    constructor() {
        super();
        this.state = {
	    shipAddress1: "",
	    shipAddress2: "",
	    shipCity: "",
	    shipState: "",
	    shipZip: "",
	}

	this.onSubmitShipping = this.onSubmitShipping.bind(this);
	this.onChangeAddress1 = this.onChangeAddress1.bind(this);
	this.onChangeAddress2 = this.onChangeAddress2.bind(this);
	this.onChangeCity = this.onChangeCity.bind(this);
	this.onChangeState = this.onChangeState.bind(this);
	this.onChangeZip = this.onChangeZip.bind(this);
    }

    onSubmitShipping = (event)=>{
      event.preventDefault();
      console.log("submitted!",this.state);
    }

    onChangeAddress1 = (event)=>{
      this.setState({shipAddress1: event.target.value});
    }

    onChangeAddress2 = (event)=>{
      this.setState({shipAddress2: event.target.value});
    }

    onChangeCity = (event)=>{
      this.setState({shipCity: event.target.value});
    }

    onChangeState = (event)=>{
      this.setState({shipState: event.target.value});
    }

    onChangeZip = (event)=>{
      this.setState({shipZip: event.target.value});
    }

    render () {
	console.log("rendering checkout");
        return (
	  <div id="checkout">
	    <h1>WELCOME TO CHECKOUT</h1>
	    <AddressForm
	      onSubmit={this.onSubmitShipping}
	      onChangeAddress1={this.onChangeAddress1}
	      onChangeAddress2={this.onChangeAddress2}
	      onChangeCity={this.onChangeCity}
	      onChangeState={this.onChangeState}
	      onChangeZip={this.onChangeZip}
	      title={"Shipping Address"}
	    />
	  </div>
        );
    }
}

//const mapState;
//const mapDispatch;

//export default connect(mapState,mapDispatch)(CheckoutContainer);
export default connect()(CheckoutContainer);
