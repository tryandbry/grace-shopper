import React from 'react';
import { connect } from 'react-redux';
import AddressForm from '../components/AddressForm';
import Payment from '../components/Payment';
import Review from '../components/Review';
import Receipt from '../components/Receipt';
import { postOrder } from '../reducers/order';

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
      console.log('onSubmitBuy in checkoutcontainer')
      e.preventDefault();
      this.props.postOrder(this.state, this.props.userId)
      this.setState({ flowState: 3 });
    }

    // form change
    onChange = e => {
        e.preventDefault();
        const type = e.target.getAttribute('data-type');
        const value = e.target.value;
        this.setState({ [type] : value });
    }

    render () {
        console.log('Checkout State\n', this.state)
        const onChange = this.onChange;
        const { order } = this.props;
        
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
                    : <Receipt 
                        order={order}
                      />
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
    postOrder
};

// export default connect(mapState, mapDispatch)(CheckoutContainer);
export default connect(mapState, mapDispatch)(CheckoutContainer);
