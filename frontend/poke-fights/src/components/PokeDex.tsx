import { fetchPokemonDetails } from "../services/PokemonAPI";
import { FunctionComponent, useEffect, useState } from "react";
import { PokemonItemDetails, PokemonItem } from "../types/interfaces";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PokemonLoader from "./PokeLoader";
import {
  CatchingPokemon,
  CatchingPokemonSharp,
  CatchingPokemonTwoTone,
} from "@mui/icons-material";
import { pokeDescription } from "../styles/CustomStyling";

type PokedexProps = {
  pokemon: PokemonItem;
  onHide: () => void;
};

export const PokeDex: FunctionComponent<PokedexProps> = ({
  pokemon,
  onHide,
}) => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonItemDetails>();
  useEffect(() => {
    const getPokemonInformation = async () => {
      const data = await fetchPokemonDetails(pokemon.url);
      if (data) {
        setPokemonInfo(data);
      }
    };
    if (pokemon) {
      getPokemonInformation();
    }
  }, [pokemon]);

  return (
    <Dialog open={true}>
      <DialogTitle
        textAlign={"center"}
        textTransform={"uppercase"}
        fontSize={"30px"}
      >
        {pokemon.name}
      </DialogTitle>
      <Card sx={{ display: "flex", padding: "20px" }}>
        {pokemonInfo ? (
          <>
            <CardMedia
              component="img"
              image={pokemonInfo.sprites.front_default}
              alt={`${pokemon.name} picture photo`}
              sx={{maxHeight:"300px"}}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Box sx={{ gap: 1, mt: 1 }}>
                  <Typography
                    component="div"
                    variant="h5"
                    textTransform={"capitalize"}
                  >
                    Stats
                  </Typography>
                  <Box sx={pokeDescription}>
                    {pokemonInfo.stats.map((row) => (
                      <Chip
                        key={row.stat.name}
                        icon={<CatchingPokemonTwoTone color="error" />}
                        label={`${row.stat.name}: ${row.base_stat}`}
                        variant="filled"
                      />
                    ))}
                  </Box>
                  <hr />
                  <Typography
                    component="div"
                    variant="h5"
                    textTransform={"capitalize"}
                  >
                    Abilities
                  </Typography>
                  <Box sx={pokeDescription}>
                    {pokemonInfo.abilities.map((row) => (
                      <Chip
                        key={row.ability.name}
                        icon={<CatchingPokemonSharp color="primary" />}
                        label={row.ability.name}
                        variant="filled"
                      />
                    ))}
                  </Box>
                  <Typography
                    component="div"
                    variant="h5"
                    textTransform={"capitalize"}
                  >
                    <hr />
                    Types
                  </Typography>
                  <Box sx={pokeDescription}>
                    {pokemonInfo.types.map((row) => (
                      <Chip
                        key={row.type.name}
                        icon={<CatchingPokemon color="warning" />}
                        label={row.type.name}
                        variant="filled"
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </>
        ) : (
          <PokemonLoader />
        )}
      </Card>
      <Button variant="contained" color="primary" fullWidth onClick={onHide}>
        Close
      </Button>
    </Dialog>
  );
};

export default PokeDex;
