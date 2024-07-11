import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import { AuthContext, AuthProvider } from './auth/AuthContext';
import PokemonPage from './pages/PokemonPage';
import PokemonLoginPage from './pages/PokemonLoginPage';

const theme = createTheme();

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
          <AuthProvider >
            <Router>
              <Routes>
                <Route path="/login" element={<PokemonLoginPage/>} />
                <Route path="/pokemon-list" element={<PokemonPage/>} />
                {
                  user.id > 0 ? (
                    <Route path="/pokemon-list" element={<PokemonPage/>} />
                  ):(
                    <Route path="/*" element={<PokemonLoginPage/>} />
                  )
                }
              </Routes>
            </Router>
          </AuthProvider>
        
      </Container>
    </ThemeProvider>
  );
}

export default App;