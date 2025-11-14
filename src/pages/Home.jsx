import { useState, useEffect } from "react";
import { getJuegos } from "../services/api";
import GameList from "../components/GameList";
import GameDetail from "../components/GameDetail";

export default function Home() {
  const [juegos, setJuegos] = useState([]);
  const [selectedJuego, setSelectedJuego] = useState(null);

  useEffect(() => {
    const fetchJuegos = async () => {
      const data = await getJuegos();
      setJuegos(data);
    };
    fetchJuegos();
  }, []);

  return (
    <div>
      <h1>🎮 MoonState Games</h1>

      <GameList juegos={juegos} onSelectJuego={setSelectedJuego} />

      <GameDetail juego={selectedJuego} />
    </div>
  );
}
