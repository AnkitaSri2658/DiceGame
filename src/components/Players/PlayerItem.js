import React, { useState } from "react";
import RollingDice from "../RollingDice/RollingDice";
import Card from "../UI/Card";
import "./PlayerItem.css";

const PlayerItem = (props) => {
  const [score, setScore] = useState(0);

  //On rolling dice show total score and calling parent function
  const handleAddScore = (newScore) => {
    let latestScore;
    setScore((prevState) => {
      latestScore = prevState + newScore;
      return latestScore;
    });
    props.AddScore(latestScore, props.name, props.id);
  };

  return (
    <Card>
      <div className="playerItem">
        <h4>{props.name}</h4>
        <div className="profileImg">
          <img src={props.imageUrl} />
        </div>
        <p>Score:{score}</p>
        <RollingDice AddScore={handleAddScore} disabled={props.disabled} />
      </div>
    </Card>
  );
};
export default PlayerItem;
