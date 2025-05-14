
import { combineReducers } from "redux";
import assessmentReducer from "./assessment/reducer";

const rootReducer = combineReducers({ assessment: assessmentReducer });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
