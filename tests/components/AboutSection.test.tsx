import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AboutSection from '@/components/portfolio/AboutSection';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}));

describe('AboutSection Component', () => {
  it('renders About Me heading and bio text', () => {
    render(<AboutSection variant="tested" />);

    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText(/QA Automation Engineer passionate/)).toBeInTheDocument();
  });

  it('renders untested variant with overflow-inducing CSS classes', () => {
    render(<AboutSection variant="untested" />);

    const paragraphs = screen.getAllByText(/QA Automation Engineer passionate/);
    const paragraph = paragraphs[0];

    expect(paragraph).toHaveClass('whitespace-nowrap');
    expect(paragraph).toHaveClass('overflow-hidden');
  });

  it('renders tested variant without overflow CSS classes', () => {
    render(<AboutSection variant="tested" />);

    const paragraphs = screen.getAllByText(/QA Automation Engineer passionate/);
    const paragraph = paragraphs[0];

    expect(paragraph).not.toHaveClass('whitespace-nowrap');
    expect(paragraph).not.toHaveClass('overflow-hidden');
  });

  it('calls onBugClick when clicking the untested section', () => {
    const onBugClick = vi.fn();
    render(<AboutSection variant="untested" onBugClick={onBugClick} />);

    const clickableArea = screen.getByText(/QA Automation Engineer passionate/).closest('div[class*="cursor-pointer"]');
    if (clickableArea) {
      fireEvent.click(clickableArea);
      expect(onBugClick).toHaveBeenCalledTimes(1);
    }
  });

  it('does not make the section clickable in tested variant', () => {
    const onBugClick = vi.fn();
    render(<AboutSection variant="tested" onBugClick={onBugClick} />);

    const paragraph = screen.getByText(/QA Automation Engineer passionate/);
    expect(paragraph.closest('div[class*="cursor-pointer"]')).not.toBeInTheDocument();
  });

  it('renders verified badge button in tested variant', () => {
    const onBugClick = vi.fn();
    render(<AboutSection variant="tested" onBugClick={onBugClick} showChecks />);

    const badge = screen.getAllByTitle('Responsive text verified')[0];
    expect(badge).toBeInTheDocument();

    fireEvent.click(badge);
    expect(onBugClick).toHaveBeenCalledTimes(1);
  });

  it('renders bug hint in untested variant when showHint is true', () => {
    render(<AboutSection variant="untested" showHint />);

    const hintDots = document.querySelectorAll('.animate-ping');
    expect(hintDots.length).toBeGreaterThan(0);
  });
});
