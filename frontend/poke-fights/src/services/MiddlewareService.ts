import axios from "axios";
const middlewareUrl = `${process.env.REACT_APP_POKE_MIDDLEWARE_URL}`;

const headers = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const handlerAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    return Promise.reject(
      error.response || { error: "Unknown error occurred" }
    );
  } else {
    console.error("Unexpected error:", error);
    return Promise.reject({ error: "Unknown error occurred" });
  }
};

export const writeAPILog = async (msg:string) => {
  try {
    const response = await axios.post(
      middlewareUrl,
      {
        action: "log-write",
        message_log: msg,
      },
      headers
    );
    return response;
  } catch (error) {
    return handlerAxiosError(error);
  }
};

export const fetchAPILog = async () => {
  try {
    const response = await axios.post(
      middlewareUrl,
      { action: "log-read" },
      headers
    );
    return response;
  } catch (error) {
    return handlerAxiosError(error);
  }
};

export const loginPokeApp = async (user_email: string, user_password: string) => {
  try {
    const response = await axios.post(
      middlewareUrl,
      { action: "login", user_email, user_password },
      headers
    );
    return response;
  } catch (error) {
    return handlerAxiosError(error);
  }
};

export const signupPokeApp = async (user_email: string, user_password: string) => {
  try {
    const response = await axios.post(
      middlewareUrl,
      { action: "signup", user_email, user_password },
      headers
    );
    return response;
  } catch (error) {
    return handlerAxiosError(error);
  }
};
