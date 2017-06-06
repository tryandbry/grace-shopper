import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCategory } from '../reducers/catalog';

const FilterCategory = (props) => {
    const categories = props.categories;
    const selectCategory = props.selectCategory;

    return (
        <div>
        <ul className="list-group">
            <li 
                className="list-group-item"
                onMouseOver={() => selectCategory('all')}
            >
                all
            </li>
            { 
                categories && categories
                    .map(category => (
                        <li 
                            className="list-group-item"
                            key={category.id}
                            onMouseOver={() => selectCategory(category.id)}
                        >
                            {category.name}
                        </li>
                    ))
            }
        </ul>
        </div>
    );
}


const mapState = (state) => ({
    categories : state.catalog.categories,
});
const mapDispatch = (dispatch) => ({
    selectCategory : function (id) {
        dispatch(getSelectedCategory(id));
    }
});
export default connect(mapState, mapDispatch)(FilterCategory);