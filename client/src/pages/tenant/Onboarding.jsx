import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePGConfig } from '../../hooks/usePGConfig';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import FeatureGate from '../../components/FeatureGate';
import { getTenantHouseNumber } from '../../lib/room';
import { tenantLinks } from '../../lib/navLinks';

export default function TenantOnboarding() {
  const { pgId } = useParams();
  const { config } = usePGConfig();
  const { profile } = useAuth();
  const [copied, setCopied] = useState(false);

  const fullAddress = [
    profile?.name,
    getTenantHouseNumber(profile?.tenant) || null,
    config?.name,
    config?.address,
    config?.phone,
  ].filter(Boolean).join(', ');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`My delivery address:\n${fullAddress}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <FeatureGate feature="addressImport">
      <div className="min-h-screen bg-gray-50">
        <Navbar links={tenantLinks(pgId)} />
        <div className="mx-auto max-w-lg px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Smart Address Import</h1>
          <p className="mt-2 text-gray-500">
            Copy your full delivery address or share it via WhatsApp
          </p>

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900">Your Address</h2>
            <p className="mt-4 rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
              {fullAddress}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 rounded-lg bg-primary px-4 py-2.5 font-medium text-white hover:opacity-90"
              >
                {copied ? 'Copied!' : 'Copy Address'}
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 rounded-lg border border-green-500 px-4 py-2.5 font-medium text-green-600 hover:bg-green-50"
              >
                Share on WhatsApp
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-secondary p-4 text-sm text-primary">
            <p className="font-medium">Tip</p>
            <p className="mt-1">
              Use this address when ordering food, packages, or setting up utility services at your PG.
            </p>
          </div>
        </div>
      </div>
    </FeatureGate>
  );
}
