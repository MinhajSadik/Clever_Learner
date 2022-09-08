import React, { useEffect, useState } from "react";
const Timer = ({ duration }) => {
  const [time, setTime] = useState();
  useEffect(() => {
    var durations;
    if (duration === "quiz_based") {
      durations = 40;
    } else if (duration === "question_based") {
      durations = 2;
    }

    let endTime = new Date();

    endTime.setMinutes(endTime.getMinutes() + duration);

    let min = durations;
    let hr = 1;
    let sec = 0;

    let interval = setInterval(() => {
      sec--;
      if (sec === -1) {
        sec = 59;
        min--;
        hr--;
      }
      let newValue = (
        <>
          <span className="minutes">{formatNumber(min)}</span>
          <span className="divider">:</span>
          <span className="seconds">{formatNumber(sec)}</span>
        </>
      );
      if (hr === 0 && min === 0 && sec === 0) {
        clearInterval(interval);
      }
      setTime(newValue);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  let formatNumber = (num) => {
    return num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };
  return time;
};

export default Timer;
