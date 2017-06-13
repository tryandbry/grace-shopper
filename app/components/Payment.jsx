import React from 'react'

const Payment = ({ onChange, onSubmit, title }) => (
    <div id="payment">
        <h2>Payment Information</h2>
        <form className="form-horizontal" onSubmit={onSubmit}>
            <fieldset>
                <legend>Credit Card</legend>
                <div className="form-group col-lg-12 col-md-12">
                    <label>Credit Card Number</label>
                    <input 
                        className="form-control" 
                        name="creditcard" 
                        data-type="creditcard"
                        onChange={onChange} 
                    />
                    <label>Expiration</label>
                    <input 
                        className="form-control" 
                        name="expiration" 
                        data-type="expiration"
                        onChange={onChange} 
                    />
                    <label>CCV</label>
                    <input 
                        className="form-control" 
                        name="ccv" 
                        data-type="ccv"
                        onChange={onChange} 
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Billing Address</legend>
                <div className="form-group col-lg-12 col-md-12">
                    <label>Address</label>
                    <input 
                        className="form-control" 
                        name="address1" 
                        data-type="paymentAddress1"
                        onChange={onChange} 
                    />
                    <label>Address 2</label>
                    <input 
                        className="form-control" 
                        name="address2" 
                        data-type="paymentAddress2"
                        onChange={onChange} 
                    />
                    <label>City</label>
                    <input 
                        className="form-control" 
                        name="city" 
                        data-type="paymentCity"
                        onChange={onChange} 
                    />
                    <label>State</label>
                    <input 
                        className="form-control" 
                        name="state" 
                        data-type="paymentState"
                        onChange={onChange} 
                    />
                    <label>Zip Code</label>
                    <input 
                        className="form-control" 
                        name="zipcode" 
                        data-type="paymentZip"
                        onChange={onChange} 
                    />
                </div>
            </fieldset>
            <div className="form-group col-lg-12 col-md-12">
                <button type="submit" className="btn btn-default">
    	            Submit Payment Information
                </button>
            </div>
        </form>
    </div>
)


export default Payment;
