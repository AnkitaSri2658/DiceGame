import React, { useState } from "react";
import "./RollingDice.css";
import Dice from "./Dice";

const RollingDice = (props) => {
  const [rollDice, setRollDice] = useState({
    dice: 1,
    rolling: false,
  });

  const handleRolling = () => {
    const score = Math.floor(Math.random() * 6) + 1;
    setRollDice({
      dice: score,
      rolling: true,
    });

    // Start timer of one sec when rolling start
    setTimeout(() => {
      // Set rolling to false again when time over
      setRollDice((prevState) => {
        return {
          ...prevState,
          rolling: false,
        };
      });
      props.AddScore(score);
    }, 1000);
  };

  const { dice, rolling } = rollDice;
  const handleBtn = rollDice.rolling ? "RollDice-rolling" : "";
  return (
    <div className="RollDice">
      <div className="RollDice-container"></div>

      {rollDice.rolling ? (
        <Dice face={dice} rolling={rolling} />
      ) : (
        <button
          className={handleBtn}
          disabled={rollDice.rolling || props.disabled}
          onClick={handleRolling}
        >
          Roll
        </button>
      )}
    </div>
  );
};

export default RollingDice;
