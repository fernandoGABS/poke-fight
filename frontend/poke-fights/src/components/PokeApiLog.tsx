import { FunctionComponent, useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PokemonLoader from "./PokeLoader";
import { pokeLogStyle } from "../styles/CustomStyling";
import { fetchAPILog } from "../services/MiddlewareService";
import { PokeAPILogProps } from "../types/types";


export const PokeAPILog: FunctionComponent<PokeAPILogProps> = ({ onHide }) => {
  const [pokeAPILog, setPokeAPILog] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAPILogs = async () => {
      const { data } = await fetchAPILog();
      if (data) {
        setIsLoading(false);
        setPokeAPILog(data.information);
      }
    };
    getAPILogs();
  }, []);

  return (
    <Dialog open={true}>
      <DialogTitle
        textAlign={"center"}
        textTransform={"uppercase"}
        fontSize={"30px"}
      >
        API LOGS
      </DialogTitle>
      <Card sx={{ display: "flex", padding: "20px" }}>
        {isLoading && <PokemonLoader />}
        {!isLoading && <pre style={pokeLogStyle}>{pokeAPILog}</pre>}
      </Card>
      <Button variant="contained" color="primary" fullWidth onClick={onHide}>
        Close
      </Button>
    </Dialog>
  );
};

export default PokeAPILog;
