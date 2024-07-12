import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import { AuthContext, AuthProvider } from './auth/AuthContext';
import ListPokemonPage from './pages/ListPokemonPage';
import LoginPokemonPage from './pages/LoginPokemonPage';
import { Provider } from 'react-redux';
import store from './store';
import FightPokemonPage from './pages/FightPokemonPage';

const theme = createTheme();

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
            <AuthProvider >
              <Router>
                <Routes>
                  <Route path="/login" element={<LoginPokemonPage/>} />
                  <Route path="/pokemon-list" element={<ListPokemonPage/>} />
                  <Route path="/pokemon-fight" element={<FightPokemonPage/>} />
                  {
                    user.id > 0 ? (
                      <Route path="/pokemon-list" element={<ListPokemonPage/>} />
                    ):(
                      <Route path="/*" element={<LoginPokemonPage/>} />
                    )
                  }
                </Routes>
              </Router>
            </AuthProvider>
          
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;