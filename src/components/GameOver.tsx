import React from "react";

interface GameOverProps {
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
  wpm,
  accuracy,
  correct,
  incorrect,
  onRestart,
}) => (
  <div className="card-neobrutalism bg-accent-200 p-6 mb-6">
    <h2 className="text-2xl font-bold mb-2 text-black">遊戲結束！</h2>
    <p className="text-black mb-2">您的最終成績：</p>
    <p className="text-black">WPM: {wpm}</p>
    <p className="text-black">準確率: {accuracy}%</p>
    <p className="text-black">正確字符: {correct}</p>
    <p className="text-black">錯誤字符: {incorrect}</p>
    <button className="btn-neobrutalism mt-4" onClick={onRestart}>
      再玩一次
    </button>
  </div>
);

export default GameOver;
