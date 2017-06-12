import React from 'react';

const ProductQuantityChanger = ({ changeQuantity, handleChange, quantity }) => (
    <div className="container col-lg-12 col-md-12">
        <div className="input-group">
            <span className="input-group-btn">
                <button 
                    className="btn btn-default value-control" 
                    data-action="minus" 
                    data-target="font-size" 
                    onClick={changeQuantity} 
                ><span data-action="minus" className="glyphicon glyphicon-minus"></span>
                </button>
            </span>
            <input 
                type="text" 
                onChange={handleChange} 
                value={quantity}
                className="form-control" 
                id="font-size" 
            />
            <span className="input-group-btn">
                <button 
                    className="btn btn-default value-control" 
                    data-action="plus" 
                    data-target="font-size" 
                    onClick={changeQuantity}
                ><span data-action="plus" className="glyphicon glyphicon-plus"></span>
                </button>
            </span>
        </div>
    </div>
)


export default ProductQuantityChanger;