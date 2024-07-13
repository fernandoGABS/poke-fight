import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import ListPokemonPage from "./pages/ListPokemonPage";
import LoginPokemonPage from "./pages/LoginPokemonPage";
import SignUpPokemonPage from "./pages/SignUpPokemonPage";
import FightPokemonPage from "./pages/FightPokemonPage";
import usePokemonFighters from "./hooks/usePokemonFighters";

function PokeComponentsRouter() {
  const { user } = useContext(AuthContext);
  const {pokemonFighters} = usePokemonFighters();
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPokemonPage />} />
        {user.id > 0 ? (
          <>
            <Route path="/pokemon-list" element={<ListPokemonPage />} />
            <Route path="/pokemon-fight" element={
                pokemonFighters.length === 2 ? <FightPokemonPage /> : <Navigate to="/pokemon-list" />
            } />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpPokemonPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default PokeComponentsRouter;
