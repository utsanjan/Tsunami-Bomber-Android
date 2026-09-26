import React, { useRef, useEffect } from 'react';
import {
  Terminal,
  Pause,
  Play,
  Square,
  Trash2,
  Download,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { BombJob } from '../types';

interface LiveConsoleProps {
  job: BombJob;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onClearLogs: () => void;
}

export const LiveConsole: React.FC<LiveConsoleProps> = ({
  job,
  onPause,
  onResume,
  onStop,
  onClearLogs,
}) => {
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [job.logs.length]);

  const progressPercent =
    job.totalCount > 0 ? Math.min(100, Math.round((job.completedCount / job.totalCount) * 100)) : 0;

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(job, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tsunami_report_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#121626]/90 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#4578E3]" />
          <span className="text-xs font-mono font-bold tracking-wider text-white">
            TRAFFIC CONSOLE & TELEMETRY
          </span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
              job.status === 'running'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'
                : job.status === 'paused'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : job.status === 'completed'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-white/5 text-slate-400'
            }`}
          >
            {job.status}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {job.status === 'running' && (
            <button
              onClick={onPause}
              className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors cursor-pointer"
              title="Pause Job"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
          )}

          {job.status === 'paused' && (
            <button
              onClick={onResume}
              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors cursor-pointer"
              title="Resume Job"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
          )}

          {(job.status === 'running' || job.status === 'paused') && (
            <button
              onClick={onStop}
              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
              title="Abort / Stop Job"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          )}

          <button
            onClick={onClearLogs}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Clear Terminal Logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {job.logs.length > 0 && (
            <button
              onClick={handleExport}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Export JSON Log"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">
            Progress: {job.completedCount} / {job.totalCount} packets
          </span>
          <span className="font-bold text-[#4578E3]">{progressPercent}%</span>
        </div>

        <div className="w-full bg-[#090B14] h-2 rounded-full overflow-hidden border border-white/5">
          <div
            className="bg-gradient-to-r from-blue-600 to-[#4578E3] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-1 font-mono text-center">
          <div className="bg-[#090B14] p-2 rounded-lg border border-white/5">
            <span className="text-[10px] text-slate-500 block">Total</span>
            <span className="text-xs font-bold text-white">{job.completedCount}</span>
          </div>
          <div className="bg-[#090B14] p-2 rounded-lg border border-emerald-500/20">
            <span className="text-[10px] text-emerald-400 block">Success (200)</span>
            <span className="text-xs font-bold text-emerald-400">{job.successCount}</span>
          </div>
          <div className="bg-[#090B14] p-2 rounded-lg border border-amber-500/20">
            <span className="text-[10px] text-amber-400 block">Throttled (429)</span>
            <span className="text-xs font-bold text-amber-400">{job.rateLimitedCount}</span>
          </div>
          <div className="bg-[#090B14] p-2 rounded-lg border border-red-500/20">
            <span className="text-[10px] text-red-400 block">Errors</span>
            <span className="text-xs font-bold text-red-400">{job.failedCount}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#070910] border border-white/10 rounded-xl p-3 h-64 overflow-y-auto font-mono text-[11px] leading-relaxed select-text space-y-1.5 shadow-inner">
        {job.logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 select-none">
            <Activity className="w-8 h-8 opacity-40 animate-pulse" />
            <p>System idle. Configure parameters above and launch.</p>
          </div>
        ) : (
          job.logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-2 hover:bg-white/5 p-1 rounded transition-colors"
            >
              <span className="text-slate-500 shrink-0 select-none">[{log.timestamp}]</span>

              {log.status === 'SUCCESS' && (
                <span className="text-emerald-400 shrink-0 font-bold">200 OK</span>
              )}
              {log.status === 'RATE_LIMITED' && (
                <span className="text-amber-400 shrink-0 font-bold">429 LIMIT</span>
              )}
              {log.status === 'FAILED' && (
                <span className="text-red-400 shrink-0 font-bold">{log.statusCode} ERR</span>
              )}
              {log.status === 'PENDING' && (
                <span className="text-blue-400 shrink-0 font-bold">DISPATCH</span>
              )}

              <span className="text-slate-300 font-semibold truncate max-w-[120px]">
                {log.providerName}
              </span>

              <span className="text-slate-500 hidden sm:inline truncate max-w-[140px]">
                {log.endpoint}
              </span>

              <span className="ml-auto text-slate-400 shrink-0 text-[10px]">
                {log.latencyMs}ms
              </span>
            </div>
          ))
        )}
        <div ref={terminalBottomRef} />
      </div>

      {job.status === 'completed' && (
        <div className="mt-3 p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center text-xs text-blue-300 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-400" />
          <span>Stress cycle completed. Check rate-limit telemetry above.</span>
        </div>
      )}
    </div>
  );
};
