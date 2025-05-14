
import { call, put, select, takeLatest } from "redux-saga/effects";
import { FETCH_QUESTION_REQUEST, FetchQuestionRequestAction } from "./types";
import { fetchQuestionSuccess, fetchQuestionFailure } from "./actions";
import { assessmentQuestionaire } from "../../services/api";

export function* handleFetchQuestion(action: FetchQuestionRequestAction): any {
  try {
    const currentHistory = yield select((state) => state.assessment.aiHistory);
    const requestBody = {
      current_user_message: {
        type: 1,
        content: action.payload.content,
      },
      ai_history: currentHistory || [],
    };
    const response = yield call(assessmentQuestionaire, requestBody);
    console.log("🚀 ~ function*handleFetchQuestion ~ response.data:", response.data);
    yield put(fetchQuestionSuccess(response.data.ai_history || [], response.data.response || ""));
  } catch (err: any) {
    yield put(fetchQuestionFailure(err.message || "Something went wrong"));
  }
}

export default function* assessmentSaga() {
  yield takeLatest(FETCH_QUESTION_REQUEST, handleFetchQuestion);
}
