import React from 'react';
import { connect } from 'react-redux';
import FilterInput from './FilterInput';
import Catalog from './Catalog';

class FilterCatalog extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: ''
        }
        
        this.onChange = this.onChange.bind(this);
    }
    
    onChange (e) {
        this.setState({ inputValue : e.target.value })
    }
    
    render () {
        console.log('filterCatalog component props', this.props)
        const inputValue = this.state.inputValue;
        const filteredProducts = this
            .props
            .products
            .filter(product => product.name.match(inputValue));
        
        return (
            <div>
            <FilterInput 
                inputValue={inputValue}
                onChange={this.onChange}
            />
            <Catalog products={filteredProducts} />
            </div>
        );
    }
}

const mapState = (state) => ({
    products : state.catalog.products,
    categories : state.catalog.categories
});
export default connect(mapState)(FilterCatalog);

