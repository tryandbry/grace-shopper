import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItem } from '../reducers/cart';

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

        return (
            <div className="product">
                <div>
                    <h3>{product.name}</h3>
                    <img src={product.image} className="img-thumbnail" />
                    <small> {product.description} </small>
                    <span> {product.inventory} </span> 
                    <span> {product.cost} </span>
                    <div className="col-lg-2">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button 
                                    className="btn btn-default value-control" 
                                    data-action="minus" 
                                    data-target="font-size" 
                                    onClick={() => this.handleMinusQuantity()} 
                                ><span className="glyphicon glyphicon-minus"></span>-
                                </button>
                            </span>
                            <input 
                                type="text" 
                                onChange={this.handleChange} 
                                value={this.state.quantity} 
                                className="form-control" 
                                id="font-size" 
                            />
                            <span className="input-group-btn">
                                <button 
                                    className="btn btn-default value-control" 
                                    data-action="plus" 
                                    data-target="font-size" 
                                    onClick={() => this.handleAddQuantity()}
                                ><span className="glyphicon glyphicon-plus"></span>+
                                </button>
                            </span>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-success" 
                        onClick={() => addItemToCart(product, this.state.quantity, 1)}
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


function mapState(state) {
    return { selectedProduct: state.product.product };
}

const mapDispatch = {
    getItem,
};

export default connect(mapState, mapDispatch)(Product);