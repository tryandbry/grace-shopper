import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postItem , deleteItem, putItem } from '../reducers/cart';
import { createReview, averageRating  } from '../reducers/product';
import store from '../store';
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
            quantity: this.props.productOrItem.quantity || 1,
            review: '',
            dirty: false,
            stars: 0
        }
        
        this.changeQuantity = this.changeQuantity.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addItemToCart = this.addItemToCart.bind(this);
        this.removeItemFromCart = this.removeItemFromCart.bind(this);
        this.handleReviewForm = this.handleReviewForm.bind(this);
        this.handleStarChange = this.handleStarChange.bind(this);
        this.onReviewSubmit = this.onReviewSubmit.bind(this);
    }


    componentDidMount() {
        if(this.props.product.id) {
            console.log('!!!!!!!!!!!!!!!!', this.props.product.id);
             store.dispatch(averageRating(this.props.product.id))
        }
    }

    changeQuantity(e) {
        e.preventDefault();
        const plusOrMinus = e.target.getAttribute('data-action');
        const { productOrItem, type, putItem, userId } = this.props;
        const maxQuantity = (type == 'Item')
            ? productOrItem.product.inventory
            : productOrItem.inventory;
        
        let newQuantity = this.state.quantity;
        if (plusOrMinus == 'plus' && (this.state.quantity < maxQuantity)) 
            newQuantity++;
        else if (plusOrMinus == 'minus' && (this.state.quantity > 0)) 
            newQuantity--;
        else return;
        
        if (type == 'Item')
            this.props.putItem(productOrItem.product.id, newQuantity, userId);
        
        this.setState({ quantity : newQuantity })
    }

    handleChange(evt) {
        // form
        const value = +evt.target.value;
        if (isNaN(value)) return;
        
        if (this.props.type == 'Item') {
            const { putItem, productOrItem, userId } = this.props
            this.props.putItem(productOrItem.product.id, value, userId)
        }
        
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
        
        this.props.postItem(smallProduct, this.state.quantity, userId);
        
    }

    removeItemFromCart(e) {
        // button on Cart
        e.preventDefault();
        
        // should we do an undo?? Like, when you delete an item, you can undo it
        // maybe the item turns pale but doesn't delete until later!
        // will worry about it later
        
        const { productOrItem, userId, deleteItem } = this.props;
        this.props.deleteItem(productOrItem, userId);
        this.setState({ quantity: 0 });
    }

    handleReviewForm(e) {
        const review = e.target.value
        console.log('real time review input ', review);
        this.setState({
            review,
            dirty: true
        });
    }

    handleStarChange(e) {
        const stars = e.target.value
        console.log('how many stars? ', stars)
        this.setState({
            stars
        });
    }

    onReviewSubmit(e) {
        // e.preventDefault();
        if (this.state.dirty) {
             this.props.createReview(this.state.stars, this.state.review, this.props.userId, this.props.product.id); 
        }
        location.reload();
    }

    render() {
        const { type, productOrItem } = this.props;

        console.log('props is????? ', this.props)
        
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
                handleReviewForm={this.handleReviewForm}
                handleStarChange={this.handleStarChange}
                onReviewSubmit={this.onReviewSubmit}
              />
        }</div>)
    }
}


const mapState = (state) => ({
    userId : state.auth.id
});
const mapDispatch = {
    postItem,
    deleteItem,
    putItem,
    createReview
};

export default connect(mapState, mapDispatch)(ProductOrItemContainer);