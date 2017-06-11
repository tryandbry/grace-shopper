import React from 'react';

const FilterInput = ({ onChange, inputValue }) => (
    <form className='form-group' style={{marginTop: '20px'}}>
    <input
        onChange={onChange}
        value={inputValue}
        className='form-control'
        placeholder="search"
    />
    </form>
)

export default FilterInput;