import { useEffect, useState } from "react";
import { Alert, Button, Card, Grid, Paper, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import {
  listingPaperStyle,
  mainPaperStyle,
  pokeLogStyle,
} from "../styles/CustomStyling";
import { fetchPokemonDetails } from "../services/PokemonAPI";
import { PokemonItemDetails } from "../types/interfaces";
import PokemonCardFight from "../components/PokeCardFight";
import PokemonLoader from "../components/PokeLoader";
import usePokemonFighters from "../hooks/usePokemonFighters";
import { PokeNavbar } from "../components/PokeNavbar";
import PokeEpicBattleMusic from "../components/PokeEpicBattleMusic";

const getStatValue = (stats: any[], key: string): number => {
  const stat = stats.find((item) => item.stat.name === key);
  return stat ? stat.base_stat : 0;
};

const initialPokemonState: PokemonItemDetails = {
  id: 0,
  name: "",
  url: "",
  image: "",
  sprites: {
    front_default: "",
  },
  abilities: [],
  types: [],
  stats: [],
  attack: 0,
  special: 0,
  defense: 0,
  hp: 0,
};

function FightPokemonPage() {
  const [pokemonFighterA, setPokemonFighterA] =
    useState<PokemonItemDetails>(initialPokemonState);
  const [pokemonFighterB, setPokemonFighterB] =
    useState<PokemonItemDetails>(initialPokemonState);
  const [pokeLog, setPokeLog] = useState<string[]>([]);
  const [isBattleFinished, setIsBattleFinished] = useState(false);
  const [amIWinner, setAmIWinner] = useState(false);
  const [isLoadingPokemonData, setIsLoadingPokemonData] = useState(true);
  const { pokemonFighters } = usePokemonFighters();

  const logMessage = (msg: string) => {
    setPokeLog((prevLog) => [...prevLog, msg]);
  };

  const calculateAttack = (
    attacker: PokemonItemDetails,
    defender: PokemonItemDetails
  ) => {
    let attackPower = attacker.attack;
    if (defender.defense > attackPower) {
      //Defense is greater than attack, let's penalize it with -80%
      attackPower = Math.round((defender.defense - attackPower) * 0.2);
    } else {
      attackPower -= defender.defense;
    }
    return Math.max(0, attackPower);
  };

  const handleAttack = () => {
    const attackPowerA = calculateAttack(pokemonFighterA, pokemonFighterB);
    const remainingHpB = pokemonFighterB.hp - attackPowerA;
    const updatedPokeB = { ...pokemonFighterB, hp: remainingHpB };
    setPokemonFighterB(updatedPokeB);

    if (remainingHpB <= 0) {
      setAmIWinner(true);
      setIsBattleFinished(true);
      logMessage("FINISHED, YOU WON!!");
    } else {
      logMessage(
        `${pokemonFighterA.name} attacked with ${attackPowerA} damage. ${pokemonFighterB.name} has ${remainingHpB} HP left.`
      );
      const attackPowerB = calculateAttack(pokemonFighterB, pokemonFighterA);
      const remainingHpA = pokemonFighterA.hp - attackPowerB;
      const updatedPokeA = { ...pokemonFighterA, hp: remainingHpA };
      setPokemonFighterA(updatedPokeA);

      if (remainingHpA <= 0) {
        setAmIWinner(false);
        setIsBattleFinished(true);
        logMessage("FINISHED, YOU LOST :C");
      } else {
        logMessage(
          `${pokemonFighterB.name} attacked with ${attackPowerB} damage. ${pokemonFighterA.name} has ${remainingHpA} HP left.`
        );
      }
    }
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      setIsLoadingPokemonData(true);
      const [pokeA, pokeB] = await Promise.all([
        fetchPokemonDetails(pokemonFighters[0].url),
        fetchPokemonDetails(pokemonFighters[1].url),
      ]);

      if (pokeA && pokeB) {
        const updatedPokeA = {
          ...pokeA,
          image: pokemonFighters[0].image,
          hp: getStatValue(pokeA.stats, "hp"),
          attack: getStatValue(pokeA.stats, "attack"),
          defense: getStatValue(pokeA.stats, "defense"),
        };

        const updatedPokeB = {
          ...pokeB,
          image: pokemonFighters[1].image,
          hp: getStatValue(pokeB.stats, "hp"),
          attack: getStatValue(pokeB.stats, "attack"),
          defense: getStatValue(pokeB.stats, "defense"),
        };

        setPokemonFighterA(updatedPokeA);
        setPokemonFighterB(updatedPokeB);
        setIsLoadingPokemonData(false);
      }
    };

    if (pokemonFighters.length === 2) {
      fetchPokemonData();
    }
  }, [pokemonFighters]);

  return (
    <Grid>
      <PokeNavbar />
      <Paper style={mainPaperStyle}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign={"center"}
        >
          Pokémon Fight!
        </Typography>
        <PokeEpicBattleMusic/>
        <Grid style={listingPaperStyle} textAlign={"center"}>
          {isLoadingPokemonData && <PokemonLoader />}

          {!isLoadingPokemonData && pokemonFighterA && pokemonFighterB && (
            <>
              <Stack
                spacing={{ xs: 2, sm: 2 }}
                direction="row"
                textAlign={"center"}
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  
                }}
              >
                <PokemonCardFight pokemon={pokemonFighterA} />
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  textAlign={"center"}
                >
                  VS
                </Typography>
                <PokemonCardFight pokemon={pokemonFighterB} />
              </Stack>
              {!isBattleFinished ? (
                <Card>
                  <p>Your pokemon attacks ({pokemonFighterA.name}): </p>
                  {pokemonFighterA.abilities.map((item) => (
                    <Button
                      key={item.ability.name}
                      variant="outlined"
                      color="primary"
                      onClick={handleAttack}
                    >
                      Attack: {item.ability.name}
                    </Button>
                  ))}
                </Card>
              ) : amIWinner ? (
                <Alert variant="filled" severity="success">
                  Congratulations, you won!
                </Alert>
              ) : (
                <Alert variant="filled" severity="error">
                  You lost :c
                </Alert>
              )}
              {pokeLog.length > 0 && (
                <p style={pokeLogStyle}>
                  {pokeLog.map((item, i) => (
                    <span key={i}>
                      {item}
                      <br />
                    </span>
                  ))}
                </p>
              )}
            </>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}

export default FightPokemonPage;
