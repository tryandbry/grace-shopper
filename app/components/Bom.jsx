import React from 'react'
import {connect} from 'react-redux';
import {fetchBom} from '../reducers/bom';

class Bom extends React.Component {
  constructor(){
    super();
  }

  render(){
    console.log("Bom component hit!",this.props);

    const bom_id = +this.props.routeParams.id;
    const fetchBom = this.props.fetchBom;
    fetchBom(bom_id);

    return(
      <div>
	<h2>BOM</h2>

      </div>
    )
  }
}

const mapState = null;
const mapDispatch = {fetchBom};

export default connect(mapState,mapDispatch)(Bom);
