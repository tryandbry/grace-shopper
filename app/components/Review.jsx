import React from 'react'
import Cart from'./Cart'
import { connect } from 'react-redux'

const Review = ({ onSubmitBuy, title, items }) => (
    <div className="container">
        <div className="row">
            <h2>{title}</h2>
        </div>
        <div className="row">
            <Cart items={items} />
        </div>
        <div className="row">
            <div className="form-group col-lg-12 col-md-12">
                <button type="submit" className="btn btn-default" onClick={onSubmitBuy}>
    	            Buy!
                </button>
            </div>
        </div>
    </div>
)

const mapState = state => ({
    items : state.cart.items
})

export default connect(mapState)(Review)