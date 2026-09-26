import React from 'react';
import { RefreshCw, Shield, Sliders, BookOpen } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface HeaderFabsProps {
  onOpenCoffee: () => void;
  onOpenUpdates: () => void;
  onOpenProviders: () => void;
  onOpenProtect: () => void;
  onOpenSecurityGuide: () => void;
  providerCount: number;
  activeCount: number;
}

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const HeaderFabs: React.FC<HeaderFabsProps> = ({
  onOpenCoffee,
  onOpenUpdates,
  onOpenProviders,
  onOpenProtect,
  onOpenSecurityGuide,
  providerCount,
  activeCount,
}) => {
  const { showToast } = useToast();

  const handleLeftClick = () => {
    showToast('Opening GitHub profile...', 2000);
    window.location.href = 'https://github.com/dheeraj-srma';
  };

  const handleRightClick = () => {
    showToast('Checking for updates...', 3000);
    onOpenUpdates();
  };

  return (
    <header className="sticky top-0 z-20 bg-[#0D101E]/90 backdrop-blur-md border-b border-white/5 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/dheeraj-srma"
            target="_blank"
            rel="noopener noreferrer"
            title="dheeraj-srma on GitHub"
            className="inline-flex"
          >
            <button
              id="leftbtn"
              type="button"
              onClick={handleLeftClick}
              title="GitHub Profile - dheeraj-srma"
              className="w-10 h-10 rounded-full bg-[#181D2A] hover:bg-[#23293D] active:bg-[#BDD2FF] text-white active:text-[#0D101E] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer border border-white/20 hover:border-white/40"
            >
              <GithubIcon className="w-5 h-5 text-white" />
            </button>
          </a>

          <button
            onClick={onOpenProtect}
            title="Protect My Number (Blacklist)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181C2D] hover:bg-[#232942] text-xs font-medium text-emerald-400 border border-emerald-500/20 transition-colors cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Protect List</span>
          </button>

          <button
            onClick={onOpenSecurityGuide}
            title="Anti-Spam & Defense Architecture Guide"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181C2D] hover:bg-[#232942] text-xs font-medium text-slate-300 border border-white/10 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Defense Guide</span>
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4578E3] font-bold">
              TSUNAMI
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              v1.0-WEB
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            Active Gateways: {activeCount}/{providerCount}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProviders}
            title="Configure API Providers"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181C2D] hover:bg-[#232942] text-xs font-medium text-blue-300 border border-blue-500/20 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Gateways</span>
            <span className="sm:hidden text-[10px]">APIs</span>
          </button>

          <button
            id="rightbtn"
            onClick={handleRightClick}
            title="Check for updates"
            className="w-10 h-10 rounded-full bg-[#4578E3] hover:bg-[#3969d2] active:bg-[#BDD2FF] text-white active:text-[#0D101E] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer border border-white/10"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
