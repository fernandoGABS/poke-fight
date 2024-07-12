import { useEffect, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { listingPaperStyle, mainPaperStyle } from "../styles/CustomStyling";
import { fetchPokemons } from "../services/PokemonAPI";
import { PokemonItem } from "../types/interfaces";
import PokemonCard from "../components/PokeCard";
import PokemonLoader from "../components/PokeLoader";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import PokeDex from "../components/PokeDex";
import { Link } from "react-router-dom";

const pokemonDefaultValues : PokemonItem = {
    id: 0,
    name:"",
    url: "",
    image: ""
}

function getPokemonImageBasedOnUrl(url: string) {
  const baseSprite =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
  const urlParts = url.split("/");
  const pokemonId = urlParts[urlParts.length - 2];
  return `${baseSprite}/${pokemonId}.png`;
}

function ListPokemonPage() {
  const pokemonLimit = 15; //show 10, 20, 30... change it manually
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [pokemonOffset, setPokemonOffset] = useState(0);
  const [isLoadingMorePokemon, setIsLoadingMorePokemon] = useState(true);
  const [pokemonDetailed, setPokemonDetailed] = useState<PokemonItem>(pokemonDefaultValues);
  const [isShowingPokedex, setIsShowingPokedex] = useState(false);

  const pokemonFighters = useSelector(
    (state: RootState) => state.pokemon.pokemonFighters
  );

  useEffect(() => {
    const listPokemon = async () => {
      setIsLoadingMorePokemon(true);
      const results = await fetchPokemons(pokemonOffset, pokemonLimit);
      if (results) {
        const processed = results.map((item: PokemonItem, i: number) => {
          return {
            id: i,
            name: item.name,
            url: item.url,
            image: getPokemonImageBasedOnUrl(item.url),
          };
        });
        setPokemonList((prevList) => [...prevList, ...processed]);
        setIsLoadingMorePokemon(false);
      }
    };
    listPokemon();
  }, [pokemonOffset]);

  const loadMorePokemons = () => {
    setPokemonOffset((prevOffset) => prevOffset + pokemonLimit);
  };

  const viewPokemonInfo = (selectedPokemon: PokemonItem) =>{
    setPokemonDetailed(selectedPokemon);
    setIsShowingPokedex(true);
    console.log(isShowingPokedex)
    console.log(selectedPokemon)
  }

  return (
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
            onClick={loadMorePokemons}
            sx={{ marginTop: 2 }}
          >
            Ready to Fight!
          </Button>
        </Link>
      )}
      <Grid style={listingPaperStyle}>
        {pokemonList.map((item: PokemonItem, i) => (
          <Grid item key={i}>
            <PokemonCard pokemon={item} onViewDetails={(pokemon) => viewPokemonInfo(pokemon)} />
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
        isShowingPokedex && (<PokeDex pokemon={pokemonDetailed} onHide={()=>setIsShowingPokedex(false)} />)
      }
    </Paper>
  );
}

export default ListPokemonPage;
