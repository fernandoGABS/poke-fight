import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { AddCircleOutline, ListOutlined, RemoveCircleOutline } from "@mui/icons-material";
import Swal from "sweetalert2";

import { addFighter, removeFighter } from "../store/pokemonSlice";
import usePokemonFighters from "../hooks/usePokemonFighters";
import { pokeButtonDanger, pokeButtonPrimary, pokeButtonSecondary } from "../styles/CustomStyling";
import { PokemonCardProps } from "../types/types";

const PokemonCard: FunctionComponent<PokemonCardProps> = ({ pokemon, onViewDetails }) => {
  const { pokemonFighters, isPokemonAdded } = usePokemonFighters();
  const [selectedToFight, setSelectedToFight] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    setSelectedToFight(isPokemonAdded(pokemon.id));
  }, [isPokemonAdded, pokemon.id, pokemonFighters]);
  
  const viewPokemonInfo = () => {
    onViewDetails(pokemon);
  };

  const toggleFighter = () => {
    if (selectedToFight) {
      dispatch(removeFighter(pokemon.id));
      setSelectedToFight(false);
    } else {
      if (pokemonFighters.length === 2) {
        Swal.fire("Warning", "Can't add more than two fighters", "error");
      } else {
        dispatch(addFighter(pokemon));
        setSelectedToFight(true);
      }
    }
  };

  return (
    <Card sx={{ display: "flex" , textAlign: { xs: "center", md: "left" }, flexDirection: { xs: "column", md: "row" }}}>
      <CardMedia
        component="img"
        sx={{ width: 151, margin:"auto" }}
        image={pokemon.image}
        alt={`${pokemon.name} picture photo`}
      />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "center" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" textTransform="capitalize">
            {pokemon.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1, flexDirection: { xs: "column", md: "row" } }}>
            <Button
              onClick={viewPokemonInfo}
              sx={pokeButtonPrimary}
              variant="contained"
              size="small"
              endIcon={<ListOutlined />}
            >
              Details
            </Button>
            <Button
              onClick={toggleFighter}
              sx={selectedToFight ? pokeButtonDanger : pokeButtonSecondary}
              variant="contained"
              size="small"
              endIcon={selectedToFight ? <RemoveCircleOutline /> : <AddCircleOutline />}
            >
              {selectedToFight ? "Retire fighter" : "Select fighter"}
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PokemonCard;