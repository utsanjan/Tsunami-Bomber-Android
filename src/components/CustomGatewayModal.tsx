import React, { useState } from 'react';
import { X, Globe, Save } from 'lucide-react';
import { CustomGateway } from '../types';
import { useToast } from '../context/ToastContext';

interface CustomGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomGateway: (gw: CustomGateway) => void;
}

export const CustomGatewayModal: React.FC<CustomGatewayModalProps> = ({
  isOpen,
  onClose,
  onAddCustomGateway,
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<'POST' | 'GET'>('POST');
  const [headers, setHeaders] = useState('{"Content-Type": "application/json"}');
  const [bodyTemplate, setBodyTemplate] = useState('{"phone": "{phone}", "action": "send_otp"}');
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) {
      showToast('Name and URL are required');
      return;
    }

    try {
      JSON.parse(headers);
    } catch {
      showToast('Invalid JSON in headers field');
      return;
    }

    onAddCustomGateway({
      name,
      url,
      method,
      headers,
      bodyTemplate,
      enabled: true,
    });

    showToast('Custom API Gateway added successfully');
    onClose();
  };

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
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#4578E3] flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Add Custom Gateway API</h3>
            <p className="text-xs text-slate-400">Integrate your own sandbox or proprietary OTP service</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Service Name</label>
            <input
              type="text"
              placeholder="e.g. My Internal Twilio / Fast2SMS Endpoint"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#090B14] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#4578E3]"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-1">
              <label className="block text-slate-300 font-semibold mb-1">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as 'POST' | 'GET')}
                className="w-full bg-[#090B14] border border-white/10 rounded-xl px-2 py-2 text-white focus:outline-none focus:border-[#4578E3]"
              >
                <option value="POST">POST</option>
                <option value="GET">GET</option>
              </select>
            </div>
            <div className="col-span-3">
              <label className="block text-slate-300 font-semibold mb-1">Endpoint URL</label>
              <input
                type="text"
                placeholder="https://api.mycompany.com/v1/auth/otp"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-[#090B14] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#4578E3] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Custom Headers (JSON)</label>
            <textarea
              rows={2}
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              className="w-full bg-[#090B14] border border-white/10 rounded-xl p-2 font-mono text-[11px] text-white focus:outline-none focus:border-[#4578E3]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Payload Template</label>
            <textarea
              rows={2}
              value={bodyTemplate}
              onChange={(e) => setBodyTemplate(e.target.value)}
              className="w-full bg-[#090B14] border border-white/10 rounded-xl p-2 font-mono text-[11px] text-white focus:outline-none focus:border-[#4578E3]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#4578E3] hover:bg-[#3465CC] text-white font-semibold flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Gateway</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
