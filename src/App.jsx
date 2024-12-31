import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import TeamSelector from './views/TeamSelection';
import Timer from './views/Timer';
import CardSelector from './views/CardSelector';
import TurnManager from './views/TurnManager';
// Importa las demás páginas aquí...

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team-selection" element={<TeamSelector />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/card-selection" element={<CardSelector />} />
        <Route path="/turn-management" element={<TurnManager />} />
      </Routes>
    </Router>
  );
};

export default App;
