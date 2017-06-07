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
        e.preventDefault();
        this.setState({ inputValue : e.target.value })
    }
    
    render () {
        // console.log('filterCatalog component props', this.props)
        const inputValue = this.state.inputValue;
        const selectedCategory = this.props.selectedCategory;
        
        let filteredProducts = this
            .props
            .products
            .filter(product => product.name.match(inputValue));
        
        if (selectedCategory) {
            filteredProducts = filteredProducts
                .filter(product => product
                    .categories
                    .reduce((prev, category) =>
                        prev && (category.id == selectedCategory.id)
                    , false)
                );
        }
        
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
    selectedCategory : state.catalog.selectedCategory
});
export default connect(mapState)(FilterCatalog);

