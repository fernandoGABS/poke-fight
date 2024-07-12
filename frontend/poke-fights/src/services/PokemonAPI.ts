import axios from "axios";
const pokeApiUrl = `${process.env.REACT_APP_POKE_API_URL}`;

export const fetchPokemons = async (offset: number, limit: number) => {
  try {
    const response = await axios.get(
      `${pokeApiUrl}/pokemon?offset=${offset}&limit=${limit}`
    );
    const results = response.data.results;
    return results;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
};

export const fetchPokemonDetails = async (url:string) => {
  try {
    const response = await axios.get(url);
    const pokeData = response.data;
    return pokeData;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
};