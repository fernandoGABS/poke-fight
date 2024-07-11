import Grid from "@mui/material/Grid";
import loaderGif from '../assets/img/loading.gif';

function PokemonLoader() {
  return (
    <Grid textAlign={"center"}>
        <img alt='' src={loaderGif} width={80} />
         <h5 style={{margin: 0}}>Processing your request</h5>
    </Grid>
  );
}

export default PokemonLoader;
