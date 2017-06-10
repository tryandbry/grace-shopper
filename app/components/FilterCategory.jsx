import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCategory } from '../reducers/catalog';

const FilterCategory = (props) => {
    const categories = props.categories;
    const selectCategory = props.selectCategory;

    console.log("Categories: ",categories);

    return (
        <div id="filtercategories">
	  <h3>Categories</h3>
	  <div className="radio">
	    <label>
	      <input 
	        type="radio"
		name="categoryRadios"
		id="categoryAll"
		value="all"
		onChange={()=>selectCategory('all')}
	      />all
	    </label>
	  </div>
	  {categories && categories.map(category =>
	    <div className="radio">
	      <label>
		<input 
		  type="radio"
		  name="categoryRadios"
		  id={`category${category.name}`}
                  value={category.id}
                  onChange={()=>selectCategory(category.id)}
		/>{category.name}
	      </label>
	    </div>
	  )}
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
