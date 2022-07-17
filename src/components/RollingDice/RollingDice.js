import React, { useState } from "react";
import "./RollingDice.css";
import Dice from "./Dice";

const RollingDice = (props) => {
  const [rollDice, setRollDice] = useState({
    dice: 1,
    rolling: false,
  });

  const handleRolling = () => {
    const sides = [1, 2, 3, 4, 5, 6];
    // "two", "three", "four", "five", "six"];
    const score = sides[Math.floor(Math.random() * sides.length)];
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
