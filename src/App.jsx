import PlayArea from "./components/PlayArea";
import "./App.css";
import Score from "./components/Score";
import { useState } from "react";

export default function App() {
  const [score, SetScore] = useState(0);
  const [bestScore, setBest] = useState(0);

  return (
    <>
      <div className="game-screen">
        <PlayArea score={score} setScore={SetScore} setBest={setBest} currentBest={bestScore}/>
        <div className="game-stats">
          <h1>Current Score</h1>
          <Score score={score} bestScore={bestScore}/>
        </div>
      </div>
      <div className="game-util">
        <div className="game-info">
          <h1>Pokemon Memory Game</h1>
          <h2>by Liam Gonzales</h2>
          <p>
            This is a short memory based game I made using React. I used the
            <a href="https://pokeapi.co/"> PokeApi </a> to get the images and
            stored a pre-determined set to reduce the number of API calls.
          </p>
          <h2>Instructions:</h2>
          <p>
            The goal of the game is to click on as many pokemon as you can
            <em> without clicking on any twice</em>. Each time you click on a
            card the order of the cards will be shuffled.
          </p>
          <p>
            Clicking on a pokemon more than once will <em> reset </em> your
            score.
          </p>
        </div>
      </div>
    </>
  );
}
