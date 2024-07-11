import { ReactNode } from "react";

export interface PokeUser {
  id: number;
  user_email: string;
  user_password: string;
}

export interface AuthContextType {
  user: PokeUser;
  login: (user_email: string, user_password: string) => Promise<any>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface PokemonListItem {
  name: string;
  url: string;
  image: string;
}