import React, { useState } from 'react';
import { Shield, Plus, Trash2, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface ProtectListModalProps {
  isOpen: boolean;
  onClose: () => void;
  protectedNumbers: string[];
  onAddNumber: (num: string) => void;
  onRemoveNumber: (num: string) => void;
}

export const ProtectListModal: React.FC<ProtectListModalProps> = ({
  isOpen,
  onClose,
  protectedNumbers,
  onAddNumber,
  onRemoveNumber,
}) => {
  const [inputVal, setInputVal] = useState('');
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputVal.replace(/\D/g, '');
    if (clean.length < 10) {
      showToast('Enter valid 10-digit number');
      return;
    }
    if (protectedNumbers.includes(clean)) {
      showToast('Number already protected');
      return;
    }
    onAddNumber(clean);
    setInputVal('');
    showToast('Number added to Protection Shield');
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
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Protect List (Shield)</h3>
            <p className="text-xs text-slate-400">Blocklist numbers from any stress-test jobs</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4">
          Any number registered here is instantly blocked and shielded from any transmission or simulation runs in Tsunami.
        </p>

        <form onSubmit={handleAdd} className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
              +91
            </span>
            <input
              type="tel"
              maxLength={10}
              placeholder="Enter 10-digit number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-[#090B14] border border-white/10 rounded-xl pl-12 pr-4 py-2 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#4578E3]"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Protect</span>
          </button>
        </form>

        <div className="bg-[#090B14] rounded-xl p-3 border border-white/5 max-h-48 overflow-y-auto space-y-2">
          {protectedNumbers.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-3">
              No numbers currently protected. Add one above.
            </p>
          ) : (
            protectedNumbers.map((num) => (
              <div
                key={num}
                className="flex items-center justify-between bg-[#141829] px-3 py-2 rounded-lg text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-white">+91 {num.slice(0, 5)} {num.slice(5)}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                    SHIELDED
                  </span>
                </div>
                <button
                  onClick={() => {
                    onRemoveNumber(num);
                    showToast('Protection removed');
                  }}
                  className="text-slate-400 hover:text-red-400 p-1 transition-colors cursor-pointer"
                  title="Remove from protect list"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
