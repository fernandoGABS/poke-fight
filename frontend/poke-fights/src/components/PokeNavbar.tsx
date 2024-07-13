import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import usePokemonFighters from "../hooks/usePokemonFighters";
import { useDispatch } from "react-redux";
import { removeAllFighters } from "../store/pokemonSlice";
import PokeAPILog from "./PokeApiLog";
import { appBarStyle } from "../styles/CustomStyling";

export const PokeNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { pokemonFighters } = usePokemonFighters();
  const [isShowingAPILog, setIsShowingAPILog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowAPILog = () =>{
    setIsShowingAPILog(true);
  }

  const handleLogout = () => {
    logout();
  };

  const handleRemoveFighters = () => {
    dispatch(removeAllFighters());
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: "-20px",
        marginTop: "30px",
        zIndex: 100,
      }}
    >
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.user_email !== ""
              ? `Welcome ${user.user_email}`
              : "Poke Fights V1.0"}
          </Typography>
          {user.id > 0 && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="poke-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link className="nolink" to="/pokemon-list">
                    Pokemon Listing
                  </Link>
                </MenuItem>
                {pokemonFighters.length === 2 && (
                  <MenuItem>
                    <Link className="nolink" to="/pokemon-fight">
                      Pokemon Fight
                    </Link>
                  </MenuItem>
                )}
                {pokemonFighters.length > 0 && (
                  <MenuItem onClick={handleRemoveFighters}>
                    Remove fighters
                  </MenuItem>
                )}
                <MenuItem>
                  <Link className="nolink" to="/pokemon-fighters">
                    View fighters
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleShowAPILog}>Show LOG</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isShowingAPILog && <PokeAPILog onHide={()=>setIsShowingAPILog(false)} />}
    </Box>
  );
};
