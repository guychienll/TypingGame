import { useCallback, useEffect, useState } from 'react';

const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [started, setStarted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!started || finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished]);

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setStarted(true);
    setFinished(false);
  }, [initialTime]);

  return { timeLeft, reset, started, finished, setStarted, setFinished };
};

export default useTimer;
