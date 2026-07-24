import React from 'react';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();
  const [showReconnected, setShowReconnected] = React.useState(false);
  const previousOnlineRef = React.useRef(isOnline);

  React.useEffect(() => {
    if (!previousOnlineRef.current && isOnline) {
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 4000);
      return () => clearTimeout(timer);
    }
    previousOnlineRef.current = isOnline;
    return undefined;
  }, [isOnline]);

  if (isOnline && !showReconnected) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 transition-all duration-300">
      {!isOnline ? (
        <div className="flex items-center gap-2 bg-amber-600 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg border border-amber-500/30 backdrop-blur-sm animate-pulse">
          <WifiOff className="h-4 w-4 text-amber-200 shrink-0" />
          <span>Mode hors-ligne — Données en cache accessibles</span>
        </div>
      ) : showReconnected ? (
        <div className="flex items-center gap-2 bg-emerald-600 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg border border-emerald-500/30 backdrop-blur-sm">
          <Wifi className="h-4 w-4 text-emerald-200 shrink-0" />
          <span>Connexion rétablie</span>
        </div>
      ) : null}
    </div>
  );
}
