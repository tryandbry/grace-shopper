import React from 'react'

export default class Payment extends React.Component {
  constructor(){
    super();
  }

  render(){
    const onChangeCreditCard = (evt)=>this.props.onChange('creditcard',evt);
    const onChangeExpiration = (evt)=>this.props.onChange('expiration',evt);
    const onChangeCCV = (evt)=>this.props.onChange('ccv',evt);
    
    const onChangeAddress1 = (evt)=>this.props.onChange('paymentAddress1',evt);
    const onChangeAddress2 = (evt)=>this.props.onChange('paymentAddress2',evt);
    const onChangeCity = (evt)=>this.props.onChange('paymentCity',evt);
    const onChangeState = (evt)=>this.props.onChange('paymentState',evt);
    const onChangeZip = (evt)=>this.props.onChange('paymentZip',evt);
    const onSubmit = this.props.onSubmit;
    const title = this.props.title;

    console.log("payment:",this.props);
    return(
      <div>
	<h2>Payment Information</h2>
	<form className="form-horizontal" onSubmit={onSubmit}>
	  <fieldset>
	    <legend>Credit Card Information</legend>
	    <div className="form-group">
	      <label>Credit Card Number</label>
	      <input name="creditcard" onChange={onChangeCreditCard} />
	      <label>Expiration</label>
	      <input name="expiration" onChange={onChangeExpiration} />
	      <label>CCV</label>
	      <input name="ccv" onChange={onChangeCCV} />
	    </div>
	  </fieldset>
	  <fieldset>
	    <legend>Billing Address</legend>
	    <div className="form-group">
	      <label>Address</label>
	      <input name="address1" onChange={onChangeAddress1} />
	      <label>Address 2</label>
	      <input name="address2" onChange={onChangeAddress2} />
	      <label>City</label>
	      <input name="city" onChange={onChangeCity} />
	      <label>State</label>
	      <input name="state" onChange={onChangeState} />
	      <label>Zip Code</label>
	      <input name="zipcode" onChange={onChangeZip} />
	    </div>
	  </fieldset>
	  <div className="form-group">
	    <button
	      type="submit"
	      className="btn btn-success">
	      Submit Payment Information
	    </button>
	  </div>
	</form>
      </div>
    )
  }
}