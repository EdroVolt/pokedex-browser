import {
  PokemonListResponse,
  Pokemon,
  SimplifiedPokemon,
  ApiError,
  PokemonListItem,
} from "./types";
import {
  API_BASE_URL,
  ENDPOINTS,
  DEFAULT_LIMIT,
  extractPokemonId,
} from "./endpoints";

// Generic fetch function with error handling
async function apiRequest<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Network error: ${error.message}`);
    }
    throw new Error("Unknown error occurred");
  }
}

// Fetch Pokemon list with pagination
export async function fetchPokemonList(
  offset: number = 0,
  limit: number = DEFAULT_LIMIT
): Promise<PokemonListResponse> {
  const url = `${API_BASE_URL}${ENDPOINTS.POKEMON_LIST}?offset=${offset}&limit=${limit}`;
  return apiRequest<PokemonListResponse>(url);
}

// Fetch individual Pokemon details
export async function fetchPokemonDetail(
  nameOrId: string | number
): Promise<Pokemon> {
  const url = `${API_BASE_URL}${ENDPOINTS.POKEMON_DETAIL(nameOrId)}`;
  return apiRequest<Pokemon>(url);
}

// Transform full Pokemon data to simplified format for UI
export function transformPokemonData(pokemon: Pokemon): SimplifiedPokemon {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprites: {
      front_default: pokemon.sprites.front_default,
      official_artwork: pokemon.sprites.other["official-artwork"].front_default,
    },
    types: pokemon.types.map((type) => type.type.name),
    height: pokemon.height,
    weight: pokemon.weight,
    base_experience: pokemon.base_experience,
    stats: pokemon.stats.map((stat) => ({
      name: stat.stat.name,
      base_stat: stat.base_stat,
    })),
    abilities: pokemon.abilities.map((ability) => ({
      name: ability.ability.name,
      is_hidden: ability.is_hidden,
    })),
  };
}

// Get Pokemon ID from list item URL
export function getPokemonIdFromUrl(url: string): number {
  return extractPokemonId(url);
}

// Batch fetch Pokemon details (useful for getting images for list view)
export async function fetchPokemonBatch(
  pokemonList: PokemonListItem[]
): Promise<SimplifiedPokemon[]> {
  const promises = pokemonList.map(async (pokemon) => {
    const id = getPokemonIdFromUrl(pokemon.url);
    const fullPokemon = await fetchPokemonDetail(id);
    return transformPokemonData(fullPokemon);
  });

  return Promise.all(promises);
}

// Search Pokemon by name (basic implementation)
export async function searchPokemon(
  query: string
): Promise<SimplifiedPokemon | null> {
  try {
    const pokemon = await fetchPokemonDetail(query.toLowerCase());
    return transformPokemonData(pokemon);
  } catch (error) {
    return null;
  }
}
