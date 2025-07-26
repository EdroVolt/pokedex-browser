export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">⚡ Pokédex</h1>
        <p className="text-gray-600 mb-6">
          Discover and explore Pokémon with infinite scroll
        </p>
        {/* View toggle will go here */}
      </div>

      {/* Pokemon grid will go here */}
      <div className="text-center text-gray-500">
        Pokemon grid coming soon...
      </div>
    </div>
  );
}
