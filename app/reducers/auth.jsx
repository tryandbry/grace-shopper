import axios from 'axios'

const reducer = (state=null, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            return action.user
    }
    
    return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

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

const createGuest = user => 
    dispatch => axios
        .post('/api/user', user)
        .then(res => res.data)
        .then(user => {
            console.log('creating guest user', user)
            return dispatch(authenticated(user))
        })
        .catch(() => dispatch(authenticated(null)));

/*
in the whoami
consider having the error propagate somehow from 
    the backend route /api/user
    the thunk createGuest
    and this whoami function
right now the error is only show on the backend express server terminal
which is unfortunate

basically if the same user email is used, then the database thows a 500 err
but then doesn't tell the browser
so the browser doesn't do any authentication action!! instead of what we want
which is for the browser to authenticate(null);
(but actually never actually authenticate null because we make good emails)
*/
export const whoami = () =>
    dispatch => axios
        .get('/api/auth/whoami')
        .then(res => res.data)
        .then(user => {
            if (user) return authenticated(user);
            else return createGuest({email : "asdfasdfasdf5@gmail.com"});
        })
        .then(dispatch)
        .catch(() => dispatch(authenticated(null)))

export default reducer
