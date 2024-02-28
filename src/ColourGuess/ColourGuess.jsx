import React, { useState, useEffect, useRef } from "react";
import "./ColourGuess.scss";

const ColourGuess = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const [playerred, setPlayerred] = useState(0);
  const [playergreen, setPlayergreen] = useState(0);
  const [playerblue, setPlayerblue] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [over, setOver] = useState(false);
  const btnRef = useRef(null);
  const titleRef = useRef(null);

  const handleInputChange = (e, setterFunction) => {
    let inputValue = parseInt(e.target.value);
    if (inputValue > 255) {
      inputValue = 255;
    }
    setterFunction(inputValue);
  };

  useEffect(() => {
    setRed(Math.floor(Math.random() * 256));
    setGreen(Math.floor(Math.random() * 256));
    setBlue(Math.floor(Math.random() * 256));
  }, []);

  const match = () => {
    const matchPercentageRed = calculateMatchPercentage(red, playerred);
    const matchPercentageGreen = calculateMatchPercentage(green, playergreen);
    const matchPercentageBlue = calculateMatchPercentage(blue, playerblue);

    const totalpercentage = (
      (matchPercentageRed + matchPercentageGreen + matchPercentageBlue) /
      3
    ).toFixed(2);
    setRevealed(true);
    if (totalpercentage < 30) {
      titleRef.current.innerHTML = `<span class="title" style="color: white;"><h1>Matched = ${totalpercentage} %</h1> 
      <p style="text-align: center;">Needs more practice</p>
      </span>`;
    } else if (totalpercentage > 30 && totalpercentage < 60) {
      titleRef.current.innerHTML = `<span class="title" style="color: white;"><h1>Matched = ${totalpercentage} %</h1> 
      <p style="text-align: center;">Good Try</p>
      </span>`;
    } else if (totalpercentage > 60 && totalpercentage < 100) {
      titleRef.current.innerHTML = `<span class="title" style="color: white;"><h1>Matched = ${totalpercentage} %</h1> 
      <p style="text-align: center;">Excellent Result</p>
      </span>`;
    } else if (totalpercentage > 90) {
      titleRef.current.innerHTML = `<span class="title" style="color: white;"><h1>Matched = ${totalpercentage}</h1> 
      <p style="text-align: center;">Your RGB knowledge is Beyond Excellence</p>
      </span>`;
    }
    setOver(true);
  };

  const reset = () => {
    window.location.reload();
  };

  const calculateMatchPercentage = (num1, num2) => {
    const difference = Math.abs(num1 - num2);
    const normalizedDifference = difference / 255;
    const percentageMatch = (1 - normalizedDifference) * 100;
    return parseFloat(percentageMatch.toFixed(2));
  };

  return (
    <div className="container rgb-flex">
      <div className="title" ref={titleRef}>
        <h1>ColorQuest</h1>
        <p>Test your RGB knowledge by matching the colour</p>
      </div>
      <div className="game rgb-flex">
        <div className="colour">
          <h3 className="colour-title">Colour </h3>
          <div
            className="colour-box"
            style={{ background: `rgb(${red}, ${green}, ${blue})` }}
          ></div>
          <div className="reveal" ref={btnRef}>
            <span style={{ display: revealed ? "none" : "inline" }}>
              RGB ( ?, ?, ?)
            </span>
            <input
              type="text"
              value={red}
              name="Red"
              className="my-guess"
              style={{ display: revealed ? "flex" : "none" }}
              placeholder="R"
            />
            <input
              type="text"
              value={green}
              name="Green"
              className="my-guess"
              style={{ display: revealed ? "flex" : "none" }}
              placeholder="G"
            />
            <input
              type="text"
              value={blue}
              name="Blue"
              className="my-guess"
              style={{ display: revealed ? "flex" : "none" }}
              placeholder="B"
            />
          </div>
        </div>
        <div className="guess">
          <h3 className="colour-title">Your Match</h3>
          <div
            className="colour-box"
            style={{
              background: `rgb(${playerred}, ${playergreen}, ${playerblue})`,
            }}
          ></div>
          <div className="guess-input">
            <input
              type="text"
              name="Red"
              className="my-guess"
              placeholder="R"
              onChange={(e) => handleInputChange(e, setPlayerred)}
            />
            <input
              type="text"
              name="Green"
              className="my-guess"
              placeholder="G"
              onChange={(e) => handleInputChange(e, setPlayergreen)}
            />
            <input
              type="text"
              name="Blue"
              className="my-guess"
              placeholder="B"
              onChange={(e) => handleInputChange(e, setPlayerblue)}
            />
          </div>
        </div>
      </div>
      <div className="button">
        <button onClick={match} style={{ display: over ? "none" : "block" }}>
          Check Result{" "}
        </button>
        <button onClick={reset} style={{ display: over ? "block" : "none" }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ColourGuess;
