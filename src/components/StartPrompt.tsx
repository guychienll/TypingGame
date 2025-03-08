import React from 'react';

interface StartPromptProps {
  onStart: () => void;
  duration: number;
  onDurationChange: (duration: number) => void;
}

const DURATION_OPTIONS = [
  { value: 10, label: '10 秒' },
  { value: 30, label: '30 秒' },
  { value: 60, label: '60 秒' },
  { value: 120, label: '120 秒' },
  { value: 180, label: '180 秒' },
];

const StartPrompt: React.FC<StartPromptProps> = ({ onStart, duration, onDurationChange }) => (
  <div className="card-neobrutalism bg-accent-200 p-8 mb-6">
    <h2 className="text-3xl font-bold text-black mb-6 text-center font-gemunu-libre tracking-wider">準備好了嗎 ?</h2>
    <div className="flex flex-col items-center gap-6 mb-8">
      <div className="flex items-center gap-4">
        <label className="text-black text-lg">遊戲時間：</label>
        <select
          value={duration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="card-neobrutalism bg-white px-4 py-2 text-lg font-medium cursor-pointer hover:bg-accent-100 transition-colors"
        >
          {DURATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn-neobrutalism text-xl px-8 py-3 hover:bg-accent-300 transition-colors font-bold tracking-wider"
        onClick={onStart}
      >
        開始遊戲
      </button>
    </div>
  </div>
);

export default StartPrompt;
