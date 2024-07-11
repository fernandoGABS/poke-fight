import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Paper } from '@mui/material';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { listingPaperStyle, mainPaperStyle } from '../styles/CustomStyling';
import { fetchPokemons } from '../services/PokemonAPI';
import { PokemonListItem } from '../types/interfaces';

function getPokemonImageBasedOnUrl(url: string){
  const baseSprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
  const urlParts = url.split('/');
  const pokemonId = urlParts[urlParts.length - 2];
  return `${baseSprite}/${pokemonId}.png`;
}

function PokemonPage() {
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(()=>{
    const listPokemon = async () =>{
      const results = await fetchPokemons();
      if(results){
          const processed = results.map((item: PokemonListItem) => {
          return {
            "name": item.name,
            "url": item.url,
            "image": getPokemonImageBasedOnUrl(item.url)
          }
        });
        setPokemonList(processed)
      }
    }
    listPokemon();
  },[]);
  
  return (
    <Paper style={mainPaperStyle}>
        <Typography variant="h4" component="h1" gutterBottom>
          Pokémon List
        </Typography>
        <List style={listingPaperStyle}>
          {pokemonList.map((item:PokemonListItem, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar src={item.image} alt={item.name} />
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
  );
}

export default PokemonPage;