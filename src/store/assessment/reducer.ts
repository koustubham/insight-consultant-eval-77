
import {
  AssessmentState,
  AssessmentActionTypes,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  RESET_ASSESSMENT,
} from "./types";

const initialState: AssessmentState = {
  loading: false,
  aiHistory: [],
  latestResponse: null,
  error: null,
};

const assessmentReducer = (
  state = initialState,
  action: AssessmentActionTypes
): AssessmentState => {
  switch (action.type) {
    case FETCH_QUESTION_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        aiHistory: action.payload.aiHistory,
        latestResponse: action.payload.response,
      };
    case FETCH_QUESTION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case RESET_ASSESSMENT:
      return initialState;
    default:
      return state;
  }
};

export default assessmentReducer;
