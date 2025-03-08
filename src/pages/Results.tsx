import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameOver from '../components/GameOver';

interface GameStats {
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
}

function Results() {
  const [stats, setStats] = useState<GameStats>({
    wpm: 0,
    accuracy: 100,
    correct: 0,
    incorrect: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const statsString = sessionStorage.getItem('gameStats');
    if (statsString) {
      try {
        const parsedStats = JSON.parse(statsString);
        setStats(parsedStats);
      } catch (error) {
        console.error('Failed to parse game stats:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleRestart = () => {
    navigate('/game');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <GameOver
      wpm={stats.wpm}
      accuracy={stats.accuracy}
      correct={stats.correct}
      incorrect={stats.incorrect}
      onRestart={handleRestart}
      onBackToHome={handleBackToHome}
    />
  );
}

export default Results;
