import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import { List, ListItem } from '@mui/material';
import { PokemonCardFightProps } from '../types/types';

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
