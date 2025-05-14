
import { applyMiddleware, createStore, Middleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

// Create store with proper type configuration
const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export default store;
