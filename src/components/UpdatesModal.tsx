import React from 'react';
import { RefreshCw, ExternalLink, CheckCircle2, X } from 'lucide-react';

interface UpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdatesModal: React.FC<UpdatesModalProps> = ({ isOpen, onClose }) => {
  const releasesUrl = 'https://github.com/utsanjan/Tsunami-Bomber-Android/releases';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121626] border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-[#4578E3] flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">System Releases & Updates</h3>
            <p className="text-xs text-slate-400">Current build: v1.0-WEB (Rewritten from Android 31)</p>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div className="p-3 rounded-xl bg-[#090B14] border border-emerald-500/20 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-emerald-400">Up to date:</span>
              <p className="text-slate-300 mt-0.5">
                All 21 SMS & Voice gateway pipelines are synced and responsive.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 bg-[#090B14] p-3.5 rounded-xl border border-white/5">
            <p className="font-semibold text-white mb-1">Changelog Highlights (from v1.0.0):</p>
            <div className="flex items-start gap-2">
              <span className="text-blue-400">✔</span>
              <span>Ported seamlessly from Android WebView to standalone React SPA.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400">✔</span>
              <span>Resolved legacy "404 application unable to connect" endpoint issues.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400">✔</span>
              <span>Fixed dual integer input bug on mobile keypads.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400">✔</span>
              <span>Enhanced with OTP Gateway Latency tracking & rate-limit simulation console.</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#4578E3] hover:bg-[#3465CC] text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <span>GitHub Releases</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
