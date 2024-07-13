import { useEffect, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { listingPaperStyle, mainPaperStyle } from "../styles/CustomStyling";
import { fetchPokemons } from "../services/PokemonAPI";
import { PokemonItem } from "../types/interfaces";
import PokemonCard from "../components/PokeCard";
import PokemonLoader from "../components/PokeLoader";
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

const getPokemonImageUrl = (url: string): string => {
  const baseSpriteUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
  const urlParts = url.split("/");
  const pokemonId = urlParts[urlParts.length - 2];
  return `${baseSpriteUrl}/${pokemonId}.png`;
};

function ListPokemonPage() {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [pokemonOffset, setPokemonOffset] = useState(0);
  const [isLoadingMorePokemon, setIsLoadingMorePokemon] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonItem>(defaultPokemon);
  const [isShowingPokedex, setIsShowingPokedex] = useState(false);

  const { pokemonFighters } = usePokemonFighters();
  const pokemonLimit = 15;

  useEffect(() => {
    const fetchPokemonList = async () => {
      setIsLoadingMorePokemon(true);
      const results = await fetchPokemons(pokemonOffset, pokemonLimit);
      if (results) {
        const processedPokemons = results.map((item: PokemonItem, i: number) => ({
          id: i,
          name: item.name,
          url: item.url,
          image: getPokemonImageUrl(item.url),
        }));
        setPokemonList((prevList) => [...prevList, ...processedPokemons]);
        setIsLoadingMorePokemon(false);
      }
    };
    fetchPokemonList();
  }, [pokemonOffset]);

  const loadMorePokemons = () => {
    setPokemonOffset((prevOffset) => prevOffset + pokemonLimit);
  };

  const viewPokemonDetails = (pokemon: PokemonItem) => {
    setSelectedPokemon(pokemon);
    setIsShowingPokedex(true);
  };

  return (
    <Grid>
      <PokeNavbar />
      <Paper style={mainPaperStyle}>
      
      <Typography variant="h4" component="h1" gutterBottom textAlign={"center"}>
        Pokémon List
      </Typography>
      {pokemonFighters.length < 2 && (
        <Typography component="p" gutterBottom textAlign={"center"}>
          View and select your pokemon to fight themselves
        </Typography>
      )}

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
        {pokemonList.map((item: PokemonItem, i) => (
          <Grid item key={i}>
            <PokemonCard pokemon={item} onViewDetails={(pokemon) => viewPokemonDetails(pokemon)} />
          </Grid>
        ))}

        {isLoadingMorePokemon && <PokemonLoader />}
        {!isLoadingMorePokemon && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={loadMorePokemons}
            sx={{ marginTop: 2, marginBottom: "40px" }}
          >
            Load More
          </Button>
        )}
      </Grid>
      {
        isShowingPokedex && (<PokeDex pokemon={selectedPokemon} onHide={()=>setIsShowingPokedex(false)} />)
      }
    </Paper>
    </Grid>
    
  );
}

export default ListPokemonPage;
