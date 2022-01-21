import { combineReducers } from "redux";
import feedback from "./feedbackReducer";
import user from "./userReducer";
export default combineReducers({
  user,
  feedback,
});
