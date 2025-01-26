import "../styles/Score.css";

export default function Score({ score, bestScore }) {
  return (
    <>
      <p className="score">{score}</p>
      <p className="bestScore">Current Best: {bestScore}</p>
    </>
  );
}
