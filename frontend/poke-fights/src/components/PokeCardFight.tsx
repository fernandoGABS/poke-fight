import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { PokemonItem, PokemonItemDetails } from '../types/interfaces';
import { FunctionComponent, useState } from 'react';
import { AddCircleOutline, CheckCircleOutline, Details, DetailsOutlined, GraphicEqSharp, ListOutlined, RemoveCircle, RemoveCircleOutline, Send, ViewAgenda } from '@mui/icons-material';
import { Avatar, Button, Chip, List, ListItem } from '@mui/material';
import { pokeButtonDanger, pokeButtonPrimary, pokeButtonSecondary } from '../styles/CustomStyling';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addFighter, removeFighter } from '../store/pokemonSlice';
import Swal from "sweetalert2";

type PokemonCardFightProps = {
  pokemon: PokemonItemDetails
}

export const  PokemonCardFight: FunctionComponent<PokemonCardFightProps> = ({pokemon}) => {
  return (
     <Card >
        <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={pokemon.image}
            alt={`${pokemon.name} picture photo`}
        />
      <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" textTransform={"capitalize"}>
            {pokemon.name}
          </Typography>
          <List>
            <ListItem>HP: {(pokemon.hp<0?0:pokemon.hp)}</ListItem>
            <ListItem>Attack: {pokemon.attack}</ListItem>
            <ListItem>Defense: {pokemon.defense}</ListItem>
          </List>
        </CardContent>
      
    </Card>
  );
}

export default PokemonCardFight;
