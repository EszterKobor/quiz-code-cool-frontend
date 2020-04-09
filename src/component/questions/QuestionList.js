import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { QuestionFilterContext } from 'context/QuestionFilterContext';
import { CategoryContext } from 'context/CategoryContext';
import { TypeContext } from 'context/TypeContext';
import { StatusContext } from 'context/StatusContext';
import { NewQuizContext } from 'context/NewQuizContext';

import {
  Help,
  QuestionTable,
  OverflowContainer,
  QuestionTableHead,
  QuestionsTd,
  QuestionsTr,
  QuestionListTdNavLink,
} from 'style/MyStyle';

export default function QuestionList() {
  const {toggleQuestionId} = useContext(NewQuizContext);
  const selectedCategoryId = useContext(CategoryContext).categoryInput[0];
  const selectedStatus = useContext(StatusContext)[0];

  const { typesMap, selectedTypeInput } = useContext(TypeContext);
  const selectedType = selectedTypeInput[0];

  const history = useHistory();

  const { getFilteredQuestions, filteredQuestionsState } = useContext(
    QuestionFilterContext
  );
  const questions = filteredQuestionsState[0];

  const [selectedRow, setSelectedRow] = useState([]);

  const handleClick = (id, index) => {
    if (history.location.pathname === '/custom-quiz/new') {
      if (index !== undefined && !selectedRow.includes(index) ) setSelectedRow([...selectedRow, index]);
      else {
        let newArray = selectedRow;
        newArray.splice(newArray.indexOf(index), 1)
      }
      toggleQuestionId(id);
    }
  };

  useEffect(() => {
    getFilteredQuestions(history.location.pathname);
  }, [selectedCategoryId, selectedType, selectedStatus]);

  return questions.length === 0 ? (
    <Help>There is no question with the selected parameters.</Help>
  ) : (
    <OverflowContainer>
      <QuestionTable>
        <thead>
          <tr>
            <QuestionTableHead>Id</QuestionTableHead>
            <QuestionTableHead>Question</QuestionTableHead>
            <QuestionTableHead>Category</QuestionTableHead>
            <QuestionTableHead>Type</QuestionTableHead>
            <QuestionTableHead>Status</QuestionTableHead>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <QuestionsTr key={index} onClick={() => handleClick(question.id, index)} className={selectedRow.includes(index) ? "selected" : ""}>
              <QuestionsTd>{question.id}</QuestionsTd>
              {history.location.pathname === '/questions' ? (
                <QuestionListTdNavLink to={`/questions/${question.id}`}>
                  <QuestionsTd>{question.question}</QuestionsTd>
                </QuestionListTdNavLink>
              ) : (
                <QuestionsTd>{question.question}</QuestionsTd>
              )}
              <QuestionsTd>{question.category.name}</QuestionsTd>
              <QuestionsTd>{typesMap[question.type]}</QuestionsTd>
              <QuestionsTd>
                {question.validated === true ? 'Validated' : 'Not validated'}
              </QuestionsTd>
            </QuestionsTr>
          ))}
        </tbody>
      </QuestionTable>
    </OverflowContainer>
  );
}
