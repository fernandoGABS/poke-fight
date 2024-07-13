import axios from "axios";
import { writeAPILog } from "./MiddlewareService";
const pokeApiUrl = `${process.env.REACT_APP_POKE_API_URL}`;

export const fetchPokemons = async (offset: number, limit: number) => {
  try {
    const url = `${pokeApiUrl}/pokemon?offset=${offset}&limit=${limit}`;
    const response = await axios.get(url);
    const results = response.data.results;
    //write log:
    writeAPILog(`User used API url to query pokemon list: ${url}`);
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
    //write log:
    writeAPILog(`User used API url to get info: ${url}`);
    return pokeData;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
};