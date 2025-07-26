import { ViewToggle } from "./ViewToggle";

interface HeaderProps {
  currentView: "pagination" | "infinite";
  onViewChange: (view: "pagination" | "infinite") => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">⚡ Pokédex</h1>
      <p className="text-gray-600 mb-6">
        Discover and explore Pokémon with{" "}
        {currentView === "pagination" ? "page controls" : "infinite scroll"}
      </p>
      <ViewToggle currentView={currentView} onViewChange={onViewChange} />
    </div>
  );
}
