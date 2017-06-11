import React from 'react'
import { connect } from 'react-redux'
import ProductOrItemContainer from '../containers/ProductOrItemContainer'

const ProductContainer = ({ product }) => (
    <ProductOrItemContainer 
        type="Product"
        productOrItem={product}
        key={product.id}
        selectedProduct={product}
    />
)

const mapState = state => ({
    product : state.product.product
});
export default connect(mapState)(ProductContainer);