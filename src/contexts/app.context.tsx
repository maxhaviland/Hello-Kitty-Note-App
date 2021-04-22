import React, { createContext, FC, useState, useEffect } from "react";
import { Theme } from "styled-components";
import { ThemeService } from "../services/theme.service";

interface IContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  noteImage: string;
  setNoteImage: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext({} as IContext);

export const AppProvider: FC = ({ children }) => {
  const {
    getThemeAsyncStorage,
    setThemeAsyncStorage,
    defaultTheme,
  } = new ThemeService();
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [noteImage, setNoteImage] = useState<string>("aaaaaaa");

  return (
    <AppContext.Provider value={{ theme, setTheme, noteImage, setNoteImage }}>
      {children}
    </AppContext.Provider>
  );
};
