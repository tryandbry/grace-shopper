import React from 'react'

const AddressForm = ({ onChange, onSubmit, title }) => (
    <div id="shipping">
        <h2>Shipping Information</h2>
        <form className="form-horizontal" onSubmit={onSubmit}>
            <fieldset>
                <legend>{title}</legend>
                <div className="form-group col-lg-12 col-md-12">
                    <label>Address</label>
                    <input 
                        className="form-control" 
                        name="address1" 
                        data-type="shipAddress1"
                        onChange={onChange} 
                    />
                    <label>Address 2</label>
                    <input 
                        className="form-control" 
                        name="address2" 
                        data-type="shipAddress2"
                        onChange={onChange} 
                    />
                    <label>City</label>
                    <input 
                        className="form-control" 
                        name="city" 
                        data-type="shipCity"
                        onChange={onChange} 
                    />
                    <label>State</label>
                    <input 
                        className="form-control" 
                        name="state" 
                        data-type="shipState"
                        onChange={onChange} 
                    />
                    <label>Zip Code</label>
                    <input 
                        className="form-control" 
                        name="zipcode" 
                        data-type="shipZip"
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group col-lg-12 col-md-12">
                    <button type="submit" className="btn btn-default">
    		Submit Address
    	      </button>
                </div>
            </fieldset>
        </form>
    </div>
)

export default AddressForm;