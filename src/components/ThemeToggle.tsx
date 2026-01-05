import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center
                 bg-muted/30 border border-border/30 
                 shadow-[inset_0_2px_10px_hsl(var(--background)/0.5)]
                 backdrop-blur-sm
                 text-muted-foreground/60 hover:text-foreground/80
                 transition-all duration-300 ease-out
                 hover:bg-muted/40 hover:border-border/50
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
