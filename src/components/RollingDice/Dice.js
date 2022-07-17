import React from "react";
import "./Dice.css";

const Dice = (props) => {
  return (
    <div className="dice">
      <img
        src={"./src/assets/dice-" + props.face + ".png"}
        className={`${props.rolling && "Die-shaking"}`}
      />
    </div>
  );
};
export default Dice;
