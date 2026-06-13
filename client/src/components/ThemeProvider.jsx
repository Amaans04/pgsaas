import { useEffect } from 'react';
import { usePGConfig } from '../hooks/usePGConfig';

export default function ThemeProvider({ children }) {
  const { config } = usePGConfig();

  useEffect(() => {
    if (!config) return;

    const root = document.documentElement;
    root.style.setProperty('--primary', config.primaryColor || '#4F46E5');
    root.style.setProperty('--secondary', config.secondaryColor || '#E0E7FF');
    root.style.setProperty('--font-family', config.font || 'Inter');
    document.title = config.name || 'PG Platform';
  }, [config]);

  return children;
}
