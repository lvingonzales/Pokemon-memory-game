import { useEffect, useState } from "react";

const mons = [
  "Infernape",
  "Staraptor",
  "Breloom",
  "Mudkip",
  "Luxray",
  "Decidueye",
];
let monObjects = [];

export default function PlayArea() {
  useEffect(() => {
    console.log("PlayArea loading");
    AddMons();
  }, []);
  return (
    <>
      <div className="play-area">
        <div className="card-wrapper">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
      </div>
    </>
  );
}

function Card() {
    
    const [cardInfo, SetInfo] = useState({id: 0, imageSrc: "#"});

    useEffect(() => {
        console.log("Cards loading");
        let selectedMon = SelectMon(monObjects);
        SetInfo(selectedMon);
    }, []);
    
  return(
    <>
        <div className="card">
            <div className="card-back">
                <div className="card-image">
                    <img src={cardInfo.imageSrc} alt="" />
                </div>
            </div>
        </div>
    </>
  );
}

async function AddMons() {
  for (const mon of mons) {
    try {
      let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + mon, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      let json = await response.json();
      monObjects.push({ id: json.id, imageSrc: json.sprites.front_default, inUse: false });
    } catch (error) {
      console.error(error.message);
    }
  }
}

function SelectMon (mons = monObjects) {
    if (!monObjects.length) {throw new Error ("No pokemon in list!")}

    let selectedMon = mons[Math.floor(Math.random() * mons.length)];

    if (selectedMon.inUse === true) {
        selectedMon = SelectMon(selectedMon);
    }

    let foo = mons.findIndex(mon => mon.id === selectedMon.id);
    mons[foo].inUse = true;
    return selectedMon;
}
