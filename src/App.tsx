import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { HomePage } from "@/pages/HomePage";
import { PokemonDetailPage } from "@/pages/PokemonDetailPage";
import { PokemonSkeletonGrid } from "@/components/pokemon/PokemonSkeleton";
import { Layout } from "@/components/layout/Layout";
import "./App.css";

// Loading fallback for pages
function PageLoadingFallback() {
  return (
    <Layout>
      <div className="text-center mb-8">
        <div className="w-48 h-10 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
        <div className="w-72 h-6 bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse"></div>
        <div className="flex gap-2 justify-center">
          <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
      <PokemonSkeletonGrid count={20} />
    </Layout>
  );
}

// Loading fallback for detail page
function DetailPageLoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <div className="w-32 h-10 bg-white/20 rounded-lg mb-6 animate-pulse"></div>
        <div className="text-center text-white mb-8">
          <div className="w-48 h-10 bg-white/20 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="w-24 h-6 bg-white/20 rounded-lg mx-auto animate-pulse"></div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/pokemon/:name"
            element={
              <Suspense fallback={<DetailPageLoadingFallback />}>
                <ErrorBoundary>
                  <PokemonDetailPage />
                </ErrorBoundary>
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
