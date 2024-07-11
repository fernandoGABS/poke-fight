import React, { createContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { AuthContextType, AuthProviderProps, PokeUser } from '../types/interfaces';

const pokeMiddlewareUrl = `${process.env.REACT_APP_POKE_MIDDLEWARE_URL}`;

const pokeUserDefaultValues : PokeUser = {
    id: 0,
    user_email:"",
    user_password: ""
}

const pokeAuthContextDefault: AuthContextType = {
    user: pokeUserDefaultValues,
    login: (user_email: string, user_password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios.post(pokeMiddlewareUrl, {action: 'login', user_email, user_password })
        .then(response => {
          // Assuming your backend returns response.data on success
          resolve(response.data);
        })
        .catch(error => {
          console.error('Login error:', error);
          reject(error);
        });
    });
  },
    logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(pokeAuthContextDefault);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<PokeUser>(pokeUserDefaultValues);


  const login = async (user_email: string, user_password: string) => {
    try {
        const response = await axios.post(pokeMiddlewareUrl, {
        action: 'login',
        user_email,
        user_password,
        }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        });
        if(response.status===200){
            setUser(response.data.information);
        }
        return response;
    } catch (error) {
       setUser(pokeUserDefaultValues);
       console.log(error)
       //return error.response.data;
    } 
  };

  const logout = async () => {
    setUser(pokeUserDefaultValues);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};