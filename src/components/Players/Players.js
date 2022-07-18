import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem";
import "./Players.css";

const Players = () => {
  const [players, setplayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [scroreToWin, setScoreToWin] = useState(0);
  const [matchID, setmatchID] = useState("");
  const [winner, setWinner] = useState();
  const [count, setCount] = useState(0);

  // getting data from API and showing them on success
  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch("http://localhost:8000/api/game");

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }
      const resonseData = await response.json();
      const loadPlayers = [];
      setScoreToWin(resonseData["scoreToWin"]);
      setmatchID(resonseData["matchId"]);
      const responsePlayersData = resonseData["players"];

      for (const key in responsePlayersData) {
        loadPlayers.push({
          id: responsePlayersData[key].id,
          name: responsePlayersData[key].name,
          imageUrl: responsePlayersData[key].imageUrl,
        });
      }

      setplayers(loadPlayers);
      setIsLoading(false);
    };

    fetchPlayers().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className="">
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.error}>
        <p>{httpError}</p>
      </section>
    );
  }

  //Handling case onclick of Roll button add score,show winner
  const HandleAddScore = (playerDetails) => {
    const { latestScore, playerName, playerId, imgUrl } = playerDetails;

    if (count < players.length - 1)
      setCount((prevState) => {
        return prevState + 1;
      });
    else {
      setCount(0);
    }

    if (scroreToWin !== 0 && latestScore >= scroreToWin) {
      setWinner({
        playerName,
        score: latestScore,
        playerId,
        imgUrl,
      });
    }
  };

  //showing players details
  const playerList = players.map((player, index) => (
    <PlayerItem
      key={index}
      id={player.id}
      name={player.name}
      imageUrl={player.imageUrl}
      AddScore={HandleAddScore}
      disabled={count == index ? false : true}
    />
  ));

  //rendering gameboard
  return (
    <div className="gameBoard">
      <p className="matchId">Match ID: {matchID}</p>
      <h1>Rolling Dice</h1>
      <h3>Score to win: {scroreToWin}</h3>
      {winner && winner.playerName !== "" ? (
        <div className="winnerContainer">
          <img src="./src/assets/winner.png" />
          <h2>{winner.playerName}</h2>
          <p>
            <img style={{ width: 100 }} src={winner.imgUrl} />
          </p>
          <p>Score:{winner.score}</p>
          <p>Player Id: {winner.playerId}</p>
        </div>
      ) : (
        <div className="players">{playerList}</div>
      )}
    </div>
  );
};
export default Players;
