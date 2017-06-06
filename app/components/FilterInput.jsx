import react from 'react';

const FilterInput = (props) => {
    const onChange = props.onChange;
    const inputValue = props.inputValue;
    
    return (
        <form className='form-group' style={{marginTop: '20px'}}>
        <input
            onChange={onChange}
            value={inputValue}
            className='form-control'
            placeholder="search"
        />
        </form>
    );
}

export default FilterInput;