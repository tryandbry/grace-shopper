import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { whoami } from './reducers/auth'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      createLogger({collapsed: true})
    )
  )
)

export default store

store.dispatch(whoami());

/*
this sets the auth info at the start, when store is initiated
    by fetching the user - very useful!!
res is a promise, because whoami() returns a promise on user
the response of the dispatch function is { type , user }

If res.then(user => exists), don't do anything else
Else, create user for unauthenticated user
and save to store!

putting this here means it is forced to be the first action!
so smart
*/
