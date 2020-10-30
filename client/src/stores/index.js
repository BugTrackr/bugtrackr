import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from '../reducers/user';
import bugReducer from '../reducers/bug';
import projectReducer from '../reducers/project';

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const reducers = combineReducers({
    user: userReducer,
    projects: projectReducer,
    bugs: bugReducer,
  });
  const store = createStore(reducers, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers/user.js', () =>
      store.replaceReducer(rootReducer)
    );
  }

  return store;
}
