import React, { useState } from 'react';
import { Coffee, ExternalLink, X, Check } from 'lucide-react';

interface BuyCoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuyCoffeeModal: React.FC<BuyCoffeeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const coffeeUrl = 'https://www.buymeacoffee.com/utsanjan';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(coffeeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121626] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Coffee className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Support the Project</h3>
            <p className="text-xs text-slate-400">Created by utsanjan / DopeSatan</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          Tsunami Bomber was built for developer testing, gateway resilience analysis, and educational
          demonstration. If you find this software helpful, consider supporting the original maintainer!
        </p>

        <div className="bg-[#090B14] p-3 rounded-xl border border-white/5 mb-5 flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="truncate mr-2">{coffeeUrl}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1F253B] hover:bg-[#2B3454] text-white transition-colors cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={coffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Coffee className="w-4 h-4 fill-current" />
            <span>Buy Me A Coffee</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
