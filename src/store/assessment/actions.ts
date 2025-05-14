
import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  FetchQuestionPayload,
  FetchQuestionSuccessAction,
  FetchQuestionFailureAction,
  RESET_ASSESSMENT,
  ResetAssessmentAction,
} from "./types";

export const fetchQuestion = (payload: FetchQuestionPayload) => ({
  type: FETCH_QUESTION_REQUEST,
  payload,
});

export const fetchQuestionSuccess = (aiHistory: any[], response: string): FetchQuestionSuccessAction => ({
  type: FETCH_QUESTION_SUCCESS,
  payload: { aiHistory, response },
});

export const fetchQuestionFailure = (error: string): FetchQuestionFailureAction => ({
  type: FETCH_QUESTION_FAILURE,
  payload: error,
});

export const resetAssessment = (): ResetAssessmentAction => ({
  type: RESET_ASSESSMENT,
});
