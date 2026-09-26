import React from 'react';
import { BookOpen, AlertTriangle, ShieldCheck, Lock, X } from 'lucide-react';

interface SecurityGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityGuideModal: React.FC<SecurityGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121626] border border-white/10 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-left flex flex-col max-h-[85vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Defense Architecture & Usage Guide</h3>
            <p className="text-xs text-slate-400">Security principles, mitigation strategies & ethics</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Developer Disclaimer</span>
            </div>
            <p className="text-amber-200/90 text-[11px]">
              "The developer accepts no liability for any misuse or damage caused by Tsunami. We kindly encourage you to use this app responsibly and exclusively for positive purposes, steering clear of any notions of revenge. Your integrity matters - let's keep our intentions pure!"
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>How OTP Flooding Occurs</span>
            </h4>
            <p>
              SMS Flooding (colloquially termed "SMS bombing") happens when automated endpoints that trigger OTP (One-Time Password) generation fail to implement strict per-identifier rate limiting or bot protection. Attackers iterate through multiple public APIs, each sending 1 OTP, which accumulates rapidly on the victim's phone.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Effective Mitigation & Defense Techniques</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>
                <strong className="text-white">Strict Phone Rate Limits:</strong> Enforce max 1 OTP request every 60 seconds per phone number, and max 3-5 requests in an hour window via Redis sliding-window counters.
              </li>
              <li>
                <strong className="text-white">Invisible Bot Challenge:</strong> Integrate Cloudflare Turnstile or reCAPTCHA v3 before the backend executes the SMS provider dispatch.
              </li>
              <li>
                <strong className="text-white">Device Fingerprinting:</strong> Combine client IP with browser canvas/device signatures to prevent IP-rotating proxy scripts.
              </li>
              <li>
                <strong className="text-white">Exponential Backoff & Cooldowns:</strong> If multiple OTP requests fail or are re-requested, increase cooldown exponentially (1m, 5m, 30m, 24h).
              </li>
              <li>
                <strong className="text-white">SMS Gateway Costs & WhatsApp OTP:</strong> Use verified channels like WhatsApp Business or Email verification with strict verification quotas.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
