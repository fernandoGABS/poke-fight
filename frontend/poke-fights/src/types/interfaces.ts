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

export interface PokemonItem {
  id: number;
  url: string;
  name: string;
  image: string;
}

export interface PokemonItemDetails {
  id: number;
  url: string;
  image: string;
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  attack: number;
  special: number;
  defense: number;
  hp: number;
}