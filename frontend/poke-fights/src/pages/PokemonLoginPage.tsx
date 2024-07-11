import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Link, TextField, Typography } from "@mui/material";
import { paperStyle, btnstyle } from "../styles/CustomStyling";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";
import PokemonLoader from "../components/PokeLoader";
import { useNavigate } from 'react-router-dom';

function PokemonLoginPage() {
  const { user, login } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await login(userEmail, userPassword);
      if (data.information == null) {
        Swal.fire("Account Error", data.msg, "error");
      } else {
        //login success
        navigate('/pokemon-list');
      }
      setIsLoading(false);
    } catch (err) {
      Swal.fire("Unexpected error", "Error on login", "error");
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid>
          <h2 className="poke-app-title">Poke Fights</h2>
        </Grid>
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
              style={btnstyle}
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

export default PokemonLoginPage;
