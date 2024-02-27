import React, { useState, useEffect, useRef } from "react";
import "./ColourGuess.scss";

const ColourGuess = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const [playerred, setPlayerred] = useState(0);
  const [playergreen, setPlayergreen] = useState(0);
  const [playerblue, setPlayerblue] = useState(0);
  const btnRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRed(Math.floor(Math.random() * 256));
    setGreen(Math.floor(Math.random() * 256));
    setBlue(Math.floor(Math.random() * 256));
  }, []);

  const reset = () => {
    window.location.reload();
  };

  const reveal = () => {
    setRevealed(true);
  };

  return (
    <div className="container rgb-flex">
      <div className="title">
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
            <span
              onClick={reveal}
              style={{ display: revealed ? "none" : "inline" }}
            >
              Show
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
              onChange={(e) => setPlayerred(e.target.value)}
            />
            <input
              type="text"
              name="Green"
              className="my-guess"
              placeholder="G"
              onChange={(e) => setPlayergreen(e.target.value)}
            />
            <input
              type="text"
              name="Blue"
              className="my-guess"
              placeholder="B"
              onChange={(e) => setPlayerblue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="button">
        <button onClick={reset}>Another Colour ?</button>
      </div>
    </div>
  );
};

export default ColourGuess;
