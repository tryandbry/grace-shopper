import React from 'react';
import { connect } from 'react-redux';
import AddressForm from '../components/AddressForm';
import Payment from '../components/Payment';
import Review from '../components/Review';
import { postOrder } from '../reducers/order'

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
      buy(this.state, this.props.cart)
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
                      />
                    }
            </div>
        );
    }
}

const mapState = state => ({
    cart : state.cart.items,
    userId : state.auth.id
});
const mapDispatch = dispatch => ({
    buy : (order, cart) => dispatch(postOrder(order, cart))
});

export default connect(mapState, mapDispatch)(CheckoutContainer);
// export default connect()(CheckoutContainer);
