import { Movie } from "@/interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface SavedMoviesContextType {
  savedMovies: Movie[];
  isMovieSaved: (imdbID: string) => boolean;
  toggleSavedMovie: (movie: Movie) => void;
  removeSavedMovie: (imdbID: string) => void;
  clearSavedMovies: () => void;
}

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(
  undefined
);

const STORAGE_KEY = "saved_movies";

export const SavedMoviesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  // Load saved movies from storage on app start
  useEffect(() => {
    loadSavedMovies();
  }, []);

  const loadSavedMovies = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedMovies(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading saved movies:", error);
    }
  };

  const saveMoviesToStorage = async (movies: Movie[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    } catch (error) {
      console.error("Error saving movies to storage:", error);
    }
  };

  const isMovieSaved = (imdbID: string): boolean => {
    return savedMovies.some((movie) => movie.imdbID === imdbID);
  };

  const toggleSavedMovie = (movie: Movie) => {
    setSavedMovies((prevMovies) => {
      const isSaved = prevMovies.some((m) => m.imdbID === movie.imdbID);
      let newMovies: Movie[];

      if (isSaved) {
        newMovies = prevMovies.filter((m) => m.imdbID !== movie.imdbID);
      } else {
        newMovies = [...prevMovies, movie];
      }

      saveMoviesToStorage(newMovies);
      return newMovies;
    });
  };

  const removeSavedMovie = (imdbID: string) => {
    setSavedMovies((prevMovies) => {
      const newMovies = prevMovies.filter((m) => m.imdbID !== imdbID);
      saveMoviesToStorage(newMovies);
      return newMovies;
    });
  };

  const clearSavedMovies = () => {
    setSavedMovies([]);
    saveMoviesToStorage([]);
  };

  const value: SavedMoviesContextType = {
    savedMovies,
    isMovieSaved,
    toggleSavedMovie,
    removeSavedMovie,
    clearSavedMovies,
  };

  return (
    <SavedMoviesContext.Provider value={value}>
      {children}
    </SavedMoviesContext.Provider>
  );
};

export const useSavedMovies = (): SavedMoviesContextType => {
  const context = useContext(SavedMoviesContext);
  if (context === undefined) {
    throw new Error("useSavedMovies must be used within a SavedMoviesProvider");
  }
  return context;
};
