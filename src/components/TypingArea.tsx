import React from 'react';
import { Article } from '../hooks/useArticle';

const CHARACTER_STYLE = {
  correct: 'text-green-400 text-3xl tracking-wide font-gemunu-libre',
  incorrect: 'text-red-400 text-3xl tracking-wide font-gemunu-libre',
  current: 'text-gray-900 bg-primary-300 text-3xl tracking-wide font-gemunu-libre',
  default: 'text-gray-500 text-3xl tracking-wide font-gemunu-libre',
};

interface TypingAreaProps {
  article: Article | null;
  currentIndex: number;
  typedText: string;
  onFocus: () => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({ article, currentIndex, typedText, onFocus }) => {
  const getCharacterStyle = (char: string, index: number) => {
    if (index < currentIndex) {
      const isCorrect = typedText[index] === char;
      return isCorrect ? CHARACTER_STYLE.correct : CHARACTER_STYLE.incorrect;
    }
    if (index === currentIndex) {
      return CHARACTER_STYLE.current;
    }
    return CHARACTER_STYLE.default;
  };

  const renderCharacter = (char: string, index: number) => (
    <span key={index} className={getCharacterStyle(char, index)}>
      {char}
    </span>
  );

  return (
    <div className="card-neobrutalism bg-white p-4 mb-6 overflow-auto max-h-60" onClick={onFocus}>
      {article?.content.split('').map(renderCharacter)}
    </div>
  );
};

export default TypingArea;
