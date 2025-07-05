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
        setStatus("✅ Correct! Next level.");
        setTimeout(() => nextLevel(), 1000);
      } else {
        setStatus("❌ Wrong pattern! Game Over.");
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
    <div className="text-center space-y-6 p-8">
      <h1 className="text-4xl font-bold text-white">NFT Heist - Pattern Challenge</h1>
      <p className="text-lg">Level: <span className="font-semibold">{level}</span> | Score: <span className="font-semibold">{score}</span></p>
      <p className="text-lg italic">{status}</p>

      <div className="flex justify-center gap-4">
        {["🔴", "🟢", "🔵", "🟡"].map(symbol => (
          <button
            key={symbol}
            onClick={() => handleClick(symbol)}
            className="text-3xl p-4 bg-white/20 hover:bg-white/30 rounded-full transition"
          >
            {symbol}
          </button>
        ))}
      </div>

      <button
        onClick={startGame}
        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition"
      >
        Start Game
      </button>
    </div>
  );
}
