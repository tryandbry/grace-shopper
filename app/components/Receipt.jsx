import React from 'react'
import {connect} from 'react-redux';
import Bom from './Bom';

class Receipt extends React.Component{
  constructor(){
    super();
  }

  render(){

    return (
      <div>
	  <h2>Receipt</h2>
	  <p>Thank you for your purchase!</p>
	  <Bom />
      </div>
    )
  }
}

const mapState = (state)=>state;

export default connect(mapState)(Receipt);
