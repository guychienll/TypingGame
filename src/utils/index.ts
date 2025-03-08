const calculateTypingStats = (value: string, content: string) => {
  let correct = 0;
  let incorrect = 0;

  for (let i = 0; i < value.length; i++) {
    if (i >= content.length) {
      incorrect++;
    } else if (value[i] === content[i]) {
      correct++;
    } else {
      incorrect++;
    }
  }

  return { correct, incorrect };
};

const calculateAccuracy = (correct: number, incorrect: number) => {
  if (correct + incorrect > 0) {
    return Math.round((correct / (correct + incorrect)) * 100);
  }
  return 100;
};

const calculateWPM = (correct: number, minutes: number) => {
  if (minutes > 0) {
    const words = correct / 5;
    return Math.round(words / minutes);
  }
  return 0;
};

export { calculateAccuracy, calculateTypingStats, calculateWPM };
