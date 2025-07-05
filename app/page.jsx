'use client';
import { useState, useEffect } from 'react';

export default function Page() {
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [status, setStatus] = useState("Click Start to play!");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (userInput.length === pattern.length && pattern.length > 0) {
      if (userInput.join() === pattern.join()) {
        setScore(score + level * 10);
        setStatus("Correct! Next level.");
        setTimeout(() => nextLevel(), 1000);
      } else {
        setStatus("Wrong pattern! Game Over.");
        resetGame();
      }
    }
  }, [userInput]);

  const generatePattern = (length) => {
    const options = ["🔴", "🟢", "🔵", "🟡"];
    return Array.from({ length }, () => options[Math.floor(Math.random() * options.length)]);
  };

  const startGame = () => {
    setLevel(1);
    setScore(0);
    nextLevel();
  };

  const nextLevel = () => {
    const newPattern = generatePattern(level + 2);
    setPattern(newPattern);
    setUserInput([]);
    setLevel(level + 1);
    setStatus(`Memorize: ${newPattern.join(" ")}`);
    setTimeout(() => setStatus("Your turn! Click the buttons below."), 2000 + level * 500);
  };

  const handleClick = (symbol) => {
    setUserInput([...userInput, symbol]);
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setPattern([]);
    setUserInput([]);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>NFT Heist - Pattern Challenge</h1>
      <p>Level: {level} | Score: {score}</p>
      <p>{status}</p>
      <div style={{ margin: '20px' }}>
        {["🔴", "🟢", "🔵", "🟡"].map(symbol => (
          <button key={symbol} onClick={() => handleClick(symbol)} style={{ fontSize: '2rem', margin: '5px' }}>
            {symbol}
          </button>
        ))}
      </div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}
