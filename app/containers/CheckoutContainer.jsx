import React from 'react';
import { connect } from 'react-redux';
import AddressForm from '../components/AddressForm';
import Payment from '../components/Payment';

class CheckoutContainer extends React.Component {
    constructor() {
        super();
        this.state = {
	    flowState: 0,
	    shipAddress1: "",
	    shipAddress2: "",
	    shipCity: "",
	    shipState: "",
	    shipZip: "",
	    paymentAddress1: "",
	    paymentAddress2: "",
	    paymentCity: "",
	    paymentState: "",
	    paymentZip: "",
	    creditcard: "",
	    expiration: "",
	    ccv: "",
	}

	this.onSubmitShipping = this.onSubmitShipping.bind(this);
	this.onSubmitPayment = this.onSubmitPayment.bind(this);
	this.onChange = this.onChange.bind(this);
    }

    //handlers for AddressForm
    onSubmitShipping = (event)=>{
      event.preventDefault();
      console.log("submitted!",this.state);
      this.setState({flowState: 1});
    }

    onSubmitPayment = (event)=>{
      event.preventDefault();
      console.log("submitted!",this.state);
      this.setState({flowState: 2});
    }

    onSubmitBuy = (event)=>{
      event.preventDefault();
      console.log("submitted!",this.state);
      this.setState({flowState: 3});
    }

    onChange = (type,event)=>{
      this.setState({[type]: event.target.value});
    }

    render () {
	console.log("rendering checkout");
        return (
	  <div id="checkout">
	    <h1>WELCOME TO CHECKOUT</h1>
	    {this.state.flowState === 0 ? 
	    <AddressForm
	      onSubmit={this.onSubmitShipping}
	      onChange={this.onChange}
	      title={"Shipping Address"}
	    />
	    : this.state.flowState === 1 ?
	    <Payment
	      onSubmit={this.onSubmitPayment}
	      onChange={this.onChange}
	      title={"Billing Address"}
	    />
	    : this.state.flowState === 2 ?
	    <Review
	      onSubmit={this.onSubmitBuy}
	      title={"Review"}
	    />
	    : ""}
	  </div>
        );
    }
}

//const mapState;
//const mapDispatch;

//export default connect(mapState,mapDispatch)(CheckoutContainer);
export default connect()(CheckoutContainer);
