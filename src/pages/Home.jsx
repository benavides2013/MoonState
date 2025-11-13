import { useState, useEffect } from 'react';
import { getJuegos } from '../services/api';
import GameList from '../components/GameList';
import GameDetail from '../components/GameDetail';

export default function Home() {
  const [juegos, setJuegos] = useState([]);
  const [selectedJuego, setSelectedJuego] = useState(null);

  useEffect(() => {
    getJuegos().then(setJuegos);
  }, []);

  return (
    <div className="home-page">
      <h1>MoonState Games</h1>
      <GameList juegos={juegos} onSelectJuego={setSelectedJuego} />
      <GameDetail juego={selectedJuego} />
    </div>
  );
}
