import { createSlice } from "@reduxjs/toolkit";
import { PokemonState } from "../types/interfaces";

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
      state.pokemonFighters = state.pokemonFighters.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
    removeAllFighters: (state) => {
      state.pokemonFighters = [];
    },
  },
});

export const { addFighter, removeFighter, removeAllFighters } = pokemonSlice.actions;

export default pokemonSlice.reducer;
