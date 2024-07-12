import Grid from "@mui/material/Grid";
import loaderGif from '../assets/img/loading.gif';
import Typography from '@mui/material/Typography';

function PokemonLoader() {
  return (
    <Grid textAlign={"center"} alignContent={"center"} margin={"auto"}>
        <img alt='' src={loaderGif} width={80} />
        <Typography variant="h6">
            Processing, please wait
        </Typography>
    </Grid>
  );
}

export default PokemonLoader;
