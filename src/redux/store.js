import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createHashHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import reducer from "./reducers";

// create history object
export const history = createHashHistory();

const store = createStore(
    combineReducers({
        data: reducer,
        router: connectRouter(history),
      }),
);

export default store;