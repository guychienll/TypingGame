import React from 'react';

interface GameStatsProps {
  timeLeft: number;
  wpm: number;
  accuracy: number;
}

const GameStats: React.FC<GameStatsProps> = ({ timeLeft, wpm, accuracy }) => (
  <div className="grid grid-cols-3 gap-6 mb-8 tracking-widest">
    <div className="card-neobrutalism bg-primary-200 p-4 flex flex-col items-center justify-center min-w-[180px]">
      <span className="text-gray-600 text-sm mb-1">時間剩餘</span>
      <span className="text-black text-3xl font-bold">
        {timeLeft}
        <span className="text-xl">秒</span>
      </span>
    </div>
    <div className="card-neobrutalism bg-primary-200 p-4 flex flex-col items-center justify-center min-w-[180px]">
      <span className="text-gray-600 text-sm mb-1">打字速度</span>
      <span className="text-black text-3xl font-bold">
        {wpm}
        <span className="text-xl">WPM</span>
      </span>
    </div>
    <div className="card-neobrutalism bg-primary-200 p-4 flex flex-col items-center justify-center min-w-[180px]">
      <span className="text-gray-600 text-sm mb-1">準確率</span>
      <span className="text-black text-3xl font-bold">
        {accuracy}
        <span className="text-xl">%</span>
      </span>
    </div>
  </div>
);

export default GameStats;
