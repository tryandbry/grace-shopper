import React from 'react'
import {connect} from 'react-redux';
import {fetchBom} from '../reducers/bom';

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

  // Name: printPrice
  // Purpose: Formats a float into a "price" string
  // ----------------------------------
  printPrice(num){
    let temp = `${num}`.split('.');
    let cents;
    let dollars = "";
    let buffer = temp[0].split('');
    //process dollars
    for(let i=0;buffer.length;i++){
      if(i != 0 && i%3 == 0) dollars = ',' + dollars;
      dollars = buffer.pop() + dollars;
    }
    //process cents
    if(temp.length == 1) cents = "00";
    if(temp.length == 2){
      cents = temp[1].slice(0,2);
      for(let i=cents.length;i<2;i++){
	cents += "0";
      }
    }
    return `$${dollars}.${cents}`;
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
      <div>
	<h2>BOM</h2>
	<div id="shipping">
	  <h3>Order {id}</h3>
	  <table>
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
	  <table>
	    <thead>
	      <tr>
		<th>Line Items</th>
	      </tr>
	    </thead>
	    <tbody>
	        <tr>
		  <td>Item</td>
		  <td>Name</td>
		  <td>Description</td>
		  <td>Unit Price</td>
		  <td>Quantity</td>
		  <td>Extended Price</td>
		</tr>
	        {lineItems.map(lineitem=>
		  <tr key={lineitem.id}>
		    <td>{lineitem.id}</td>
		    <td>{lineitem.name}</td>
		    <td>{lineitem.description}</td>
		    <td>{this.printPrice(lineitem.price)}</td>
		    <td>{lineitem.quantity}</td>
		    <td>{this.printPrice(lineitem.extended)}</td>
		  </tr>
		)}
	    </tbody>
	  </table>
	  <br />
	  <table>
	    <tbody>
	      <tr>
	        <td>Subtotal</td>
	        <td>{this.printPrice(subtotal)}</td>
	      </tr>
	      <tr>
	        <td>Tax</td>
	        <td>{this.printPrice(tax)}</td>
	      </tr>
	      <tr>
	        <td>Shipping and Handling</td>
	        <td>{this.printPrice(shippingAndHandling)}</td>
	      </tr>
	      <tr>
	        <td>Grand Total</td>
	        <td>{this.printPrice(grandtotal)}</td>
	      </tr>
	    </tbody>
	  </table>
	</div>
      </div>
    )
  }
}

const mapState = state=>Object.assign({},state);

const mapDispatch = {fetchBom};

export default connect(mapState,mapDispatch)(Bom);
