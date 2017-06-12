import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCategory } from '../reducers/catalog';
import { Link } from 'react-router';

const FilterCategory = ({ categories, selectCategory }) => (
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
                    <Link to={`/catalog/${category.name}`} key={category.id}>
                      {/* TODO: mouseover is annoying */}
                    <li 
                        className="list-group-item"
                        onMouseOver={() => selectCategory(category.name)}
                        onClick={() => selectCategory(category.name)}
                    >
                        {category.name}
                    </li>
                    </Link>
                ))
        }
    </ul>
    </div>
)

const mapState = state => ({
    categories : state.catalog.categories,
});
const mapDispatch = dispatch => ({
    selectCategory : id => dispatch(getSelectedCategory(id))
});
export default connect(mapState, mapDispatch)(FilterCategory);
