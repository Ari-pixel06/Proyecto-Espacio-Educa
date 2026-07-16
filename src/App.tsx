import "./App.css";
import { CardsProvider } from './contexts/CardsContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import VistaMazo from "./screens/VistaMazo";
import AddCard from "./screens/AddCard";
import GenerateCard from "./screens/GenerateCard";
import CardDetail from "./screens/CardDetail";
import Battle from "./screens/Battle";

function App() {
  return (
    <CardsProvider>
      <Routes>
        <Route path="/" element={<VistaMazo />} />
        <Route path="/add" element={<AddCard />} />
        <Route path="/add-ai" element={<GenerateCard />} />
        <Route path="/edit/:cardId" element={<AddCard />} />
        <Route path="/cards/:cardId" element={<CardDetail />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CardsProvider>
  );
}

export default App;
