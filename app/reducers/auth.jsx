import axios from 'axios'
import { getCart } from './cart'

// actions
const AUTHENTICATED = 'AUTHENTICATED'

// action-creators
export const authenticated = user => ({
    type: AUTHENTICATED, 
    user: user || {}
})


// // test user as auth is not working yet
// const testUser = {
//     id : 2,
//     email : "pikachu@pokemon.com",
//     firstName : "Pika",
//     lastName : "Pikachu",
//     isAdmin : false,
//     triggerNewPassword : false,
//     cart_id : 2
// }

// reducer
export default function reducer (state={}, action) {
    switch (action.type) {
        case AUTHENTICATED:
            return action.user // || testUser
    }
    return state
}

// action-dispatchers
export const newUser = (firstName,lastName,email,password)=>
  dispatch => axios
        .post('/api/user',{firstName,lastName,email,password})

export const login = (username, password) =>
  dispatch => axios
        .post('/api/auth/login/local', {username, password})
        .then(() => dispatch(whoami()))
        .catch(() => dispatch(whoami()))

export const logout = () =>
    dispatch => axios
        .post('/api/auth/logout')
        .then(() => dispatch(whoami()))
        .catch(() => dispatch(whoami()))

export const whoami = () =>
    dispatch => axios
        .get('/api/auth/whoami')
        .then(res => res.data)
        .then(user => dispatch(authenticated(user)))
        .catch(err => dispatch(authenticated(null)))
        .then(auth => dispatch(getCart(auth.user.id)))
        .catch(console.error.bind(console));
