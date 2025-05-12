//import { cleanup } from "@testing-library/react";
import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
   const setResetTime = setInterval(() =>{setTimeRemaining(prevTime =>{
    if(prevTime <= 1){
      clearTimeout(setResetTime);
      return 0;
    }
    
    return prevTime - 1
   })
   
  }, 1000);
  
    
    return function(){
      clearTimeout(setResetTime)
    };
 }, []);

 useEffect(() => {
  if (timeRemaining === 0) {
    onAnswered(false);
  }
}, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
