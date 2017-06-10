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
        this.handleAddQuantity = this.handleAddQuantity.bind(this);
        this.handleMinusQuantity = this.handleMinusQuantity.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleAddQuantity() {
        this.setState({
            quantity: this.state.quantity + 1
        })
        console.log('the quantity is? ', this.state.quantity);
    }

    handleMinusQuantity() {
        if (this.state.quantity - 1) {
            this.setState({
                quantity: parseInt(this.state.quantity - 1)
            })
        }
        console.log('minus.. ', this.state.quantity)
    }

    handleChange(evt) {
        const value = evt.target.value;
        if (value === "") {
            this.setState({
                quantity: ""
            })
        }
        else {
            if (!value.match(/[^0-9"]/)) {
                this.setState({
                    quantity: +value
                })
            }

        }
    }

    render() {
        const product = this.props.selectedProduct;
        const addItemToCart = this.props.getItem;
        const userId = this.props.userId;

        return (
            <div className="product">
                <div>
                    <h3>{product.name}</h3>
                    <img src={product.image} className="img-thumbnail" />
                    <small> {product.description} </small>
                    <span> {product.inventory} </span> 
                    <span> {product.cost} </span>
                    
                    <ProductQuantityChanger 
                        handleAddQuantity={this.handleAddQuantity}
                        handleMinusQuantity={this.handleMinusQuantity}
                        handleChange={this.handleChange}
                        quantity={this.state.quantity}
                    />
                    
                    <button 
                        type="button" 
                        className="btn btn-success" 
                        onClick={() => addItemToCart(product, this.state.quantity, userId)}
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
    selectedProduct: state.product.product,
    userId: state.auth.id
});
const mapDispatch = {
    getItem,
};

export default connect(mapState, mapDispatch)(Product);