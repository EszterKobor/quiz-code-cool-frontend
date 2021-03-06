import React, { useContext, useEffect } from "react";

import { TypeContext } from "context/TypeContext";
import { NewQuestionFormContext } from "context/NewQuestionFormContext";

import { InputLabel, TextInput, InputItem } from "style/js/CommonStyles";

export default function MultipleAnswers() {
  const setCorrectAnswer = useContext(NewQuestionFormContext)
    .correctAnswerInput[1];
  const [incorrectAnswers, setIncorrectAnswers] = useContext(
    NewQuestionFormContext
  ).incorrectAnswersInput;
  const { selectedTypeInput } = useContext(TypeContext);
  const selectedType = selectedTypeInput[0];

    useEffect(() => {
      setCorrectAnswer("");
      setIncorrectAnswers([]);
    }, [selectedType])

  const handleCorrectAnswer = e => {
    setCorrectAnswer(e.target.value);
  };

  const handleIncorrectAnswers = e => {
    let currentIncorrectAnswer = [...incorrectAnswers];
    currentIncorrectAnswer[e.target.name] = e.target.value;
    setIncorrectAnswers(currentIncorrectAnswer);
  };

  const createIncorrectAnswersInput = n => {
    let inputs = [];
    for (let i = 0; i < n; i++) {
      inputs.push(
        <InputItem key={i}>
          <TextInput
            name={i}
            id={i}
            type='text'
            placeholder={`Incorrect answer ${i + 1}`}
            maxLength='30'
            required
            onKeyUp={handleIncorrectAnswers}
          ></TextInput>
        </InputItem>
      );
    }
    return inputs;
  };

  return (
    <div>
      <InputItem>
        <InputLabel htmlFor='correct-answer'>Correct answer</InputLabel>
        <TextInput
          name='correct-answer'
          id='correct-answer'
          type='text'
          placeholder='Add correct question...'
          maxLength='150'
          required
          onKeyUp={handleCorrectAnswer}
        ></TextInput>
      </InputItem>
      <div>
        <InputItem>
          <InputLabel htmlFor='incorrect-answers'>Incorrect answers</InputLabel>
        </InputItem>
        {createIncorrectAnswersInput(3)}
      </div>
    </div>
  );
}
