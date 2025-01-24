import PlayArea from "./components/PlayArea";

export default function App() {
  return (
    <>
      <div className="game-screen"><PlayArea /></div>
      <div className="game-info"></div>
      <div className="game-stats"></div>
    </>
  );
}
