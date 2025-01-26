import { useEffect, useState } from "react";
import "../styles/PlayArea.css";
import { animateReset, checkBest, ev_CardClicked } from "../GameController";

const mons = [
  "Infernape",
  "Staraptor",
  "Breloom",
  "Mudkip",
  "Luxray",
  "Decidueye",
];

let monObjects = [];

export default function PlayArea({score ,setScore, setBest, currentBest}) {
  const [sequence, setSequence] = useState([]);

  useEffect (() => {
    async function fetchMons() {
      monObjects = await AddMons();
      setSequence(RandomSequence());
    }

    fetchMons();
    
  }, [])

  const handleClick = (cardId) => {
    let scoreStatus = ev_CardClicked(cardId);

    // scoreStatus ? setScore(score + 1) : setScore(0);
    if (!scoreStatus) {
      animateReset()
      currentBest = checkBest(score, currentBest);
      setScore(0);
      
      return setBest(currentBest);
    }
    setScore(score + 1);
    setSequence(RandomSequence());
  };
  return (
    <>
      <div className="play-area">
        <ResetNotif />
        <div className="card-wrapper">
          {sequence.map((index) => {
            return (
              <Card
                key={monObjects[index].id}
                imageSrc={monObjects[index].imageSrc}
                id={monObjects[index].id}
                onClick={(event) => handleClick(event.currentTarget.id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function Card({ id, imageSrc, onClick }) {
  return (
    <>
      <div className="card" onClick={onClick} id={id}>
        <div className="card-back">
          <div className="card-image">
            <img src={imageSrc} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

function ResetNotif () {
  return (
    <div className="resetWrapper">
      <p className="reset">RESET!</p>
    </div>
  );
}

async function AddMons() {
  let array = [];
  for (const mon of mons) {
    try {
      let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + mon, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      let json = await response.json();
      if (array.find((mon) => mon.id === json.id) === undefined) {
        array.push({
          id: json.id,
          imageSrc: json.sprites.front_default,
          inUse: false,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return array;
}

function RandomSequence(array = []) {
  if (array === undefined) {
    return;
  }
  while (array.length !== mons.length) {
    let newNum = Math.floor(Math.random() * mons.length);

    if (array.find((num) => num === newNum) === undefined) {
      array.push(newNum);
    }
  }
  return array;
}

// function handleClick(cards = []) {
//     sequence = RandomSequence();

//     cards = sequence.map((index) => <Card)
// }
