export const bluePokemon = "#3b4cca";
export const redPokemon = "#ff0000";

export const paperStyle = {
  padding: 20,
  height: "50vh",
  width: 280,
  margin: "19px auto",
  backgroundColor: "white",
  borderRadius: "12px",
  border: `4px solid ${redPokemon}`,
  boxShadow: "0px 0px 8px rgba(0, 0, 0, 25)",
};

export const listingPaperStyle = {
  minHeight: "45vh",
  overflow: "auto",
  maxHeight: "65vh",
  marginTop: "20px",
  width: "100%",
};

export const mainPaperStyle = {
  padding: 20,
  minHeight: "45vh",
  maxWidth: 500,
  margin: "19px auto",
  backgroundColor: "white",
  borderWidth: "0 5px 5px 5px",
  borderStyle: "solid",
  borderColor: redPokemon,
};

export const appBarStyle = {
  backgroundColor: redPokemon,
};

export const pokeButtonPrimaryBlue = {
  borderRadius: 8,
  backgroundColor: bluePokemon,
  color: "white",
  borderColor: "blue",
  "&:hover": {
    backgroundColor: "lightblue",
    borderColor: "blue",
  },
};

export const pokeButtonPrimary = {
  borderRadius: 8,
  backgroundColor: redPokemon,
  color: "white",
  borderColor: "red",
  "&:hover": {
    backgroundColor: "lightred",
    borderColor: "red",
  },
};

export const pokeButtonSecondary = {
  borderRadius: 8,
  backgroundColor: "yellow",
  color: "black",
  "&:hover": {
    backgroundColor: "gold",
  },
};

export const pokeButtonDanger = {
  borderRadius: 8,
  backgroundColor: redPokemon,
  color: "white",
  "&:hover": {
    backgroundColor: "darkred",
  },
};

export const pokeDescription = {
  display: "inline-flex",
  gap: 1,
  mt: 1,
  justifyContent: "flex-start",
  alignContent: "stretch",
  alignItems: "flex-end",
  flexWrap: "wrap",
  flexDirection: "row",
};

export const pokeButtonLoginSignup = { backgroundColor: bluePokemon, margin: "12px 0" };

export const pokeLogStyle = {
  display: "block",
  background: "#eee",
  padding: "15px",
  fontSize: "12px",
  minWidth: "200px",
  overflow: "auto",
  maxHeight: "400px",
};
