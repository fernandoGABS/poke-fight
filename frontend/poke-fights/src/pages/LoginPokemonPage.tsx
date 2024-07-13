import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, CardMedia, Link, TextField, Typography } from "@mui/material";
import {  mainPaperStyle, pokeButtonLoginSignup } from "../styles/CustomStyling";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";
import PokemonLoader from "../components/PokeLoader";
import { useNavigate } from 'react-router-dom';
import { PokeNavbar } from "../components/PokeNavbar";
import pokeLogo from "../assets/img/logo.png";

function LoginPokemonPage() {
  const {login } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if(userEmail === "" && userPassword === ""){
         Swal.fire("Error in login", "Please, provide user and password", "error");
          setIsLoading(false);
      }else{
        const data  = await login(userEmail, userPassword);
        if(data.id > 0){
          navigate('/pokemon-list');
          setIsLoading(false);
        }else{
          Swal.fire("Account Error", "No master Pokémon user was found. Please sign up", "error");
          setIsLoading(false);
        }
      }
    } catch (err) {
      Swal.fire("Account Error", "Error trying to login", "error");
      setIsLoading(false);
    }
  };

  return (
    <Grid>
       <PokeNavbar />
      <Paper style={mainPaperStyle}>
        <CardMedia
          component="img"
          width="90%"
          image={pokeLogo}
          alt="Poke Fights logo"
          sx={{maxWidth:"400px", margin:"auto"}}
        />
        {isLoading && <PokemonLoader />}
        {!isLoading && (
          <div>
            <TextField
              label="Master pokemon email"
              variant="standard"
              placeholder="Enter your email"
              fullWidth
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="standard"
              placeholder="Enter Your Password"
              type="password"
              fullWidth
              required
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <Button
              style={pokeButtonLoginSignup}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleLoginSubmission}
            >
              Login
            </Button>
            <Typography>
              Don't have an account?
              <Link href="/sign-up">Sign Up here</Link>
            </Typography>
          </div>
        )}
      </Paper>
    </Grid>
  );
}

export default LoginPokemonPage;
