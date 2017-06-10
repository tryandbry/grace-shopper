import React from 'react';
import { connect } from 'react-redux';
import { createReview } from '../reducers/user';

function UserPage(props) {
    return (
        <textarea rows="4" cols="50"> know we hit route </textarea>
    )
}

connect()(UserPage);