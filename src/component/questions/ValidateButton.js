import React, {  useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { QuestionDetailsContext } from "context/QuestionDetailsContext";
import { UserContext } from "context/UserContext";
import { Button } from "style/js/CommonStyles";
import { api_validateQuestion } from "api/questionConnection";
import { handleError } from "util/errorUtil";

export default function ValidateButton() {
  const history = useHistory();
  const { rolesState, isExpired } = useContext(UserContext);
  const roles = rolesState[0];

  const { selectedQuestionState } = useContext(QuestionDetailsContext);
  const question = selectedQuestionState[0];

  useEffect(() => {
    isExpired();
  }, [])

  const validateQuestion = async () => {
    try {
      await api_validateQuestion(question.id);
      alert(`Question ${question.id} validated successfully.`);
      history.push('/questions');
    } catch(error) {
      handleError(error);

    }
  }

  return question == null || question.validated ? (
    <React.Fragment></React.Fragment>
  ) : roles.includes("ROLE_ADMIN") ? (
    <Button onClick={validateQuestion}>Validate</Button>
  ) : (
    <React.Fragment></React.Fragment>
  );
  }
