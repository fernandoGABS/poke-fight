import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Link, TextField, Typography } from "@mui/material";
import { btnstyle, mainPaperStyle } from "../styles/CustomStyling";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";
import PokemonLoader from "../components/PokeLoader";
import { useNavigate } from 'react-router-dom';
import { PokeNavbar } from "../components/PokeNavbar";

function SignUpPokemonPage() {
  const {signup } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignupSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if(userEmail.trim() === "" || userPassword.trim() === ""){
         Swal.fire("Error in signup", "Please, provide user and password", "error");
          setIsLoading(false);
      }else{
        if(! /^\S+@\S+\.\S+$/.test(userEmail)){
          Swal.fire("Error in signup", "Invalid email", "error");
          setIsLoading(false);
        }else{
          const data = await signup(userEmail, userPassword);
          if(data){
            if (data.id === 0) {
              Swal.fire("Account Error", data.msg, "error");
              setIsLoading(false);
            } else {
              Swal.fire("Welcome!", "Welcome to Pokemon Fights!", "success").then(()=>{
                setIsLoading(false);
                navigate('/pokemon-list');
              });
            }
          }
        }
      }
      
    } catch (err: any) {
      Swal.fire("Unexpected error", err.data.msg || "Unexpected error", "error");
      setIsLoading(false);
    }
  };

  return (
    <Grid>
      <PokeNavbar />
      <Paper style={mainPaperStyle}>
        
        <Grid>
          <h2 className="poke-app-title">Poke Fights</h2>
        </Grid>
        {isLoading && <PokemonLoader />}
        {!isLoading && (
          <div>
            <Typography >Please, fill this form to register</Typography>
            <TextField
              label="Master pokemon email"
              variant="standard"
              type="email"
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
              style={btnstyle}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleSignupSubmission}
            >
              Register
            </Button>
            <Typography>
              Have an account?
              <Link href="/login">Login here</Link>
            </Typography>
          </div>
        )}
      </Paper>
    </Grid>
  );
}

export default SignUpPokemonPage;
