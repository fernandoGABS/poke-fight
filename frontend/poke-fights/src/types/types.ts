import { PokemonItem, PokemonItemDetails } from "./interfaces";

export type PokeAPILogProps = {
  onHide: () => void;
};

export type PokemonCardProps = {
  pokemon: PokemonItem;
  onViewDetails: (pokemon: PokemonItem) => void;
};

export type PokemonCardFightProps = {
  pokemon: PokemonItemDetails;
};

export type PokedexProps = {
  pokemon: PokemonItem;
  onHide: () => void;
};