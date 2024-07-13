import React, { createContext, useEffect, useState } from "react";
import {
  AuthContextType,
  AuthProviderProps,
  PokeUser,
} from "../types/interfaces";
import { loginPokeApp, signupPokeApp } from "../services/MiddlewareService";

const pokeUserDefaultValues: PokeUser = {
  id: 0,
  user_email: "",
  user_password: "",
};

const pokeAuthContextDefault: AuthContextType = {
  user: pokeUserDefaultValues,
  signup: async (): Promise<any> => {},
  login: async (): Promise<any> => {},
  logout: () => {},
};


export const AuthContext = createContext<AuthContextType>(
  pokeAuthContextDefault
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<PokeUser>(() => {
    const storedPokemonMaster = localStorage.getItem("userPokeFights");
    return storedPokemonMaster
      ? JSON.parse(storedPokemonMaster)
      : pokeUserDefaultValues;
  });

  useEffect(() => {
    const storedPokemonMaster = localStorage.getItem("userPokeFights");
    if (storedPokemonMaster) {
      setUser(JSON.parse(storedPokemonMaster));
    }
  }, []);

  const login = async (user_email: string, user_password: string) => {
    const {data} = await loginPokeApp(user_email, user_password);
    if(data){
        const response = data;
        if (response.status === 200) {
        setUser(response.information);
        localStorage.setItem(
          "userPokeFights",
          JSON.stringify(response.information)
        );
      }
      return response.information;
    }
  };

  const signup = async (user_email: string, user_password: string) => {
    const {data} = await signupPokeApp(user_email, user_password);
    if(data){
        const response = data;
        if (response.status === 200) {
        setUser(response.information);
        localStorage.setItem(
          "userPokeFights",
          JSON.stringify(response.information)
        );
      }
      return response.information;
    }
  };

  const logout = async () => {
    localStorage.removeItem("userPokeFights");
    setUser(pokeUserDefaultValues);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
