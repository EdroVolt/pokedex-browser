import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { PokemonDetailPage } from "@/pages/PokemonDetailPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
