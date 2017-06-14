import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCategory } from '../reducers/catalog';
//import { Link } from 'react-router';


const CategoryItem = ({category,i,selectCategory})=>{

  return (
    <div className="radio" key={i}>
      <label>
	<input 
	  type="radio"
	  name="categoryRadios"
	  id={`category${category.name}`}
	  value={category.id}
	  onChange={()=>selectCategory(category.name)}
	/>{category.name}
      </label>
    </div>
  )
}


const FilterCategory = ({categories, selectCategory}) => {
    //const categories = props.categories;
    //const selectCategory = props.selectCategory;

    //console.log("Categories: ",categories);
    const allProps = {
      name: 'All',
      id: 'all',
    };

    return (
        <div id="filtercategories">
	  <h3>Categories</h3>
	  <CategoryItem category={allProps} i={10} selectCategory={selectCategory} />
	  {categories && categories.map((category,i) =>
	    <CategoryItem category={category} i={i} selectCategory={selectCategory} />
	  )}
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
