import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider } from '@/hooks/useTheme';

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark', 'light');
  });

  it('toggles theme context and local storage when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /switch to /i });
    
    // Initial state is dark based on hook default
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);

    // Click to toggle
    fireEvent.click(button);

    // Verify update to light
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(window.localStorage.getItem('qa-portfolio-theme')).toBe('light');
    
    // Click to toggle back
    fireEvent.click(button);
    
    // Verify update back to dark
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('qa-portfolio-theme')).toBe('dark');
  });
});
