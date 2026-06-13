import { usePGConfig } from '../hooks/usePGConfig';

export default function FeatureGate({ feature, children, fallback = null }) {
  const { config } = usePGConfig();

  if (!config?.features?.[feature]) {
    return fallback;
  }

  return children;
}
