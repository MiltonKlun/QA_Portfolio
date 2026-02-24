import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QAReportModal from '@/components/QAReportModal';

// Mock the toast hook
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

// Mock FocusTrap since JSDOM struggles with focus routing in react portals
vi.mock('focus-trap-react', () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));

describe('QAReportModal Component', () => {
  // Radix Dialog throws FocusTrap errors if it can't find a tabbable element.
  // We can easily bypass this in tests by mocking PointerDownOutside to prevent trap errors,
  // or by just ensuring the document body has a fallback focusable element.
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '<div id="root"><button id="fallback">Fallback</button></div>';
  });

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    bugTitle: 'Test Bug',
    bugDescription: 'This is a test bug description.',
    businessImpact: 'High revenue loss',
    severity: 'critical' as const,
  };

  it('renders nothing when isOpen is false', () => {
    // Wrap in inside a div with a tabbable element so Radix focus-trap has a fallback
    render(<QAReportModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal content correctly when open', () => {
    render(<QAReportModal {...defaultProps} />);
    
    // ... rest of test
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    // Check text props rendering
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
    expect(screen.getByText('This is a test bug description.')).toBeInTheDocument();
    expect(screen.getByText('High revenue loss')).toBeInTheDocument();
    
    // Check severity badge
    const badge = screen.getByText('CRITICAL');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-danger', 'border-danger'); // Critical styling
  });

  it('calls onClose when clicking the X button', () => {
    render(<QAReportModal {...defaultProps} />);
    
    // The X button doesn't have an explicit label but it's the first button in the header
    // Or we can query by the wrapper class/role
    const buttons = screen.getAllByRole('button');
    const closeBtn = buttons.find(b => b.className.includes('bg-muted/50')); // Find the circular close button
    
    if (closeBtn) {
       fireEvent.click(closeBtn);
       expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    } else {
       throw new Error('Close button not found');
    }
  });

  it('shows toast when Github URL is missing and Github button is clicked', () => {
    render(<QAReportModal {...defaultProps} />);
    
    const githubBtn = screen.getByRole('button', { name: /view on github/i });
    fireEvent.click(githubBtn);
    
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Coming Soon',
      description: 'GitHub link will be added in production.',
      duration: 3000,
    });
  });

  it('opens new window when Github URL is provided', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    
    render(<QAReportModal {...defaultProps} githubIssueUrl="https://github.com/test/issues/1" />);
    
    const githubBtn = screen.getByRole('button', { name: /view on github/i });
    fireEvent.click(githubBtn);
    
    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://github.com/test/issues/1',
      '_blank',
      'noopener,noreferrer'
    );
    expect(mockToast).not.toHaveBeenCalled();
    
    windowOpenSpy.mockRestore();
  });
});
