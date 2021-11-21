import React from 'react';
import FeatherIcon from 'feather-icons-react';
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
  const [dataStorage, setDataStorage] = React.useState([
    { name: 'first', time: 0 },
  ]);

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

  const saveTime = () => {
    setDataStorage((prevState) => [
      ...prevState,
      { name: 'newTime', time: seconds },
    ]);
  };

  return (
    <div className="wrapper">
      <div className="results_wrapper">
        <ul>
          {dataStorage.length &&
            dataStorage.map((entry) => (
              <li>
                name: <span>{entry.name}</span> - time:{' '}
                <span>{entry.time}</span>
              </li>
            ))}
        </ul>
      </div>
      <div className="timer_wrapper">
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
            <FeatherIcon icon="play" size="24" />
          </button>
          <button
            className="timer_button"
            onClick={stopTimer}
            disabled={!running}
          >
            <FeatherIcon icon="pause" size="24" />
          </button>
          <button className="timer_button" onClick={resetTimer}>
            <FeatherIcon icon="x-octagon" size="24" />
          </button>
        </div>
        <div className="saveButton_wrapper">
          <button className="saveButton" onClick={saveTime}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
