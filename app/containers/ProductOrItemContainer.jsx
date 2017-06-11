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
            /* 
            this doesn't work well, 
            item passes undefined for some unknown reason to this prop, 
            even though it really really shouldn't
            this is fixed in the backend
            */ 
            quantity: this.props.quantity || 1
            // quantity: 1
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
        
        console.log('quantity', this.props.quantity, this.state.quantity)
        
        let maxQuantity;
        if (type == "Item") {
            maxQuantity = productOrItem.product.inventory;
            console.log('ITEM QUANTITY', this.state.quantity)
        } else {
            maxQuantity = productOrItem.inventory;
        }
        
        let newQuantity;
        if (plusOrMinus == 'plus' && (this.state.quantity < maxQuantity)) 
            newQuantity = 1;
        else if (plusOrMinus == 'minus' && (this.state.quantity > 0)) 
            newQuantity = -1;
        else 
            return;
        
        // set state
        // also change store and session/db if you are on the
        // Cart -> this -> Item -> ProductQuantityChanger flow
        if (type == "Item") {
            putItem(productOrItem.product.id, newQuantity, userId);
            this.setState({ quantity : newQuantity })
        } else
            this.setState({ quantity : this.state.quantity + newQuantity })
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