import React, { useState } from "react";
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RiHome3Fill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { RiTimerFill } from "react-icons/ri";
import toast from "react-hot-toast";
import "./Admin.css";
import { TimerModal } from "./TimerModal";
import axios from "axios";
import { timeToSecondsString } from "../utils/timeToSecondsString";
import { IoIosRadioButtonOn } from "react-icons/io";

export const Admin = () => {
  const [question, setQuestion] = useState("");
  const [optionsInput, setOptionsInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [radioValue, setRadioValue] = useState("");
  const [questionvalue, setQuestionValue] = useState("");
  const [timeString, setTimeString] = useState("");

  const setQuizSubmitHandler = (e) => {
    e.preventDefault();
    const answers = options.map((option) => ({
      answer: option,
      correct: radioValue === option,
    }));
    const time = timeToSecondsString(timeString);
    if (!question) {
      toast.error("Add a question");
    } else if (options.length < 4) {
      toast.error("Add 4 options");
    } else if (!radioValue) {
      toast.error("Select correct answer");
    } else if (!time) {
      toast.error("Set a time!");
    } else {
      try {
        const response = axios.post(
          "https://hasquiz-api.herokuapp.com/api/questions",
          {
            question,
            answers,
            time,
          }
        );
        console.log(response);
        toast.success("Question added");
        setQuestionValue("");
        setOptions([]);
      } catch (error) {
        console.log(error);
        toast.error("OOPs! Try again");
      }
    }
  };

  return (
    <div>
      <div
        style={{
          margin: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/admin-landing-page">
          <IoIosArrowRoundBack
            style={{
              fontSize: "2rem",
              color: "rgba(6, 6, 158, 0.562",
            }}
          />
        </Link>
        Click To Log Out
      </div>

      <Header />

      <section style={{ marginTop: "30px" }}>
        <div
          style={{
            borderLeft: "5px solid rgba(6, 6, 158, 0.562)",
            borderRadius: "10px",
            margin: "0 30px",
            backgroundColor: "rgb(219, 218, 218)",
            padding: "20px",
          }}
        >
          <div className="quiz_details" style={{}}>
            <div className="admin_input">
              <div className="input__multi">
                <p>{question}</p>
                <input
                  type="text"
                  value={questionvalue}
                  onChange={(event) => setQuestionValue(event.target.value)}
                  onKeyUp={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      setQuestionValue("");
                      setQuestion(questionvalue);
                    }
                  }}
                  className="question__area"
                  placeholder="Input Question"
                />

                <span className="multi-choice">
                  <p
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <IoIosRadioButtonOn
                      style={{
                        color: "rgba(6, 6, 158, 0.562)",
                      }}
                    />
                    Multiple Choice
                  </p>
                </span>
              </div>

              <div>
                {options.map((option, index) => (
                  <span
                    key={index}
                    className="form-check d-flex align-items-center"
                  >
                    <input
                      type="radio"
                      name="options"
                      id="answers"
                      className="form-check-input mb-3 p-3"
                      style={{ width: "30px" }}
                      onClick={(e) => setRadioValue(e.target.value)}
                      value={radioValue}
                    />
                    <label htmlFor="answers" value={option} className="pl-3">
                      {option}
                    </label>
                  </span>
                ))}
              </div>

              <input
                className="options-area"
                type="text"
                placeholder="Add Options"
                value={optionsInput}
                onKeyUp={(event) => {
                  if (event.key === "Enter" && options.length < 4) {
                    event.preventDefault();
                    setOptions((prev) => [...prev, optionsInput]);
                    setOptionsInput("");
                  }
                  if (event.key === "Enter" && options.length === 4) {
                    event.preventDefault();
                    setOptionsInput("");
                    toast("Sorry, you can only add 4 options");
                  }
                }}
                onChange={(event) => setOptionsInput(event.target.value)}
              />
            </div>

            <div classname="btn__div">
              <button className="submit-btn" onClick={setQuizSubmitHandler}>
                Submit
              </button>
            </div>

            <div className="tags_area">
              <span className="icon-tag">
                <RiHome3Fill />
                All
              </span>

              <span
                className="trashcan"
                onClick={() => {
                  setQuestion("");
                  setOptions([]);
                }}
              >
                <IoMdTrash />
                Trash
              </span>

              <span className="timer-icon" onClick={() => setShowModal(true)}>
                <RiTimerFill />
                Timer
              </span>
            </div>
          </div>
        </div>

        <TimerModal
          show={showModal}
          onHide={() => setShowModal(false)}
          timeString={timeString}
          setTimeString={setTimeString}
        />
      </section>
    </div>
  );
};
