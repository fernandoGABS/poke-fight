import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";
import store from "./store";
import { AuthProvider } from "./auth/AuthContext";
import PokeComponentsRouter from "./PokeComponentsRouter";

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <AuthProvider>
            <PokeComponentsRouter />
          </AuthProvider>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
