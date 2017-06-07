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
	    creditcard: "",
	    expiration: "",
	    ccv: "",
	}

	this.onSubmitShipping = this.onSubmitShipping.bind(this);
	this.onChangeAddress1 = this.onChangeAddress1.bind(this);
	this.onChangeAddress2 = this.onChangeAddress2.bind(this);
	this.onChangeCity = this.onChangeCity.bind(this);
	this.onChangeState = this.onChangeState.bind(this);
	this.onChangeZip = this.onChangeZip.bind(this);

	this.onChangeCreditCard = this.onChangeCreditCard.bind(this);
	this.onChangeExpiration = this.onChangeExpiration.bind(this);
	this.onChangeCCV = this.onChangeCCV.bind(this);
    }

    //handlers for AddressForm
    onSubmitShipping = (event)=>{
      event.preventDefault();
      console.log("submitted!",this.state);
      this.setState({flowState: 1});
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

    //handlers for payment
    onChangeCreditCard = (event)=>{
      this.setState({creditcard: event.target.value});
    }

    onChangeExpiration = (event)=>{
      this.setState({expiration: event.target.value});
    }

    onChangeCCV = (event)=>{
      this.setState({ccv: event.target.value});
    }

    render () {
	console.log("rendering checkout");
        return (
	  <div id="checkout">
	    <h1>WELCOME TO CHECKOUT</h1>
	    {this.state.flowState === 0 ? 
	    <AddressForm
	      onSubmit={this.onSubmitShipping}
	      onChangeAddress1={this.onChangeAddress1}
	      onChangeAddress2={this.onChangeAddress2}
	      onChangeCity={this.onChangeCity}
	      onChangeState={this.onChangeState}
	      onChangeZip={this.onChangeZip}
	      title={"Shipping Address"}
	    />
	    : this.state.flowState === 1 ?
	    <Payment
	      onSubmit={this.onSubmitShipping}
	      onChangeAddress1={this.onChangeAddress1}
	      onChangeAddress2={this.onChangeAddress2}
	      onChangeCity={this.onChangeCity}
	      onChangeState={this.onChangeState}
	      onChangeZip={this.onChangeZip}
	      onChangeCreditCard={this.onChangeCreditCard}
	      onChangeExpiration={this.onChangeExpiration}
	      onChangeCCV={this.onChangeCCV}
	      title={"Billing Address"}
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
