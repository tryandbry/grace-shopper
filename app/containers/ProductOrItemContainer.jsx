import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postItem , deleteItem } from '../reducers/cart';
// import ProductQuantityChanger from './ProductQuantityChanger';
import Product from '../components/Product';
import Item from '../components/Item';

/*
    Renders Product or Item with the buttons ProductQuantityChanger

    Must take 
        props.type = "Item" || "Product"
        props.productOrItem = {...}
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
        this.removeItemFromCart = this.removeItemFromCart.bind(this);
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
        
        const { product, userId, postItem } = this.props;
        
        // rm eager loaded lists (reviews, categories)
        let smallProduct = (
            ({ id, name, image, cost, description, inventory, updated_at }) => 
            ({ id, name, image, cost, description, inventory, updated_at })
        )(product);
        
        postItem(smallProduct, this.state.quantity, userId);
        
    }

    removeItemFromCart(e) {
        e.preventDefault();
        
        // should we do an undo?? Like, when you delete an item, you can undo it
        // like, the item turns pale but doesn't delete until later!
        // will worry about it later
        
        const { productOrItem, userId, deleteItem } = this.props;
        deleteItem(productOrItem.product.id, userId);
        this.setState({ quantity: -1 });
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
                removeItemFromCart={this.removeItemFromCart}
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
    postItem : (product, quantity, userId) => dispatch(postItem(product, quantity, userId)),
    deleteItem : (itemId, userId) => dispatch(deleteItem(itemId, userId))
});

export default connect(mapState, mapDispatch)(ProductOrItemContainer);