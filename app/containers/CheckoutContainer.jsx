import React from 'react';
import { connect } from 'react-redux';
import AddressForm from '../components/AddressForm';
import Payment from '../components/Payment';
import Review from '../components/Review';
import Receipt from '../components/Receipt';
import { postOrder } from '../reducers/order';
import Bom from '../components/Bom';
import { fetchBom } from '../reducers/bom';

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
        this.onSubmitBuy = this.onSubmitBuy.bind(this);
    	this.onChange = this.onChange.bind(this);
    }

    // handlers for AddressForm
    onSubmitShipping = e => {
      e.preventDefault();
      this.setState({ flowState: 1 });
    }

    onSubmitPayment = e => {
      e.preventDefault();
      this.setState({ flowState: 2 });
    }

    onSubmitBuy = e => {
      e.preventDefault();
      this.props.postOrder(this.state, this.props.userId)
      .then(()=>{
	this.props.fetchBom(this.props.order.id);
	this.setState({ flowState: 3 });
      })
    }

    // form change
    onChange = e => {
        e.preventDefault();
        const type = e.target.getAttribute('data-type');
        const value = e.target.value;
        this.setState({ [type] : value });
    }

    render () {
        const onChange = this.onChange;
        
        return (
            <div id="checkout">
                <h1>Checkout</h1>
                {
                    this.state.flowState === 0 
                    ? <AddressForm
                        onSubmit={this.onSubmitShipping}
                        onChange={onChange}
                        title={"Shipping Address"}
                      />
                    : this.state.flowState === 1 
                    ? <Payment
                        onSubmit={this.onSubmitPayment}
                        onChange={onChange}
                        title={"Billing Address"}
                      />
                    : this.state.flowState === 2 
                    ? <Review
                        onSubmit={this.onSubmitBuy}
                        title={"Review"}
                      />
                    : <Receipt />
                    }
            </div>
        );
    }
}

const mapState = state => ({
    userId : state.auth.id,
    order : state.order
});
const mapDispatch = {
    postOrder,
    fetchBom,
};

export default connect(mapState, mapDispatch)(CheckoutContainer);
