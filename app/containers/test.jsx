import React from 'react';
import { connect } from 'react-redux';

class CheckoutContainer extends React.Component {
    constructor() {
        super();
    }

    render () {
	console.log("rendering checkout");
        return (
	  <div id="checkout">
	    <h1>WELCOME TO CHECKOUT</h1>
	  </div>
        );
    }
}

//const mapState;
//const mapDispatch;

//export default connect(mapState,mapDispatch)(CheckoutContainer);
export default connect()(CheckoutContainer);
