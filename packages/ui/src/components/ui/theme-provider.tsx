"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";
type ThemeVariant = "default" | "corporate" | "vibrant" | "minimal";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultVariant?: ThemeVariant;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  variant: ThemeVariant;
  setTheme: (theme: Theme) => void;
  setVariant: (variant: ThemeVariant) => void;
};

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultVariant = "default",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [variant, setVariantState] = React.useState<ThemeVariant>(
    () =>
      (localStorage.getItem(`${storageKey}-variant`) as ThemeVariant) ||
      defaultVariant
  );

  React.useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes
    root.classList.remove("light", "dark");
    root.classList.remove(
      "theme-default",
      "theme-corporate",
      "theme-vibrant",
      "theme-minimal"
    );

    // Apply theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Apply variant
    if (variant !== "default") {
      root.classList.add(`theme-${variant}`);
    }
  }, [theme, variant]);

  const value = {
    theme,
    variant,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    },
    setVariant: (newVariant: ThemeVariant) => {
      localStorage.setItem(`${storageKey}-variant`, newVariant);
      setVariantState(newVariant);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
