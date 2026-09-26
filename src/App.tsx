import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoadingOverlay } from './components/LoadingOverlay';
import { NoInternetView } from './components/NoInternetView';
import { HeaderFabs } from './components/HeaderFabs';
import { BomberDashboard } from './components/BomberDashboard';
import { LiveConsole } from './components/LiveConsole';
import { BuyCoffeeModal } from './components/BuyCoffeeModal';
import { UpdatesModal } from './components/UpdatesModal';
import { ApiProvidersModal } from './components/ApiProvidersModal';
import { ProtectListModal } from './components/ProtectListModal';
import { SecurityGuideModal } from './components/SecurityGuideModal';
import { CustomGatewayModal } from './components/CustomGatewayModal';
import { INITIAL_PROVIDERS } from './data/providers';
import { ApiProvider, BombJob, BombMode, CustomGateway, StressLog } from './types';
import { useToast } from './context/ToastContext';
import { PlusCircle } from 'lucide-react';

export const App: React.FC = () => {
  const { showToast } = useToast();

  const [showSplash, setShowSplash] = useState(true);
  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isRetryingConnection, setIsRetryingConnection] = useState(false);

  const [providers, setProviders] = useState<ApiProvider[]>(() => {
    const saved = localStorage.getItem('tsunami_providers');
    return saved ? JSON.parse(saved) : INITIAL_PROVIDERS;
  });

  const [protectedNumbers, setProtectedNumbers] = useState<string[]>(() => {
    const saved = localStorage.getItem('tsunami_protected');
    return saved ? JSON.parse(saved) : ['9999999999', '1122334455'];
  });

  const [isCoffeeOpen, setIsCoffeeOpen] = useState(false);
  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
  const [isProvidersOpen, setIsProvidersOpen] = useState(false);
  const [isProtectOpen, setIsProtectOpen] = useState(false);
  const [isSecurityGuideOpen, setIsSecurityGuideOpen] = useState(false);
  const [isCustomGwOpen, setIsCustomGwOpen] = useState(false);

  const [job, setJob] = useState<BombJob>({
    targetPhone: '',
    countryCode: '+91',
    totalCount: 0,
    completedCount: 0,
    successCount: 0,
    rateLimitedCount: 0,
    failedCount: 0,
    delayMs: 2000,
    mode: 'mix',
    status: 'idle',
    logs: [],
  });

  const jobRef = useRef(job);
  jobRef.current = job;
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.setItem('tsunami_providers', JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem('tsunami_protected', JSON.stringify(protectedNumbers));
  }, [protectedNumbers]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast('Connection restored: Online');
    };
    const handleOffline = () => {
      setIsOffline(true);
      showToast('No Internet Connection');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (!navigator.onLine) {
      setIsOffline(true);
    } else {
      setIsLoadingOverlay(true);
      showToast('Loading Tsunami', 3000);
    }
  };

  const handleRetryConnection = () => {
    setIsRetryingConnection(true);
    showToast('Connecting to services...', 3000);

    setTimeout(() => {
      setIsRetryingConnection(false);
      if (navigator.onLine) {
        setIsOffline(false);
        setIsLoadingOverlay(true);
        showToast('Loading Tsunami', 3000);
      } else {
        showToast('Still no connection. Check your Wi-Fi or Cellular network.');
      }
    }, 1200);
  };

  const handleToggleProvider = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleToggleAllProviders = (enable: boolean) => {
    setProviders((prev) => prev.map((p) => ({ ...p, enabled: enable })));
  };

  const handleResetProviders = () => {
    setProviders(INITIAL_PROVIDERS);
    showToast('Providers reset to default registry');
  };

  const handleAddCustomGateway = (gw: CustomGateway) => {
    const newProv: ApiProvider = {
      id: `custom-${Date.now()}`,
      name: gw.name,
      category: 'custom',
      protocol: 'REST',
      endpoint: gw.url,
      avgLatencyMs: 150,
      successRate: 99.0,
      enabled: true,
      type: 'sms',
      rateLimitPerMin: 5,
    };
    setProviders((prev) => [newProv, ...prev]);
  };

  const handleAddProtectedNumber = (num: string) => {
    setProtectedNumbers((prev) => [...prev, num]);
  };

  const handleRemoveProtectedNumber = (num: string) => {
    setProtectedNumbers((prev) => prev.filter((n) => n !== num));
  };

  const handleStartJob = (
    phone: string,
    countryCode: string,
    count: number,
    delayMs: number,
    mode: BombMode
  ) => {
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
    }

    const newJob: BombJob = {
      targetPhone: phone,
      countryCode,
      totalCount: count,
      completedCount: 0,
      successCount: 0,
      rateLimitedCount: 0,
      failedCount: 0,
      delayMs,
      mode,
      status: 'running',
      startTime: Date.now(),
      logs: [
        {
          id: `init-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          providerName: 'TSUNAMI CORE',
          endpoint: 'system.engine/initiate',
          phone: `${countryCode} ${phone}`,
          status: 'PENDING',
          statusCode: 100,
          latencyMs: 12,
          payloadSize: '256B',
          message: `Stress session initiated. Targets: ${count} requests at interval ${delayMs}ms.`,
        },
      ],
    };

    setJob(newJob);
  };

  const executeNextPacket = useCallback(() => {
    const current = jobRef.current;
    if (current.status !== 'running') return;

    if (current.completedCount >= current.totalCount) {
      setJob((prev) => ({ ...prev, status: 'completed' }));
      showToast('Stress test cycle completed successfully');
      return;
    }

    const enabledProviders = providers.filter((p) => p.enabled);
    if (enabledProviders.length === 0) {
      setJob((prev) => ({ ...prev, status: 'stopped' }));
      showToast('Job aborted: No active providers');
      return;
    }

    const providerIndex = current.completedCount % enabledProviders.length;
    const provider = enabledProviders[providerIndex];
    const latency = Math.round(provider.avgLatencyMs * (0.85 + Math.random() * 0.35));

    const isRateLimited = Math.random() < 0.18;
    const isError = !isRateLimited && Math.random() < 0.05;

    let status: 'SUCCESS' | 'RATE_LIMITED' | 'FAILED' = 'SUCCESS';
    let statusCode = 200;
    let message = 'OTP packet dispatched and confirmed';

    if (isRateLimited) {
      status = 'RATE_LIMITED';
      statusCode = 429;
      message = '429 Too Many Requests - Gateway rate limit engaged';
    } else if (isError) {
      status = 'FAILED';
      statusCode = 503;
      message = '503 Gateway Timeout - Network packet dropped';
    }

    const newLog: StressLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString(),
      providerName: provider.name,
      endpoint: provider.endpoint,
      phone: `${current.countryCode} ${current.targetPhone}`,
      status,
      statusCode,
      latencyMs: latency,
      payloadSize: `${Math.floor(180 + Math.random() * 120)}B`,
      message,
    };

    setJob((prev) => {
      const nextCompleted = prev.completedCount + 1;
      const isDone = nextCompleted >= prev.totalCount;

      return {
        ...prev,
        completedCount: nextCompleted,
        successCount: prev.successCount + (status === 'SUCCESS' ? 1 : 0),
        rateLimitedCount: prev.rateLimitedCount + (status === 'RATE_LIMITED' ? 1 : 0),
        failedCount: prev.failedCount + (status === 'FAILED' ? 1 : 0),
        status: isDone ? 'completed' : prev.status,
        logs: [...prev.logs.slice(-150), newLog],
      };
    });

    loopTimeoutRef.current = setTimeout(() => {
      executeNextPacket();
    }, current.delayMs);
  }, [providers, showToast]);

  useEffect(() => {
    if (job.status === 'running') {
      loopTimeoutRef.current = setTimeout(() => {
        executeNextPacket();
      }, job.delayMs);
    } else {
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }
    }

    return () => {
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }
    };
  }, [job.status, job.delayMs, executeNextPacket]);

  const handlePause = () => {
    setJob((prev) => ({ ...prev, status: 'paused' }));
    showToast('Job paused');
  };

  const handleResume = () => {
    setJob((prev) => ({ ...prev, status: 'running' }));
    showToast('Job resumed');
  };

  const handleStop = () => {
    setJob((prev) => ({ ...prev, status: 'stopped' }));
    showToast('Job stopped');
  };

  const handleClearLogs = () => {
    setJob((prev) => ({ ...prev, logs: [] }));
    showToast('Terminal logs cleared');
  };

  const activeProviderCount = providers.filter((p) => p.enabled).length;

  return (
    <div className="min-h-screen bg-[#0D101E] text-white flex flex-col justify-between selection:bg-[#4578E3] selection:text-white">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <LoadingOverlay
        isLoading={isLoadingOverlay}
        onFinishLoading={() => setIsLoadingOverlay(false)}
      />

      {isOffline && (
        <NoInternetView
          onRetry={handleRetryConnection}
          isRetrying={isRetryingConnection}
        />
      )}

      <div className="flex-1 flex flex-col">
        <HeaderFabs
          onOpenCoffee={() => setIsCoffeeOpen(true)}
          onOpenUpdates={() => setIsUpdatesOpen(true)}
          onOpenProviders={() => setIsProvidersOpen(true)}
          onOpenProtect={() => setIsProtectOpen(true)}
          onOpenSecurityGuide={() => setIsSecurityGuideOpen(true)}
          providerCount={providers.length}
          activeCount={activeProviderCount}
        />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center justify-between text-xs px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-slate-400 font-mono">
                Multi-API OTP & SMS Gateway Testing Engine
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCustomGwOpen(true)}
                className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Custom API</span>
              </button>
            </div>
          </div>

          <BomberDashboard
            onStartJob={handleStartJob}
            isJobActive={job.status === 'running'}
            activeProviderCount={activeProviderCount}
            protectedNumbers={protectedNumbers}
          />

          <LiveConsole
            job={job}
            onPause={handlePause}
            onResume={handleResume}
            onStop={handleStop}
            onClearLogs={handleClearLogs}
          />
        </main>
      </div>

      <footer className="py-4 border-t border-white/5 bg-[#0A0D18]/80 text-center select-none flex flex-col items-center gap-2">
        <a
          href="https://github.com/dheeraj-srma"
          target="_blank"
          rel="noopener noreferrer"
          title="dheeraj-srma on GitHub"
          className="transition-transform hover:scale-105"
        >
          <img
            src="/assets/branding.png"
            alt="DopeSatan / Tsunami Branding"
            className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
        </a>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-[11px] text-slate-500 font-mono px-4">
          <span>Tsunami Bomber React Edition</span>
          <span>•</span>
          <button
            onClick={() => setIsSecurityGuideOpen(true)}
            className="hover:text-slate-300 transition-colors cursor-pointer underline underline-offset-2"
          >
            Disclaimer & Ethics
          </button>
          <span>•</span>
          <a
            href="https://github.com/dheeraj-srma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub (@dheeraj-srma)</span>
          </a>
        </div>
      </footer>

      <BuyCoffeeModal
        isOpen={isCoffeeOpen}
        onClose={() => setIsCoffeeOpen(false)}
      />
      <UpdatesModal
        isOpen={isUpdatesOpen}
        onClose={() => setIsUpdatesOpen(false)}
      />
      <ApiProvidersModal
        isOpen={isProvidersOpen}
        onClose={() => setIsProvidersOpen(false)}
        providers={providers}
        onToggleProvider={handleToggleProvider}
        onToggleAll={handleToggleAllProviders}
        onReset={handleResetProviders}
      />
      <ProtectListModal
        isOpen={isProtectOpen}
        onClose={() => setIsProtectOpen(false)}
        protectedNumbers={protectedNumbers}
        onAddNumber={handleAddProtectedNumber}
        onRemoveNumber={handleRemoveProtectedNumber}
      />
      <SecurityGuideModal
        isOpen={isSecurityGuideOpen}
        onClose={() => setIsSecurityGuideOpen(false)}
      />
      <CustomGatewayModal
        isOpen={isCustomGwOpen}
        onClose={() => setIsCustomGwOpen(false)}
        onAddCustomGateway={handleAddCustomGateway}
      />
    </div>
  );
};
