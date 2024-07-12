import { createSlice } from "@reduxjs/toolkit";
import { PokemonItem } from "../types/interfaces";

interface PokemonState {
  pokemonFighters: PokemonItem[];
  pokemonMax: number;
}

const initialState: PokemonState = {
  pokemonFighters: [],
  pokemonMax: 2
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addFighter: (state, action) => {
      if (state.pokemonFighters.length < state.pokemonMax) {
        state.pokemonFighters.unshift(action.payload);
      }
    },
    removeFighter: (state, action) => {
        console.log(action.payload);
        console.log(state.pokemonFighters.filter(
        (pokemon) => pokemon.id !== action.payload
      ))
      state.pokemonFighters = state.pokemonFighters.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
  },
});

export const { addFighter, removeFighter } = pokemonSlice.actions;

export default pokemonSlice.reducer;
