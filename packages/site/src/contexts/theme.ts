import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils';

// Custom hook to get and set the theme preference
export const useTheme = () => {
  // State to store the current theme
  const [isDarkTheme, setTheme] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Detects the system theme preference
    const darkModeSystem = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const systemPreference = darkModeSystem ? 'dark' : 'light';

    // Attempts to retrieve the theme from local storage, defaults to system preference
    const localStoragePreference = getLocalStorage('theme');
    const initialTheme = localStoragePreference || systemPreference;

    // If there's no theme in local storage, we use and save the system preference
    if (!localStoragePreference) {
      setLocalStorage('theme', systemPreference);
    }

    setTheme(initialTheme ? true : false);
  }, []);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(!isDarkTheme); // Update state
    setLocalStorage('theme', isDarkTheme ? 'light' : 'dark'); // Update local storage
  };

  // Returns the current theme and the toggle function
  return { isDarkTheme, toggleTheme };
};
