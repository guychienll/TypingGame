import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StartPrompt from '../components/StartPrompt';

function Home() {
  const [gameDuration, setGameDuration] = useState(60);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');
  const navigate = useNavigate();

  const handleStart = () => {
    sessionStorage.setItem('gameDuration', gameDuration.toString());
    sessionStorage.setItem('difficulty', difficulty);
    navigate('/game');
  };

  return (
    <StartPrompt
      onStart={handleStart}
      duration={gameDuration}
      onDurationChange={setGameDuration}
      difficulty={difficulty}
      onDifficultyChange={setDifficulty}
    />
  );
}

export default Home;
