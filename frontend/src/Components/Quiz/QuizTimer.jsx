import React, { useEffect, useState } from "react";
import classes from "../../styles/Timer.module.css";

const QuizTimer = ({
  duration,
  setIndex,
  index,
  length,
  setSubmitQuiz,
  setShowResult,
}) => {
  const [time, setTime] = useState();
  useEffect(() => {
    var durations;
    if (duration === "quiz_based") {
      durations = 1;
    } else if (duration === "question_based") {
      durations = 1;
    }

    let endTime = new Date();

    endTime.setMinutes(endTime.getMinutes() + duration);

    let min = durations;
    let sec = 0;

    let interval = setInterval(() => {
      sec--;
      if (sec === -1) {
        sec = 59;
        min--;
      }

      let newValue = (
        <>
          <span className={classes.minutes}>{formatNumber(min)}</span>
          <span className={classes.divider}>:</span>
          <span className={classes.seconds}>{formatNumber(sec)}</span>
        </>
      );

      if (min === 0 && sec === 0 && duration === "quiz_based") {
        setShowResult(true);
        // clearInterval(interval);
      }

      if (length - 1 === index && min === 0 && sec === 0) {
        return setSubmitQuiz(true);
      }

      if (
        min === 0 &&
        sec === 0 &&
        length - 1 !== index &&
        duration !== "quiz_based"
      ) {
        return setIndex(index + 1);
      }

      if (min === 0 && sec === 0) {
        return clearInterval(interval);
      }

      setTime(newValue);
    }, 1000);
    return () => clearInterval(interval);
  }, [duration, setIndex, index, length, setSubmitQuiz, setShowResult]);

  let formatNumber = (num) => {
    return num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  return time;
};

export default QuizTimer;
