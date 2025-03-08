import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameStats from '../components/GameStats';
import HiddenInput from '../components/HiddenInput';
import TypingArea from '../components/TypingArea';
import useArticle, { Article } from '../hooks/useArticle';
import useTimer from '../hooks/useTimer';
import { calculateAccuracy, calculateTypingStats, calculateWPM } from '../utils';

function Game() {
  const [article, setArticle] = useState<Article | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const [isEnglishInput, setIsEnglishInput] = useState(true);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const articles = useArticle();

  const gameDuration = useMemo(() => {
    const duration = sessionStorage.getItem('gameDuration');
    return duration ? parseInt(duration, 10) : 60;
  }, []);

  const { timeLeft, reset: resetTimer, setStarted, started, finished } = useTimer(gameDuration);

  const { correct, incorrect } = useMemo(() => {
    if (!article) return { correct: 0, incorrect: 0 };
    return calculateTypingStats(typedText, article.content);
  }, [typedText, article]);

  const wpm = useMemo(() => {
    if (!started) return 0;
    const minutes = (gameDuration - timeLeft) / 60;
    return calculateWPM(correct, minutes);
  }, [started, gameDuration, timeLeft, correct]);

  const accuracy = useMemo(() => {
    if (!started) return 100;
    return calculateAccuracy(correct, incorrect);
  }, [correct, incorrect, started]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started || finished || !article) return;

    const value = e.target.value;
    const isEnglish = /^[a-zA-Z0-9\s.,!?'";\-:()]*$/.test(value);
    setIsEnglishInput(isEnglish);

    if (!isEnglish) return;

    setTypedText(value);
    setCurrentIndex(value.length);

    playTypeSound();
  };

  const playTypeSound = () => {
    const audio = new Audio('/type.mp3');
    audio.volume = 0.1;
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 200);
  };

  // 遊戲開始時選擇一篇隨機文章
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    setArticle(articles[randomIndex]);
    resetTimer();
    setCurrentIndex(0);
    setTypedText('');
    setStarted(true);
    inputRef.current?.focus();
  }, [articles, resetTimer, setStarted]);

  // 遊戲結束時導航到結果頁面
  useEffect(() => {
    if (finished) {
      // 將遊戲統計數據保存到 sessionStorage
      sessionStorage.setItem(
        'gameStats',
        JSON.stringify({
          wpm,
          accuracy,
          correct,
          incorrect,
        }),
      );

      navigate('/results');
    }
  }, [finished, wpm, accuracy, correct, incorrect, navigate]);

  // 確保輸入框獲得焦點
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <GameStats timeLeft={timeLeft} wpm={wpm} accuracy={accuracy} />
      <TypingArea
        article={article}
        currentIndex={currentIndex}
        typedText={typedText}
        onFocus={() => inputRef.current?.focus()}
      />
      <div
        className={`bg-red-100 border-2 border-red-500 p-4 mb-4 text-red-700 ${
          isEnglishInput ? 'invisible' : 'visible'
        }`}
      >
        請切換至英文輸入法
      </div>
      <HiddenInput inputRef={inputRef} typedText={typedText} onInput={handleInput} disabled={!started || finished} />
    </>
  );
}

export default Game;
