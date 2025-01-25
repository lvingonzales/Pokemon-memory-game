import PlayArea from "./components/PlayArea";
import "./App.css";

export default function App() {
  return (
    <>
      <div className="game-screen"><PlayArea /></div>
      <div className="game-util">
        <div className="game-info">Info Section</div>
        <div className="game-stats">Stats Section</div>
      </div>
    </>
  );
}
