import React from 'react'

export default class AddressForm extends React.Component {
  constructor(){
    super();
  }

  render(){
    const onChangeAddress1 = this.props.onChangeAddress1;
    const onChangeAddress2 = this.props.onChangeAddress2;
    const onChangeCity = this.props.onChangeCity;
    const onChangeState = this.props.onChangeState;
    const onChangeZip = this.props.onChangeZip;
    const onSubmit = this.props.onSubmit;
    const title = this.props.title;

    return(
      <div>
	<h2>Address Form</h2>
	<form className="form-horizontal" onSubmit={onSubmit}>
	  <fieldset>
	    <legend>{title}</legend>
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
	    <div className="form-group">
	      <button
		type="submit"
		className="btn btn-success">
		Submit Address
	      </button>
	    </div>
	  </fieldset>
	</form>
      </div>
    )
  }
}

/*
export default AddressForm = (props)=>{
  const onChangeAddress1 = props.onChangeAddress1;
  const onChangeAddress2 = props.onChangeAddress2;
  const onChangeCity = props.onChangeCity;
  const onChangeState = props.onChangeState;
  const onChangeZip = props.onChangeZip;
  const onSubmit = props.onSubmit;
  
  console.log("AddressForm props:",props);
  return (
    <div>
      <h2>Address Form</h2>
    </div>
  )
}
*/

    /*
    <div>
      <form className="form-horizontal" onSubmit={onChange}>
        <fieldset>
	  <legend>Address</legend>
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
	  <div className="form-group">
	    <button
	      type="submit"
	      className="btn btn-success">
	      Submit Address
	    </button>
	  </div>
	</fieldset>
      </form>
    </div>
    */
