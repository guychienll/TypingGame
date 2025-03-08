import React from "react";

interface StartPromptProps {
  onStart: () => void;
}

const StartPrompt: React.FC<StartPromptProps> = ({ onStart }) => (
  <div className="card-neobrutalism bg-accent-200 p-6 mb-6">
    <p className="text-black mb-4">準備好測試您的打字速度了嗎？</p>
    <button className="btn-neobrutalism" onClick={onStart}>
      開始遊戲
    </button>
  </div>
);

export default StartPrompt;
