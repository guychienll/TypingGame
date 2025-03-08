import React from 'react';

interface StartPromptProps {
  onStart: () => void;
  duration: number;
  onDurationChange: (duration: number) => void;
  difficulty?: 'easy' | 'hard';
  onDifficultyChange: (difficulty: 'easy' | 'hard') => void;
}

const DURATION_OPTIONS = [
  { value: 10, label: '10 秒' },
  { value: 30, label: '30 秒' },
  { value: 60, label: '60 秒' },
  { value: 120, label: '120 秒' },
  { value: 180, label: '180 秒' },
];

const StartPrompt: React.FC<StartPromptProps> = ({
  onStart,
  duration,
  onDurationChange,
  difficulty = 'easy',
  onDifficultyChange,
}) => (
  <div className="card-neobrutalism bg-accent-200 p-8 mb-6 shadow-lg">
    <h2 className="text-4xl font-bold text-black mb-8 text-center font-gemunu-libre tracking-wider">準備好了嗎 ?</h2>
    <div className="flex flex-col items-center gap-8 mb-10">
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <label className="text-black text-xl font-semibold">遊戲時間：</label>
        <select
          value={duration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="card-neobrutalism bg-white px-6 py-3 text-lg font-medium cursor-pointer hover:bg-accent-100"
        >
          {DURATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <label className="text-black text-xl font-semibold">難易度：</label>
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value as 'easy' | 'hard')}
          className="card-neobrutalism bg-white px-6 py-3 text-lg font-medium cursor-pointer hover:bg-accent-100"
        >
          <option value="easy">簡單</option>
          <option value="hard">困難</option>
        </select>
      </div>
      <button
        className="btn-neobrutalism text-2xl px-12 py-4 hover:bg-accent-300 font-bold tracking-wider"
        onClick={onStart}
      >
        開始遊戲
      </button>
    </div>
  </div>
);

export default StartPrompt;
