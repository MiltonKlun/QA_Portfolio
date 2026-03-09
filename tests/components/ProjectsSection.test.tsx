import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ProjectsSection from '@/components/portfolio/ProjectsSection';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
  },
}));

describe('ProjectsSection Component', () => {
  it('renders all project titles', () => {
    render(<ProjectsSection variant="tested" />);

    expect(screen.getByText('Test Automation Suite')).toBeInTheDocument();
    expect(screen.getByText('CSA Pharma Framework')).toBeInTheDocument();
    expect(screen.getByText('Pombot')).toBeInTheDocument();
  });

  it('renders project descriptions in tested variant', () => {
    render(<ProjectsSection variant="tested" />);

    expect(screen.getByText(/Test automation framework tailored/)).toBeInTheDocument();
    expect(screen.getByText(/Compliance-focused testing framework/)).toBeInTheDocument();
    expect(screen.getByText(/Serverless Telegram bot/)).toBeInTheDocument();
  });

  it('shows [object Object] corruption after delay in untested variant', async () => {
    vi.useFakeTimers();
    render(<ProjectsSection variant="untested" />);

    expect(screen.getByText(/Compliance-focused testing framework/)).toBeInTheDocument();
    expect(screen.queryByText('[object Object]')).not.toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2100);
    });

    expect(screen.getByText('[object Object]')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('does not corrupt descriptions in tested variant after waiting', async () => {
    vi.useFakeTimers();
    render(<ProjectsSection variant="tested" />);

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('[object Object]')).not.toBeInTheDocument();
    expect(screen.getByText(/Compliance-focused testing framework/)).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('renders project tags', () => {
    render(<ProjectsSection variant="tested" />);

    expect(screen.getByText('Playwright')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('POM')).toBeInTheDocument();
    expect(screen.getByText('Compliance')).toBeInTheDocument();
  });

  it('renders verified badge in tested variant with showChecks', () => {
    render(<ProjectsSection variant="tested" showChecks />);

    const badge = screen.getAllByTitle('Project data verified')[0];
    expect(badge).toBeInTheDocument();
  });
});
