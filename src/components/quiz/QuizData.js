import React, { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";

const QuizData = ({ question, setAnswers, userAnswers }) => {
  const [radioInput, setRadioInput] = useState("");

  const handleChange = (event) => {
    setRadioInput(event.target.id);
  };

  useEffect(() => {
    const thisAnswer = userAnswers.find(
      (answer) => answer.questionId === question.id
    );

    if (thisAnswer) {
      const selectedAnswer = question.answers.find(
        (answer) => answer.id === thisAnswer.selectedAnswer
      );
      if (selectedAnswer) setRadioInput(selectedAnswer.answer);
    }
  }, [question, userAnswers]);

  return (
    <div>
      <div className="mt-3">
        <div
          style={{
            borderLeft: "5px solid rgba(6, 6, 158, 0.562)",
            borderRadius: "10px",
            margin: "0 30px",
            backgroundColor: "rgb(219, 218, 218)",
            padding: "20px",
          }}
        >
          <h5>{question.question}</h5>

          <InputGroup className="d-flex flex-column">
            {question.answers.map((answer) => (
              <div key={answer.id}>
                <label
                  htmlFor={answer.id}
                  value={answer.answer}
                  onChange={() => {
                    setAnswers({
                      questionId: answer.questionId,
                      selectedAnswer: answer.id,
                    });
                  }}
                >
                  <input
                    type="radio"
                    id={answer.id}
                    name={answer.questionId}
                    onChange={handleChange}
                    value={radioInput}
                  />

                  {answer.answer}
                </label>
              </div>
            ))}
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default QuizData;
