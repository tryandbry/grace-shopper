import React from 'react';

const ProductQuantityChanger = (props) => {
    const handleMinusQuantity = props.handleMinusQuantity;
    const handleAddQuantity = props.handleAddQuantity;
    const handleChange = props.handleChange;
    const quantity = props.quantity
    
    return (
        <div className="col-lg-2">
            <div className="input-group">
                <span className="input-group-btn">
                    <button 
                        className="btn btn-default value-control" 
                        data-action="minus" 
                        data-target="font-size" 
                        onClick={() => handleMinusQuantity()} 
                    ><span className="glyphicon glyphicon-minus"></span>-
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
                        onClick={() => handleAddQuantity()}
                    ><span className="glyphicon glyphicon-plus"></span>+
                    </button>
                </span>
            </div>
        </div>
    )
}

export default ProductQuantityChanger;