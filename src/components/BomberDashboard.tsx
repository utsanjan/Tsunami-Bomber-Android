import React, { useState } from 'react';
import {
  Flame,
  Smartphone,
  PhoneCall,
  Zap,
  SlidersHorizontal,
  Clock,
  ShieldCheck,
  Play,
} from 'lucide-react';
import { BombMode } from '../types';
import { useToast } from '../context/ToastContext';

interface BomberDashboardProps {
  onStartJob: (phone: string, countryCode: string, count: number, delayMs: number, mode: BombMode) => void;
  isJobActive: boolean;
  activeProviderCount: number;
  protectedNumbers: string[];
}

export const BomberDashboard: React.FC<BomberDashboardProps> = ({
  onStartJob,
  isJobActive,
  activeProviderCount,
  protectedNumbers,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [count, setCount] = useState<number>(20);
  const [delaySec, setDelaySec] = useState<number>(2.0);
  const [mode, setMode] = useState<BombMode>('mix');
  const { showToast } = useToast();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(val);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 10) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }

    if (protectedNumbers.includes(phoneNumber)) {
      showToast('🚫 This number is protected by Tsunami Shield!');
      return;
    }

    if (activeProviderCount === 0) {
      showToast('Please enable at least one gateway API provider!');
      return;
    }

    showToast(`Launching ${mode.toUpperCase()} stress cycle...`);
    onStartJob(phoneNumber, countryCode, count, Math.round(delaySec * 1000), mode);
  };

  const handleSetTestNumber = (num: string) => {
    setPhoneNumber(num);
    showToast('Loaded demo target number');
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#121626]/90 border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#4578E3] flex items-center justify-center glow-blue">
            <Flame className="w-5 h-5 fill-current text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
              <span>TSUNAMI GATEWAY ENGINE</span>
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              High-frequency multi-gateway stress emulator
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{activeProviderCount} APIs Ready</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Region: IN (All Circles)</span>
        </div>
      </div>

      <form onSubmit={handleStart} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Target Mobile Number
          </label>
          <div className="flex gap-2">
            <div className="relative w-28 shrink-0">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full h-11 bg-[#090B14] border border-white/10 rounded-xl px-3 text-xs font-mono text-white focus:outline-none focus:border-[#4578E3] cursor-pointer"
              >
                <option value="+91">🇮🇳 +91 (IN)</option>
                <option value="+1">🇺🇸 +1 (US)</option>
                <option value="+44">🇬🇧 +44 (UK)</option>
                <option value="+971">🇦🇪 +971 (UAE)</option>
              </select>
            </div>

            <div className="relative flex-1">
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                disabled={isJobActive}
                className="w-full h-11 bg-[#090B14] border border-white/10 rounded-xl px-4 text-sm font-mono tracking-wider text-white placeholder-slate-500 focus:outline-none focus:border-[#4578E3] disabled:opacity-50"
              />
              {phoneNumber.length === 10 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Preset test sandbox targets:</span>
            <div className="flex gap-1.5 font-mono">
              <button
                type="button"
                onClick={() => handleSetTestNumber('9876543210')}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] cursor-pointer"
              >
                Sandbox 1
              </button>
              <button
                type="button"
                onClick={() => handleSetTestNumber('9123456789')}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] cursor-pointer"
              >
                Sandbox 2
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Transmission Mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setMode('sms')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                mode === 'sms'
                  ? 'bg-[#4578E3]/20 border-[#4578E3] text-white shadow-[0_0_15px_rgba(69,120,227,0.3)]'
                  : 'bg-[#090B14] border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold">SMS Blast</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('call')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                mode === 'call'
                  ? 'bg-amber-500/20 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-[#090B14] border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold">Call OTP</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('mix')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                mode === 'mix'
                  ? 'bg-purple-500/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-[#090B14] border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold">Mix Turbo</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('audit')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                mode === 'audit'
                  ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-[#090B14] border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold">Rate Audit</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#090B14] p-3.5 rounded-xl border border-white/5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                <span>Count (Requests)</span>
              </span>
              <span className="text-xs font-mono font-bold text-[#4578E3] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {count}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={count}
              disabled={isJobActive}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-[#4578E3] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>5</span>
              <span>50</span>
              <span>100</span>
              <span>150</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Interval (Delay)</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {delaySec.toFixed(1)}s
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.5"
              value={delaySec}
              disabled={isJobActive}
              onChange={(e) => setDelaySec(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.5s (Fast)</span>
              <span>2.5s</span>
              <span>5.0s (Safe)</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isJobActive}
            className="w-full bg-[#4578E3] hover:bg-[#3465CC] active:bg-[#BDD2FF] active:text-[#0D101E] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_10px_20px_rgba(69,120,227,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer text-sm tracking-wider uppercase"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Tsunami Stress Test</span>
          </button>
        </div>
      </form>
    </div>
  );
};
