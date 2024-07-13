import { useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { listingPaperStyle, mainPaperStyle } from "../styles/CustomStyling";
import { PokemonItem } from "../types/interfaces";
import PokemonCard from "../components/PokeCard";
import PokeDex from "../components/PokeDex";
import { Link } from "react-router-dom";
import usePokemonFighters from "../hooks/usePokemonFighters";
import { PokeNavbar } from "../components/PokeNavbar";

const defaultPokemon: PokemonItem = {
  id: 0,
  name: "",
  url: "",
  image: "",
};


function PokemonFightersPage() {
  const [isShowingPokedex, setIsShowingPokedex] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonItem>(defaultPokemon);
  const { pokemonFighters } = usePokemonFighters();

  const viewPokemonDetails = (pokemon: PokemonItem) => {
    setSelectedPokemon(pokemon);
    setIsShowingPokedex(true);
  };

  return (
    <Grid>
      <PokeNavbar />
      <Paper style={mainPaperStyle}>
      
      <Typography variant="h4" component="h1" gutterBottom textAlign={"center"}>
        Pokémon Fighters List
      </Typography>
      {pokemonFighters.length === 2 && (
        <Link to="/pokemon-fight" >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Ready to Fight!
          </Button>
        </Link>
      )}
      <Grid style={listingPaperStyle}>
        {pokemonFighters.map((item: PokemonItem, i) => (
          <Grid item key={i}>
            <PokemonCard pokemon={item} onViewDetails={(pokemon) => viewPokemonDetails(pokemon)} />
          </Grid>
        ))}
      </Grid>
      {
        isShowingPokedex && (<PokeDex pokemon={selectedPokemon} onHide={()=>setIsShowingPokedex(false)} />)
      }
    </Paper>
    </Grid>
    
  );
}

export default PokemonFightersPage;
