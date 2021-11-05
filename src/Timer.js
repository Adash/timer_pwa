import React from 'react';
import './Timer.css';

const getOnlyHours = (number) =>
  Math.floor((number % (60 * 60 * 24)) / (60 * 60));
const getOnlyMinutes = (number) => Math.floor((number % (60 * 60)) / 60);
const getOnlySeconds = (number) => Math.floor(number % 60);

const calculateTimeLeft = (start, seconds = 0) =>
  seconds + Math.trunc(new Date().getTime() / 1000) - start;

const Timer = (props) => {
  const [running, setRunning] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [timerInterval, setTimerInterval] = React.useState(undefined);

  const startTimer = () => {
    setRunning(true);
    const startTime = Math.trunc(new Date().getTime() / 1000);
    setTimerInterval(
      setInterval(() => {
        setTimeElapsed(calculateTimeLeft(startTime, seconds));
      }, 1000)
    );
  };

  React.useEffect(() => {
    setSeconds(timeElapsed);
  }, [timeElapsed]);

  const stopTimer = () => {
    setRunning(false);
    clearInterval(timerInterval);
  };

  const resetTimer = () => {
    setRunning(false);
    clearInterval(timerInterval);
    setSeconds(0);
  };
  return (
    <div className="timer_wrapper">
      <h3>Timer</h3>
      <h2 className={`timer_display ${running && 'timer_display_running'}`}>
        {getOnlyHours(seconds)}:{getOnlyMinutes(seconds)}:
        {getOnlySeconds(seconds)}
      </h2>
      <div className="controls_wrapper">
        <button
          className="timer_button"
          onClick={startTimer}
          disabled={running}
        >
          ▶️
        </button>
        <button
          className="timer_button"
          onClick={stopTimer}
          disabled={!running}
        >
          ⏹
        </button>
        <button className="timer_button" onClick={resetTimer}>
          🛑
        </button>
      </div>
    </div>
  );
};

export default Timer;
