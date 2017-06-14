import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCategory } from '../reducers/catalog';

const CategoryItem = ({category,getSelectedCategory})=>
    <div className="radio"> 
      <label>
	<input 
	  type="radio"
	  name="categoryRadios"
	  id={`category${category.name}`}
	  value={category.id}
	  onChange={()=>getSelectedCategory(category.name)}
	/>{category.name}
      </label>
    </div>

const FilterCategory = ({categories, getSelectedCategory}) => {
    const allProps = {
      name: 'All',
      id: 'all',
    };

    return (
        <div id="filtercategories">
	  <h3>Categories</h3>
	  <CategoryItem category={allProps} getSelectedCategory={getSelectedCategory} />
	  {categories.length ? categories.map((category,i) =>
	    <CategoryItem category={category} key={i} getSelectedCategory={getSelectedCategory} />
	  ): ""}
        </div>
    )
}

const mapState = state => ({
    categories : state.catalog.categories,
});

const mapDispatch = {getSelectedCategory};

export default connect(mapState, mapDispatch)(FilterCategory);
