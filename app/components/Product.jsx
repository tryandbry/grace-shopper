import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItem } from '../reducers/cart';
import ProductQuantityChanger from './ProductQuantityChanger';

// userId getting passed in through props, will bomId or need grab bomId in db

class Product extends Component {

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
        
        let smallProduct = (
            ({ id, name, image, cost, description, inventory, updated_at }) => 
            ({ id, name, image, cost, description, inventory, updated_at })
        )(product);
        
        getItem(smallProduct, this.state.quantity, userId);
        this.setState({ quantity: 0 });
    }

    render() {
        const product = this.props.selectedProduct;
        const addItemToCart = this.addItemToCart;

        return (
            <div className="product">
                <div>
                    <h3>{product.name}</h3>
                    <img src={product.image} className="img-thumbnail" />
                    <small> {product.description} </small>
                    <span> {product.inventory} </span> 
                    <span> {product.cost} </span>
                    
                    <ProductQuantityChanger 
                        changeQuantity={this.changeQuantity}
                        handleChange={this.handleChange}
                        quantity={this.state.quantity}
                    />
                    
                    <button 
                        type="button"
                        className="btn btn-success" 
                        onClick={addItemToCart}
                    >Add Rock
                    </button>
                </div>
                <div>
                    {
                        product.reviews && product.reviews.map(review => (
                            <div key={review.id}>
                                <h5><span>{review.user.fullName}</span></h5>
                                <small>{review.text}</small>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}


const mapState = (state) => ({
    selectedProduct : state.product.product,
    userId : state.auth.id
});
const mapDispatch = dispatch => dispatch => ({
    getItem : (product, quantity, userId) => dispatch(getItem(product, quantity, userId))
});

export default connect(mapState, mapDispatch)(Product);