import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { mcqs } from "../MCQS/mcq";
import { useNavigate } from "react-router-dom";

function Quiz(props) {
  const {marks,setMarks,MCqs,setMCqs}=props
    let navigate = useNavigate();
    
    const [mcq, setMcq] = useState(mcqs);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [marks, setMarks] = useState(0);
  
  const handleQuestion = (questionNo) => {
    setCurrentQuestion(questionNo);
  };
  const checkAnswer = (option) => {
    let a = mcq[currentQuestion].options.map((item, index) => {
        if (item.answerText == option.answerText) {
            return { ...item, isSelected: true };
      } else {
          return { ...item, isSelected: false };
        }
    });
    console.log(a);
    setMcq(
        mcq.map((item, index) => {
            if (index == currentQuestion) {
          return { ...item, isAnswered: true, options: a };
        } else {
            return item;
        }
    })
    );
    setMCqs(mcq.map((item, index) => {
      if (index == currentQuestion) {
    return { ...item, isAnswered: true, options: a };
  } else {
      return item;
  }
}))
  };
  const handleAnswers = (mcq) => {
     let marksObtained = 0;
      mcq.map((items, index) => {
      items.options.map((option, indx) => {
          if (option.isCorrect && option.isSelected) {
              marksObtained = marksObtained + 1;
              setMarks(marks + 1);
            } else {
                setMarks(marks);
        }
    });
    });
   setMarks(marksObtained)
    navigate("/results", { replace: true });
    // return marksObtained;
  };
  return (
    <>
      {mcq.map((items, index) => {
        return (
          <div key={index} className="outer">
            <div
              onClick={() => {
                handleQuestion(index);
              }}
              className={items.isAnswered ? "circlesA" : "circlesUa"}
            >
              {index + 1}
            </div>
          </div>
        );
      })}
      <div>
        {mcq[currentQuestion].question}
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {mcq[currentQuestion].options.map((option, index) => {
            return (
              <FormControlLabel
                value={option.answerText}
                control={
                  <Radio
                    onChange={() => checkAnswer(option)}
                    checked={option.isSelected}
                  />
                }
                label={option.answerText}
              />
            );
          })}
        </RadioGroup>
        {currentQuestion == 3 && (
          <Button onClick={() => console.log(handleAnswers(mcq))}>
            Submit
          </Button>
        )}
        <Button
          variant="contained"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          Prev
        </Button>
        {currentQuestion !== 3 && (
          <Button
            variant="contained"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next
          </Button>
        )}
      </div>
    </>
  );
}

export default Quiz;
