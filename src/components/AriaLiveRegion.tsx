import { useEffect, useState } from 'react';

interface AriaLiveRegionProps {
  message: string;
}

export const AriaLiveRegion = ({ message }: AriaLiveRegionProps) => {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (message) {
      // Small delay ensures the screen reader catches the change if it happens immediately on mount
      const timeoutId = setTimeout(() => {
        setAnnouncement(message);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
};
