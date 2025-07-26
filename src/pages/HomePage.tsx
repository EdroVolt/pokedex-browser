import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Header } from "@/components/layout/Header";
import { PokemonGrid } from "@/components/pokemon/PokemonGrid";

export function HomePage() {
  const [viewMode, setViewMode] = useState<"pagination" | "infinite">(
    "pagination"
  );

  return (
    <Layout>
      <Header currentView={viewMode} onViewChange={setViewMode} />
      <PokemonGrid viewMode={viewMode} />
    </Layout>
  );
}
