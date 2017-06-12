import React from 'react'
import {connect} from 'react-redux';
import {printPrice} from 'APP/utils';

const TAX_RATE = 0.11;

class Bom extends React.Component {
  constructor(){
    super();

    this.assembleLineItems = this.assembleLineItems.bind(this);
  }

  // Name: assembleLineItems
  // Purpose: Assembles line item data from this.props.bom
  // ----------------------------------
  assembleLineItems(){
    return this.props.bom.items.reduce((sum,item,n)=>{
      sum.push({
               id : this.props.bom.items[n].id,
	     name : this.props.bom.products[n].name,
      description : this.props.bom.products[n].description,
            price : this.props.bom.items[n].cost,
         quantity : this.props.bom.items[n].quantity,
         extended : this.props.bom.items[n].cost *
	            this.props.bom.items[n].quantity,
      });
      return sum;
    },[]);
  }

  render(){
    console.log("Bom component hit!",this.props);

    const shipping = this.props.bom.shipping;
    const id = this.props.bom.id;
    const lineItems = this.assembleLineItems();
    const subtotal = lineItems.reduce(
      (sum,e)=>sum+=e.extended,0);
    const tax = subtotal * TAX_RATE;
    const shippingAndHandling = subtotal * .01;
    const grandtotal = subtotal + tax + shippingAndHandling;

    return(
      <div className="col-lg-12 col-md-12">
	<h2>Invoice</h2>
	<div id="shipping" className="table-responsive">
	  <h3>Order {id}</h3>
	  <table className="table">
	    <thead>
	      <tr>
		<th>Shipping Address</th>
	      </tr>
	    </thead>
	    <tbody>
	      <tr>
		<td>{shipping}</td>
	      </tr>
	    </tbody>
	  </table>
	  <table className="table table-striped">
	    <thead>
	      <tr>
		<th colSpan={6}>Line Items</th>
	      </tr>
	    </thead>
	    <tbody>
	        <tr>
		  <th>Item</th>
		  <th>Name</th>
		  <th>Description</th>
		  <th>Unit Price</th>
		  <th>Quantity</th>
		  <th>Extended Price</th>
		</tr>
	        {lineItems.map(lineitem=>
		  <tr key={lineitem.id}>
		    <td>{lineitem.id}</td>
		    <td>{lineitem.name}</td>
		    <td>{lineitem.description}</td>
		    <td>{printPrice(lineitem.price)}</td>
		    <td>{lineitem.quantity}</td>
		    <td>{printPrice(lineitem.extended)}</td>
		  </tr>
		)}
	    </tbody>
	  </table>
	  <br />
	  <div className="col-lg-6 col-md-6">
	    <table className="table table-bordered">
	      <tbody>
		<tr>
		  <td>Subtotal</td>
		  <td>{printPrice(subtotal)}</td>
		</tr>
		<tr>
		  <td>Tax</td>
		  <td>{printPrice(tax)}</td>
		</tr>
		<tr>
		  <td>Shipping and Handling</td>
		  <td>{printPrice(shippingAndHandling)}</td>
		</tr>
		<tr>
		  <td>Grand Total</td>
		  <td>{printPrice(grandtotal)}</td>
		</tr>
	      </tbody>
	    </table>
	  </div>
	</div>
      </div>
    )
  }
}

const mapState = state=>Object.assign({},state);

export default connect(mapState)(Bom);
