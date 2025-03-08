import React from 'react';

interface StatisticCardProps {
  label: string;
  value: number | string;
  unit?: string;
  valueClassName?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ label, value, unit, valueClassName = 'text-black' }) => (
  <div className="card-neobrutalism bg-white p-4">
    <p className="text-lg text-gray-600 mb-2">{label}</p>
    <p className={`text-4xl font-bold ${valueClassName}`}>
      {value}
      {unit && <span className="text-xl">{unit}</span>}
    </p>
  </div>
);

interface GameOverProps {
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  onRestart: () => void;
  onBackToHome: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ wpm, accuracy, correct, incorrect, onRestart, onBackToHome }) => (
  <div className="card-neobrutalism bg-accent-200 p-8 mb-6">
    <h2 className="text-4xl font-bold mb-6 text-black text-center">遊戲結束</h2>
    <div className="grid grid-cols-2 gap-6 mb-8">
      <StatisticCard label="打字速度" value={wpm} unit="WPM" />
      <StatisticCard label="準確率" value={accuracy} unit="%" />
      <StatisticCard label="正確字符" value={correct} valueClassName="text-green-600" />
      <StatisticCard label="錯誤字符" value={incorrect} valueClassName="text-red-600" />
    </div>
    <div className="flex justify-center gap-x-4">
      <button className="btn-neobrutalism text-lg px-8 py-3 hover:bg-accent-300 transition-colors" onClick={onRestart}>
        再玩一次
      </button>
      <button
        className="btn-neobrutalism text-lg px-8 py-3 hover:bg-accent-300 transition-colors"
        onClick={onBackToHome}
      >
        回主畫面
      </button>
    </div>
  </div>
);

export default GameOver;
