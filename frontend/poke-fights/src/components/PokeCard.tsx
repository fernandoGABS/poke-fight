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
import { PokemonItem } from '../types/interfaces';
import { FunctionComponent, useState } from 'react';
import { AddCircleOutline, CheckCircleOutline, Details, DetailsOutlined, GraphicEqSharp, ListOutlined, RemoveCircle, RemoveCircleOutline, Send, ViewAgenda } from '@mui/icons-material';
import { Avatar, Button, Chip } from '@mui/material';
import { pokeButtonDanger, pokeButtonPrimary, pokeButtonSecondary } from '../styles/CustomStyling';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addFighter, removeFighter } from '../store/pokemonSlice';
import Swal from "sweetalert2";

type PokemonCardProps = {
  pokemon: PokemonItem,
  onViewDetails: (pokemon:PokemonItem)=> void;
}

export const  PokemonCard: FunctionComponent<PokemonCardProps> = ({pokemon, onViewDetails}) => {
    const [selectedToFight, setSelectedToFight] = useState(false);
    const pokemonFighters = useSelector((state: RootState) => state.pokemon.pokemonFighters);
    const dispatch = useDispatch();
    const viewPokemonInfo = () =>{
        onViewDetails(pokemon);
    }
    const toggleFighter = () =>{
        
        if(selectedToFight){
            dispatch(removeFighter(pokemon.id));
            setSelectedToFight(false);
        }else{
            if(pokemonFighters.length===2){
                Swal.fire("Warning", "Can't add more than two fighters", "error");
            }else{
                dispatch(addFighter(pokemon));
                setSelectedToFight(true);
            }
        }
        console.log(pokemonFighters)
    }
  return (
     <Card sx={{ display: 'flex' }}>
        <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={pokemon.image}
            alt={`${pokemon.name} picture photo`}
        />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" textTransform={"capitalize"}>
            {pokemon.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }} >
            <Button onClick={viewPokemonInfo} sx={pokeButtonPrimary} variant="contained" size='small' endIcon={<ListOutlined  />} >
                Details
            </Button>
            {!selectedToFight && (
                <Button onClick={toggleFighter} sx={pokeButtonSecondary} variant="contained" size='small' endIcon={<AddCircleOutline  />}>
                    Select fighter
                </Button>
            )}
            {selectedToFight && (
                <Button onClick={toggleFighter} sx={pokeButtonDanger} variant="contained" size='small' endIcon={<RemoveCircleOutline  />}>
                    Retire fighter
                </Button>
            )}
            
        </Box>
        </CardContent>
        
      </Box>
      
    </Card>
  );
}

export default PokemonCard;
