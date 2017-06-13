import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCategory } from '../reducers/catalog';
import { Link } from 'react-router';

const FilterCategory = ({ categories, selectCategory }) => {
    const renderCategories = () => categories
        .map(category => (
            <Link to={`/catalog/${category.name}`} key={category.id}>
            <li 
                className="list-group-item"
                onClick={() => selectCategory(category.name)}
            >
                {category.name}
            </li>
            </Link>
        ))
    
    
    return (
        <div>
        <ul className="list-group nav nav-stacked nav-collapse">
            <Link to={'/catalog'} key={'all'}>
            <li 
                className="list-group-item"
                onMouseOver={() => selectCategory('all')}
            >
                all
            </li>
            </Link>
            { categories && renderCategories() }
        </ul>
        </div>
    )
}

const mapState = state => ({
    categories : state.catalog.categories,
});
const mapDispatch = dispatch => ({
    selectCategory : id => dispatch(getSelectedCategory(id))
});
export default connect(mapState, mapDispatch)(FilterCategory);