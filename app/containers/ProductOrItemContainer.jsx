import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postItem , deleteItem, putItem } from '../reducers/cart';
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
            quantity: this.props.productOrItem.quantity || 1
        }
        
        this.changeQuantity = this.changeQuantity.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addItemToCart = this.addItemToCart.bind(this);
        this.removeItemFromCart = this.removeItemFromCart.bind(this);
    }

    changeQuantity(e) {
        e.preventDefault();
        const plusOrMinus = e.target.getAttribute('data-action');
        const { productOrItem, type, putItem, userId } = this.props;
        const maxQuantity = (type == "Item")
            ? productOrItem.product.inventory
            : productOrItem.inventory;
        
        let newQuantity = this.state.quantity;
        if (plusOrMinus == 'plus' && (this.state.quantity < maxQuantity)) 
            newQuantity++;
        else if (plusOrMinus == 'minus' && (this.state.quantity > 0)) 
            newQuantity--;
        else return;
        
        // change store and session/db if you are on the
        // Cart -> this -> Item -> ProductQuantityChanger flow
        if (type == "Item")
            putItem(productOrItem.product.id, newQuantity, userId);
        
        this.setState({ quantity : newQuantity })
    }

    handleChange(evt) {
        // form
        const value = +evt.target.value;
        if (isNaN(value)) return;
        this.setState({ quantity: value })
    }
    
    addItemToCart(e) {
        // button on Product 
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
        // button on Cart
        e.preventDefault();
        
        // should we do an undo?? Like, when you delete an item, you can undo it
        // maybe the item turns pale but doesn't delete until later!
        // will worry about it later
                
        const { productOrItem, userId, deleteItem } = this.props;
        deleteItem(productOrItem, userId);
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
    deleteItem : (itemId, userId) => dispatch(deleteItem(itemId, userId)),
    putItem : (productId, quantity, userId) => dispatch(putItem(productId, quantity, userId))
});

export default connect(mapState, mapDispatch)(ProductOrItemContainer);