import React from 'react'
import Cart from'./Cart'
import { connect } from 'react-redux'

const Review = ({ onSubmit, title, items }) => (
    <div className="container">
        <div className="row">
            <h2>{title}</h2>
        </div>
        <div className="row">
            <Cart items={items} />
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-12">
                <button className="btn btn-default" onClick={onSubmit}>
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