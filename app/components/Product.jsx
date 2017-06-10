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
        const userId = this.props.userId;

        return (
            <div className="container product">
                <div>
                    <div className="row">
                        <h3>{product.name}</h3>
                    </div>
                    <div className="row">
                        <div class="col-lg-2 col-md-2">
                            <img src={product.image} className="img-thumbnail" />
                        </div>
                        <div class="col-lg-2 col-md-2">
                            <span> In Stock: {product.inventory} </span>
                            <span> price: ${product.cost} </span>
                        </div>
                    </div>
                    <small> Product Description: {product.description} </small>
                    <div className="col-lg-2">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button
                                    className="btn btn-default value-control"
                                    data-action="minus"
                                    data-target="font-size"
                                    onClick={() => this.handleMinusQuantity()}
                                ><span className="glyphicon glyphicon-minus"></span>
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
                                ><span className="glyphicon glyphicon-plus"></span>
                                </button>
                            </span>
                        </div>
                    </div>
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