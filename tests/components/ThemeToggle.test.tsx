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
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);

    fireEvent.click(button);

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(window.localStorage.getItem('qa-portfolio-theme')).toBe('light');
    
    fireEvent.click(button);
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('qa-portfolio-theme')).toBe('dark');
  });
});
