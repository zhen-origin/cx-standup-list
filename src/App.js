import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffle(nameList) {
  const array = [...nameList];
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const defaultList = [
  "Angie",
  "Ian",
  "Andy",
  "Caroline",
  "Fred",
  "Haydn",
  "Dylan",
  "Camilla",
  "Samantha",
  "Vasily",
  "Yogita",
  "Zhen",
  "Danielle",
  "Ishan",
  "Rosie",
  "Anthony",
  "Tom",
  "Scott",
  "Lauren",
];

function App() {
  const [nameList, setNameList] = useState([]);
  const [joke, setJoke] = useState("");

  const generateNewList = () => {
    setJoke("");
    setNameList(shuffle(defaultList));
  };

  const generateJoke = async () => {
    try {
      const { data } = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      setNameList([]);
      setJoke(data.joke);
    } catch (_) {}
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={generateNewList}>Generate random list</button>
        <button onClick={generateJoke}>Get today's joke</button>
        {nameList.map((name) => (
          <a>{name}</a>
        ))}
        <div className="App-content">{joke}</div>
      </header>
    </div>
  );
}

export default App;
