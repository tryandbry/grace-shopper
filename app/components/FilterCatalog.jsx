import React from 'react';
import { connect } from 'react-redux';
import FilterInput from './FilterInput';
import Catalog from './Catalog';

export default class FilterCatalog extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '';
        }
        
        this.onChange = this.onChange.bind(this);
    }
    
    onChange (e) {
        this.setState({ inputValue : e.target.value })
    }
    
    render () {
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
