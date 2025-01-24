import { useEffect, useState } from "react";

const mons = [
  "Infernape",
  "Staraptor",
  "Breloom",
  "Mudkip",
  "Luxray",
  "Decidueye",
];

const monObjects = await AddMons();
console.log(monObjects);
let sequence = RandomSequence();
console.log (sequence);

export default function PlayArea() {

  return (
    <>
      <div className="play-area">
        <div className="card-wrapper">
        </div>
      </div>
    </>
  );
}

function Card({ cardId, cardImg }) {
  return (
    <>
      <div className="card">
        <div className="card-back">
          <div className="card-image">
            <img src={cardImg} alt="" id={cardId} />
          </div>
        </div>
      </div>
    </>
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
