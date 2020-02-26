import React, { useState, useContext } from "react";
import { QuestionContext } from "../../context/QuestionContext";
import { PlayerContext } from "../../context/PlayerContext";
import { ProgressContext } from "../../context/ProgressContext";

import Answers from "./Answers";
import PlayerData from "./PlayerData";

import {
  QuestionCardContainer,
  QuestionContainer,
  H3,
  CategoryTitle,
  Button
} from "../../style/MyStyle";

export default function QuestionCard(props) {
  const [questionNumber, setQuestionNumber] = useState(1);

  const questionColors = {
    empty: "none",
    success: "rgba(92, 216, 43, 0.5)",
    failed: "rgba(216, 43, 43, 0.5)"
  };
  const [questionColor, setQuestionColor] = useState(questionColors.empty);

  const { allQuestionsState, currentQuestionIndexState } = useContext(
    QuestionContext
  );

  const questions = allQuestionsState[0];
  const [
    currentQuestionIndex,
    setCurrentQuestionIndex
  ] = currentQuestionIndexState;

  const players = useContext(PlayerContext)[0];
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const { readyToProceed, correctness } = useContext(ProgressContext);
  const [isReadyToProceed, setIsReadyToProceed] = readyToProceed;
  const selectedAnswerCorrectness = correctness[0];

  const addScoreIfNeeded = () => {
    if (selectedAnswerCorrectness === "1") {
      players[currentPlayerIndex].score++;
    }
  };

  const setTemporaryBackground = () => {
    setQuestionColor(
      selectedAnswerCorrectness === "1"
        ? questionColors.success
        : questionColors.failed
    );
  };

  const goToNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if ((currentQuestionIndex + 1) % players.length === 0) {
      setQuestionNumber(questionNumber + 1);
    }
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    if (currentQuestionIndex === questions.length - 1) {
      props.history.push("/results");
    }
    setIsReadyToProceed(false);
  };

  const setRadioButtonsUnchecked = () => {
    let buttons = document.querySelectorAll('input[type="radio"]');
    for (let button of buttons) {
      button.checked = false;
    }
  };

  const handleNextButton = () => {
    addScoreIfNeeded();
    setTemporaryBackground();
    setTimeout(() => {
      setRadioButtonsUnchecked();
      setQuestionColor(questionColors.empty);
      goToNext();
    }, 1000);
  };

  return (
    <QuestionCardContainer>
      <PlayerData currentPlayerIndex={currentPlayerIndex} />
      <QuestionContainer questionColor={questionColor}>
        {/* <H3>{decodeStringToHtml(questions[0].question)}</H3> */}
        <CategoryTitle>
          {questions[currentQuestionIndex].category}
        </CategoryTitle>
        <H3>{questions[currentQuestionIndex].question}</H3>
        <Answers />
        <Button
          type='button'
          id='next'
          onClick={handleNextButton}
          disabled={!isReadyToProceed}
        >
          {currentQuestionIndex === questions.length - 1
            ? "Finish Quiz"
            : "Next"}
        </Button>
        <p>
          {questionNumber} / {questions.length / players.length}
        </p>
      </QuestionContainer>
    </QuestionCardContainer>
  );
}
