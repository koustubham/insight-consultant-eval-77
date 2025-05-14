
import { createStore, applyMiddleware, Middleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer, { RootState } from "./rootReducer";
import rootSaga from "./rootSaga";
import { AssessmentActionTypes } from "./assessment/types";

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

// Create store with properly typed configuration
const store: Store<RootState, AssessmentActionTypes> = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export default store;
