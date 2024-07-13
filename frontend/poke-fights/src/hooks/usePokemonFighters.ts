import { useSelector } from "react-redux";
import { RootState } from "../store";

const usePokemonFighters = () => {
  const pokemonFighters = useSelector(
    (state: RootState) => state.pokemon.pokemonFighters
  );

  const isPokemonAdded = (pokemonId: number) => {
    return pokemonFighters.some((fighter) => fighter.id === pokemonId);
  };

  return { pokemonFighters, isPokemonAdded };
};

export default usePokemonFighters;
