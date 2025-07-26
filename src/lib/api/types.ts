// Base types for API responses
export interface ApiResource {
  name: string;
  url: string;
}

export interface NamedApiResource {
  name: string;
  url: string;
}

// Pokemon List Response (for pagination)
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

// Pokemon Detail Response
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  abilities: PokemonAbility[];
  forms: NamedApiResource[];
  game_indices: any[];
  held_items: any[];
  location_area_encounters: string;
  moves: PokemonMove[];
  species: NamedApiResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: any[];
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedApiResource;
}

export interface PokemonMove {
  move: NamedApiResource;
  version_group_details: any[];
}

export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  versions: any; // Complex nested structure, simplified for now
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
}

export interface PokemonType {
  slot: number;
  type: NamedApiResource;
}

// Simplified types for our UI components
export interface SimplifiedPokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    official_artwork: string | null;
  };
  types: string[];
  height: number;
  weight: number;
  base_experience: number;
  stats: {
    name: string;
    base_stat: number;
  }[];
  abilities: {
    name: string;
    is_hidden: boolean;
  }[];
}

// Type mapping for colors/themes
export type PokemonTypeName =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy";

// API Error types
export interface ApiError {
  message: string;
  status?: number;
}

// Hook return types
export interface UsePokemonListResult {
  pokemon: PokemonListItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: ApiError | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  // Navigation methods
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

export interface UseInfinitePokemonResult {
  pokemon: PokemonListItem[];
  isLoading: boolean;
  error: ApiError | null;
  hasNextPage: boolean;
  loadMore: () => void;
  isFetchingNextPage: boolean;
}

export interface UsePokemonDetailResult {
  pokemon: SimplifiedPokemon | null;
  isLoading: boolean;
  error: ApiError | null;
}
