import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const configCache = {};

export function usePGConfig() {
  const { pgId } = useParams();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pgId) {
      setLoading(false);
      setError('No PG ID in URL');
      return;
    }

    if (configCache[pgId]) {
      setConfig(configCache[pgId]);
      setLoading(false);
      return;
    }

    async function loadConfig() {
      try {
        setLoading(true);
        const module = await import(`../config/pgs/${pgId}.json`);
        configCache[pgId] = module.default;
        setConfig(module.default);
        setError(null);
      } catch {
        setError(`PG config not found for "${pgId}"`);
        setConfig(null);
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, [pgId]);

  return { config, pgId, loading, error };
}
