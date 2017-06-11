import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItem } from '../reducers/cart';
// import ProductQuantityChanger from './ProductQuantityChanger';
import Product from '../components/Product';
import Item from '../components/Item';

/*
    Renders Product or Item with the buttons ProductQuantityChanger

    Must take 
        props.type = "Item" || "Product"
        props.productOrItem = {...}
    also set props.key = an id
*/


class ProductOrItemContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }
        
        this.changeQuantity = this.changeQuantity.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addItemToCart = this.addItemToCart.bind(this);
    }

    changeQuantity(e) {
        e.preventDefault();
        const type = e.target.getAttribute('data-action');
        const maxQuantity = this.props.selectedProduct.inventory;
        let newQuantity = this.state.quantity;
        
        if (type == 'plus' && (this.state.quantity < maxQuantity)) newQuantity++
        else if (type == 'minus' && (this.state.quantity > 0)) newQuantity--
        else return;
        
        this.setState({ quantity : newQuantity })
    }

    handleChange(evt) {
        const value = +evt.target.value;
        if (isNaN(value)) return;
        this.setState({ quantity: value })
    }
    
    addItemToCart(e) {
        e.preventDefault();
        if (this.state.quantity == 0) return;
        
        const product = this.props.selectedProduct;
        const userId = this.props.userId;
        const getItem = this.props.getItem;
        
        // rm eager loaded lists (reviews, categories)
        let smallProduct = (
            ({ id, name, image, cost, description, inventory, updated_at }) => 
            ({ id, name, image, cost, description, inventory, updated_at })
        )(product);
        
        getItem(smallProduct, this.state.quantity, userId);
        this.setState({ quantity: 0 });
    }

    render() {
        const { type, productOrItem } = this.props;
                
        return (<div>{
            (type == 'Item')
            ? <Item
                item={productOrItem}
                changeQuantity={this.changeQuantity}
                handleChange={this.handleChange}
                quantity={this.state.quantity}
                addItemToCart={this.addItemToCart}
              />
            : <Product
                product={productOrItem}
                changeQuantity={this.changeQuantity}
                handleChange={this.handleChange}
                quantity={this.state.quantity}
                addItemToCart={this.addItemToCart}
              />
        }</div>)
    }
}


const mapState = (state) => ({
    userId : state.auth.id
});
const mapDispatch = dispatch => dispatch => ({
    getItem : (product, quantity, userId) => dispatch(getItem(product, quantity, userId))
});

export default connect(mapState, mapDispatch)(ProductOrItemContainer);