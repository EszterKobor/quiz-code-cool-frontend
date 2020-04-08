import React, {  useContext } from "react";
import { useHistory } from "react-router-dom";
import { QuestionDetailsContext } from "context/QuestionDetailsContext";
import { UserContext } from "context/UserContext";
import { Button } from "style/MyStyle";

export default function ValidateButton() {
  const history = useHistory();
  const { rolesState } = useContext(UserContext);
  const roles = rolesState[0];

  const { selectedQuestionState, validate } = useContext(QuestionDetailsContext);
  const question = selectedQuestionState[0];

  const validateQuestion = () => {
    validate(history);
  }

  return question == null || question.validated ? (
    <React.Fragment></React.Fragment>
  ) : roles.includes("ROLE_ADMIN") ? (
    <Button onClick={validateQuestion}>Validate</Button>
  ) : (
    <React.Fragment></React.Fragment>
  );
}