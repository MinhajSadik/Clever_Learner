import React, { useEffect } from "react";
import classes from "../../styles/Timer.module.css";

const QuizTimer = ({ duration, time, setTime }) => {
  useEffect(() => {
    var durations;
    if (duration === "quiz_based") {
      durations = 40;
    } else if (duration === "question_based") {
      durations = 2;
    }

    console.log(durations === 0);

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
      if (min === 0 && sec === 0) {
        clearInterval(interval);
      }
      setTime(newValue);
    }, 1000);
    return () => clearInterval(interval);
  }, [duration, setTime]);

  let formatNumber = (num) => {
    return num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  return time;
};

export default QuizTimer;
