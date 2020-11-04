import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import dateReducer from "./reducers/dateReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  date: dateReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
