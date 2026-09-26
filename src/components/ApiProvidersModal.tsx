import React, { useState } from 'react';
import { Sliders, CheckSquare, Square, X, Phone, MessageSquare, RotateCcw } from 'lucide-react';
import { ApiProvider } from '../types';

interface ApiProvidersModalProps {
  isOpen: boolean;
  onClose: () => void;
  providers: ApiProvider[];
  onToggleProvider: (id: string) => void;
  onToggleAll: (enable: boolean) => void;
  onReset: () => void;
}

export const ApiProvidersModal: React.FC<ApiProvidersModalProps> = ({
  isOpen,
  onClose,
  providers,
  onToggleProvider,
  onToggleAll,
  onReset,
}) => {
  const [filter, setFilter] = useState<'all' | 'sms' | 'call'>('all');

  if (!isOpen) return null;

  const filtered = providers.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'sms') return p.type === 'sms' || p.type === 'both';
    if (filter === 'call') return p.type === 'call' || p.type === 'both';
    return true;
  });

  const activeCount = providers.filter((p) => p.enabled).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121626] border border-white/10 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-left flex flex-col max-h-[85vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#4578E3] flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Gateway API Hub</h3>
            <p className="text-xs text-slate-400">
              {activeCount} of {providers.length} APIs enabled for load distribution
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-y border-white/5 mb-3">
          <div className="flex items-center gap-1 bg-[#090B14] p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                filter === 'all' ? 'bg-[#4578E3] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({providers.length})
            </button>
            <button
              onClick={() => setFilter('sms')}
              className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                filter === 'sms' ? 'bg-[#4578E3] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              SMS
            </button>
            <button
              onClick={() => setFilter('call')}
              className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                filter === 'call' ? 'bg-[#4578E3] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Voice Call
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => onToggleAll(true)}
              className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
            >
              Enable All
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => onToggleAll(false)}
              className="text-slate-400 hover:text-white font-medium cursor-pointer"
            >
              Disable All
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onReset}
              className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              title="Reset to defaults"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => onToggleProvider(p.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                p.enabled
                  ? 'bg-[#151A2E] border-blue-500/30 text-white'
                  : 'bg-[#0B0D18] border-white/5 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                    p.enabled ? 'text-[#4578E3]' : 'text-slate-600'
                  }`}
                >
                  {p.enabled ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold truncate">{p.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10 uppercase">
                      {p.protocol}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded flex items-center gap-1 ${
                        p.type === 'call'
                          ? 'bg-amber-500/10 text-amber-400'
                          : p.type === 'both'
                          ? 'bg-purple-500/10 text-purple-400'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      {p.type === 'call' ? <Phone className="w-2.5 h-2.5" /> : <MessageSquare className="w-2.5 h-2.5" />}
                      <span className="uppercase">{p.type}</span>
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                    {p.endpoint}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono text-emerald-400 font-medium">
                  {p.avgLatencyMs}ms
                </span>
                <p className="text-[10px] text-slate-400 font-mono">
                  {p.successRate}% rel
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#4578E3] hover:bg-[#3465CC] text-white text-xs font-semibold cursor-pointer shadow-md transition-all"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
