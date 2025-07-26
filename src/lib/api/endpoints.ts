// PokéAPI base configuration
export const API_BASE_URL = "https://pokeapi.co/api/v2";

// Endpoint paths
export const ENDPOINTS = {
  POKEMON_LIST: "/pokemon",
  POKEMON_DETAIL: (nameOrId: string | number) => `/pokemon/${nameOrId}`,
  POKEMON_SPECIES: (nameOrId: string | number) =>
    `/pokemon-species/${nameOrId}`,
} as const;

// Default pagination settings
export const DEFAULT_LIMIT = 20;
export const ITEMS_PER_PAGE = 20;

// Helper function to build full URLs
export const buildUrl = (
  endpoint: string,
  params?: Record<string, string | number>
) => {
  const url = new URL(endpoint, API_BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
};

// Helper to extract Pokemon ID from URL
export const extractPokemonId = (url: string): number => {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
};
