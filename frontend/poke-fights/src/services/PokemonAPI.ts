import axios from "axios";
const pokeApiUrl = `${process.env.REACT_APP_POKE_API_URL}`;

export const fetchPokemons = async () => {
  try {
    const response = await axios.get(`${pokeApiUrl}/pokemon?limit=151`);
    const results = response.data.results;
    return results;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
};
