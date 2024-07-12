import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Grid, Paper, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { listingPaperStyle, mainPaperStyle, pokeLogStyle } from "../styles/CustomStyling";
import { fetchPokemonDetails } from "../services/PokemonAPI";
import { PokemonItemDetails } from "../types/interfaces";
import PokemonCardFight from "../components/PokeCardFight";
import PokemonLoader from "../components/PokeLoader";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const returnStat = (stats: any[], key: string): number => {
  const stat = stats.find((item) => item.stat.name === key);
  return stat ? stat.base_stat : 0;
};

const pokemonDefaultValues: PokemonItemDetails = {
  id: 0,
  name: "",
  url: "",
  image: "",
  sprites: {
    front_default: ""
  },
  abilities: [],
  types: [],
  stats: [],
  attack: 0,
  special: 0,
  defense: 0,
  hp: 0
}

function FightPokemonPage() {
  const [pokemonFighterA, setPokemonFighterA] = useState<PokemonItemDetails>(pokemonDefaultValues);
  const [pokemonFighterB, setPokemonFighterB] = useState<PokemonItemDetails>(pokemonDefaultValues);
  const [pokeLog, setPokeLog] = useState<string[]>([]);
  const [isBattleFinished, setIsBattleFinished] = useState(false);
  const [amIWinner, setAmIWinner] = useState(false);
  const [isLoadingPokemonData, setIsLoadingPokemonData] = useState(true);
  const pokemonFighters = useSelector((state: RootState) => state.pokemon.pokemonFighters);

  const writeInLog = (msg: string) => {
    setPokeLog((prevLog) => [...prevLog, msg]);
  }

  const attackPokemon = () => {
    let attack = pokemonFighterA.attack;
    if (pokemonFighterB.defense > attack) {
      attack = Math.round((pokemonFighterB.defense - attack)*0.2);
    } else {
      attack = attack - pokemonFighterB.defense;
    }
    let difference = pokemonFighterB.hp - attack;
    const updatedPokeB = {
        ...pokemonFighterB,
        hp: difference,
      };
      setPokemonFighterB(updatedPokeB);
    if (difference <= 0) {
      setAmIWinner(true);
      setIsBattleFinished(true);
      writeInLog("FINISHED, YOU WON!!");
    } else {
      
      writeInLog(`${pokemonFighterA.name} has ended attack (+${attack}), IA has HP: ${difference}`);
      
      // IA attacks now:
      attack = pokemonFighterB.attack;
      if (pokemonFighterA.defense > attack) {
        attack = Math.round((pokemonFighterA.defense - attack)*0.2);
      } else {
        attack = attack - pokemonFighterA.defense;
      }
      difference = pokemonFighterA.hp - attack;
      const updatedPokeA = {
          ...pokemonFighterA,
          hp: difference,
        };
        setPokemonFighterA(updatedPokeA);
      if (difference <= 0) {
        setAmIWinner(false);
        setIsBattleFinished(true);
        writeInLog("FINISHED, YOU LOST :C");
      } else {
        
        writeInLog(`${pokemonFighterB.name} has ended attack (+${attack}), you have now HP: ${difference}`);
      }
    }
  }

  useEffect(() => {
    const getPokemonData = async () => {
      setIsLoadingPokemonData(true);
      const [pokeA, pokeB] = await Promise.all([
        fetchPokemonDetails(pokemonFighters[0].url),
        fetchPokemonDetails(pokemonFighters[1].url),
      ]);

      if (pokeA && pokeB) {
        const updatedPokeA = {
          ...pokeA,
          image: pokemonFighters[0].image,
          hp: returnStat(pokeA.stats, "hp"),
          attack: returnStat(pokeA.stats, "attack"),
          defense: returnStat(pokeA.stats, "defense"),
        };

        const updatedPokeB = {
          ...pokeB,
          image: pokemonFighters[1].image,
          hp: returnStat(pokeB.stats, "hp"),
          attack: returnStat(pokeB.stats, "attack"),
          defense: returnStat(pokeB.stats, "defense"),
        };

        setPokemonFighterA(updatedPokeA);
        setPokemonFighterB(updatedPokeB);
        setIsLoadingPokemonData(false);
      }
    };

    if (pokemonFighters.length === 2) {
      getPokemonData();
    }
  }, [pokemonFighters]);

  return (
    <Paper style={mainPaperStyle}>
      <Typography variant="h4" component="h1" gutterBottom textAlign={"center"}>
        Pokémon Fight!
      </Typography>
      <Grid style={listingPaperStyle} textAlign={"center"}>
        {isLoadingPokemonData && <PokemonLoader />}

        {!isLoadingPokemonData && pokemonFighterA && pokemonFighterB && (
          <>
            <Stack spacing={{ xs: 2, sm: 2 }} direction="row" textAlign={"center"} sx={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
              <PokemonCardFight pokemon={pokemonFighterA} />
              <Typography variant="h4" component="h1" gutterBottom textAlign={"center"}>
                VS
              </Typography>
              <PokemonCardFight pokemon={pokemonFighterB} />
            </Stack>
            {
              !isBattleFinished ? (
                <Card>
                <p>Your pokemon attacks ({pokemonFighterA.name}): </p>
                {pokemonFighterA.abilities.map((item) => (
                  <Button
                    key={item.ability.name}
                    variant="outlined"
                    color="primary"
                    onClick={attackPokemon}
                  >
                    Attack: {item.ability.name}
                  </Button>
                ))}
                
              </Card>
              ): (
                amIWinner ? 
                <Alert variant="filled" severity="success"> Congratulations, you won!</Alert> : 
                <Alert variant="filled" severity="error"> You lost :c</Alert>
              )
            }
            {pokeLog.length > 0 && (
                  <p style={pokeLogStyle}>
                    {pokeLog.map((item, i) => (
                      <span key={i}>{item}<br /></span>
                    ))}
                  </p>
                )}
          </>
        )}
      </Grid>
    </Paper>
  );
}

export default FightPokemonPage;