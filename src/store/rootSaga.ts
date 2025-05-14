
import { all } from "redux-saga/effects";
import assessmentSaga from "./assessment/sagas";

export default function* rootSaga() {
  yield all([assessmentSaga()]);
}
