import React, { useState, useEffect } from "react";

interface ICountdownTimerProps {
  countdownComplete: () => void;
}

const CountdownTimer: React.FC<ICountdownTimerProps> = (props) => {
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        props.countdownComplete();
      }
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [countdown, props]);

  return <span>{countdown} seconds</span>;
};

export default CountdownTimer;
