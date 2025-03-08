import { useEffect, useMemo, useRef, useState } from "react";
import GameOver from "./components/GameOver";
import GameStats from "./components/GameStats";
import HiddenInput from "./components/HiddenInput";
import StartPrompt from "./components/StartPrompt";
import TypingArea from "./components/TypingArea";
import useArticle, { Article } from "./hooks/useArticle";
import useTimer from "./hooks/useTimer";
import { calculateAccuracy, calculateTypingStats, calculateWPM } from "./utils";

function App() {
  const articles = useArticle();
  const [article, setArticle] = useState<Article | null>(null);
  const { timeLeft, reset: resetTimer, started, finished } = useTimer(60);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>("");
  const [isEnglishInput, setIsEnglishInput] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const { correct, incorrect } = useMemo(() => {
    if (!article) return { correct: 0, incorrect: 0 };
    return calculateTypingStats(typedText, article.content);
  }, [typedText, article]);

  const wpm = useMemo(() => {
    if (!started && !finished) return 0;
    const minutes = (60 - timeLeft) / 60;
    return calculateWPM(correct, minutes);
  }, [correct, timeLeft, started, finished]);

  const accuracy = useMemo(() => {
    if (!started && !finished) return 100;
    return calculateAccuracy(correct, incorrect);
  }, [correct, finished, incorrect, started]);

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    setArticle(articles[randomIndex]);
    resetTimer();
    setCurrentIndex(0);
    setTypedText("");
    inputRef.current?.focus();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started || finished || !article) return;

    const value = e.target.value;
    // 檢查是否為英文輸入
    const isEnglish = /^[a-zA-Z0-9\s.,!?'";\-:()]*$/.test(value);
    setIsEnglishInput(isEnglish);

    if (!isEnglish) {
      return; // 如果不是英文輸入則不更新
    }

    setTypedText(value);
    setCurrentIndex(value.length);

    const audio = new Audio("/type.mp3");
    audio.volume = 0.1;
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 200);
  };

  useEffect(() => {
    if (started && !finished) {
      inputRef.current?.focus();
    }
  }, [started, finished]);

  return (
    <div className="max-h-[100dvh] w-full bg-primary-100 flex flex-col items-center justify-center p-8">
      <div className="card-neobrutalism max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-black">英文打字遊戲</h1>

        <GameStats timeLeft={timeLeft} wpm={wpm} accuracy={accuracy} />

        {!started && !finished && <StartPrompt onStart={startGame} />}

        {(started || finished) && (
          <TypingArea
            article={article}
            currentIndex={currentIndex}
            typedText={typedText}
            onFocus={() => inputRef.current?.focus()}
          />
        )}

        {started && !finished && (
          <div
            className={`bg-red-100 border-2 border-red-500 p-4 mb-4 text-red-700 ${
              isEnglishInput ? "invisible" : "visible"
            }`}
          >
            請切換至英文輸入法
          </div>
        )}

        {finished && (
          <GameOver
            wpm={wpm}
            accuracy={accuracy}
            correct={correct}
            incorrect={incorrect}
            onRestart={startGame}
          />
        )}

        <HiddenInput
          inputRef={inputRef}
          typedText={typedText}
          onInput={handleInput}
          disabled={!started || finished}
        />
      </div>
    </div>
  );
}

export default App;
