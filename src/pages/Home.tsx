import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StartPrompt from '../components/StartPrompt';

function Home() {
  const [gameDuration, setGameDuration] = useState(60);
  const navigate = useNavigate();

  const handleStart = () => {
    sessionStorage.setItem('gameDuration', gameDuration.toString());
    navigate('/game');
  };

  return <StartPrompt onStart={handleStart} duration={gameDuration} onDurationChange={setGameDuration} />;
}

export default Home;
