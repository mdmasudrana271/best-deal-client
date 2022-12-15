import { createContext } from "react";
import app from "../firebase/firebase.config";
import getAuth from "firebase/auth";

export const AuthContext = createContext();
export const ThemeContext = createContext();

const auth = getAuth(app)