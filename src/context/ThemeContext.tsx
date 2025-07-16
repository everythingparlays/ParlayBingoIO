import { createContext, useEffect, useState } from "react"
import React from 'react';

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  switchTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  switchTheme: () => {}
})

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({ children } : Props) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    let body = document.querySelector('body')!

    // Force light mode for now - disable auto theme detection
    setTheme('light')
    body.setAttribute('theme', 'light')
    
    // DISABLED: Auto theme detection
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    // if (prefersDark.matches) {
    //   setTheme('dark')
    //   body.setAttribute('theme', 'dark')
    // } else {
    //   setTheme('light')
    //   body.setAttribute('theme', 'light')
    // }
  }, [])

  const switchTheme = () => {
    const callback = () => {
      let body = document.querySelector('body')

      if (theme === 'light') {
        setTheme('dark')
        body!.setAttribute('theme', 'dark')
      } else {
        setTheme('light')
        body!.setAttribute('theme', 'light')
      }
    }

    // go away TS errors :)
    if((document as any).startViewTransition) {
      (document as any).startViewTransition(() => callback())
    } else {
      callback();
    }
    
  }

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}