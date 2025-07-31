import { createContext, useEffect, useState } from "react"
import React from 'react';

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  switchTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  switchTheme: () => {}
})

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({ children } : Props) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    let body = document.querySelector('body')!

    // Force dark mode - no light mode available
    setTheme('dark')
    body.setAttribute('theme', 'dark')
  }, [])

  const switchTheme = () => {
    // Theme switching disabled - always stay in dark mode
  }

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}