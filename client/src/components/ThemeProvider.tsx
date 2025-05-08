import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  scrollThemeTransition: boolean;
  setScrollThemeTransition: (enabled: boolean) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  scrollThemeTransition: true,
  setScrollThemeTransition: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "chess-society-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || "system"
  );

  // State for scroll theme transition (enabled by default)
  const [scrollThemeTransition, setScrollThemeTransition] = useState<boolean>(
    () => {
      const saved = localStorage.getItem("chess-society-scroll-theme");
      return saved !== null ? saved === "true" : true;
    }
  );

  // Handle theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    const htmlEl = window.document.querySelector('html');
    const bodyEl = window.document.body;

    // Remove classes from all important elements
    root.classList.remove("light", "dark");
    htmlEl?.classList.remove("light", "dark");
    bodyEl?.classList.remove("light", "dark");

    let appliedTheme: Theme = theme;

    if (theme === "system") {
      appliedTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
    }

    // Apply the theme to all important elements
    root.classList.add(appliedTheme);
    htmlEl?.classList.add(appliedTheme);
    bodyEl?.classList.add(appliedTheme);

    // Set theme color in localStorage for scroll transitions
    localStorage.setItem("theme", theme);

    // Set base background transition color based on theme
    if (appliedTheme === "dark") {
      // Initialize with the lighter dark mode variant if scroll theme transition is enabled
      const initialBackground = scrollThemeTransition
        ? 'hsl(224 30% 15%)' // Lighter dark mode for top of page
        : 'hsl(224 71% 4%)';  // Original dark mode

      root.style.setProperty('--background-transition', initialBackground);
    } else {
      root.style.setProperty('--background-transition', 'hsl(0 0% 100%)');
    }

    // Only set theme class on the HTML element
    if (appliedTheme === "dark") {
      // Set scroll position to top for best experience with the gradient
      if (scrollThemeTransition) {
        // Force a scroll event to ensure proper rendering
        setTimeout(() => {
          window.dispatchEvent(new Event('scroll'));
        }, 100);
      }
    }
  }, [theme, scrollThemeTransition]);

  // Effect to store scroll theme transition setting
  useEffect(() => {
    localStorage.setItem("chess-society-scroll-theme", scrollThemeTransition.toString());
  }, [scrollThemeTransition]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
      window.location.reload();
    },
    scrollThemeTransition,
    setScrollThemeTransition: (enabled: boolean) => {
      setScrollThemeTransition(enabled);
    }
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};