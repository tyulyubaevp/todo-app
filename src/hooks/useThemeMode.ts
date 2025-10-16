import { useState } from "react";

export default function useThemeMode() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const storedMode = localStorage.getItem('theme');
    return storedMode === 'dark' ? 'dark' : 'light';
  });

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  return {toggleMode, mode}
}
