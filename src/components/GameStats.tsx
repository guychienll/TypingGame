import React from "react";

interface GameStatsProps {
  timeLeft: number;
  wpm: number;
  accuracy: number;
}

const GameStats: React.FC<GameStatsProps> = ({ timeLeft, wpm, accuracy }) => (
  <div className="grid grid-cols-3 gap-4 mb-6 tracking-widest">
    <div className="card-neobrutalism bg-primary-200">
      <span className="text-black font-bold">時間剩餘:</span>
      <span className="text-black text-xl font-bold">{timeLeft}秒</span>
    </div>
    <div className="card-neobrutalism bg-primary-200">
      <span className="text-black font-bold">WPM:</span>
      <span className="text-black text-xl font-bold">{wpm}</span>
    </div>
    <div className="card-neobrutalism bg-primary-200">
      <span className="text-black font-bold">準確率:</span>
      <span className="text-black text-xl font-bold">{accuracy}%</span>
    </div>
  </div>
);

export default GameStats; 