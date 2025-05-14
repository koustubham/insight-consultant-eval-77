
export interface AiHistoryItem {
  input: string;
  output: string;
}

export interface AssessmentState {
  loading: boolean;
  aiHistory: AiHistoryItem[];
  latestResponse: string | null;
  error: string | null;
}

export const FETCH_QUESTION_REQUEST = "FETCH_QUESTION_REQUEST";
export const FETCH_QUESTION_SUCCESS = "FETCH_QUESTION_SUCCESS";
export const FETCH_QUESTION_FAILURE = "FETCH_QUESTION_FAILURE";
export const RESET_ASSESSMENT = "RESET_ASSESSMENT";

export interface FetchQuestionPayload {
  content: string;
}

export interface FetchQuestionRequestAction {
  type: typeof FETCH_QUESTION_REQUEST;
  payload: FetchQuestionPayload;
}

export interface FetchQuestionSuccessAction {
  type: typeof FETCH_QUESTION_SUCCESS;
  payload: {
    aiHistory: AiHistoryItem[];
    response: string;
  };
}

export interface FetchQuestionFailureAction {
  type: typeof FETCH_QUESTION_FAILURE;
  payload: string;
}

export interface ResetAssessmentAction {
  type: typeof RESET_ASSESSMENT;
}

export type AssessmentActionTypes =
  | FetchQuestionRequestAction
  | FetchQuestionSuccessAction
  | FetchQuestionFailureAction
  | ResetAssessmentAction;
