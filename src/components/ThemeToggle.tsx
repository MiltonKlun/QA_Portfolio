import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center
                 bg-background/50 border border-border/20
                 shadow-[inset_0_4px_12px_hsl(var(--foreground)/0.08),inset_0_-2px_6px_hsl(var(--background)/0.5)]
                 text-muted-foreground/50 hover:text-muted-foreground/80
                 transition-all duration-300 ease-out
                 hover:shadow-[inset_0_4px_16px_hsl(var(--foreground)/0.12),inset_0_-2px_8px_hsl(var(--background)/0.6)]
                 focus:outline-none"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
