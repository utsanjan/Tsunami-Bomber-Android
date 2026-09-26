import React, { useEffect, useState } from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
  onFinishLoading: () => void;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, onFinishLoading }) => {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinishLoading, 300);
          return 100;
        }
        const jump = Math.floor(Math.random() * 25) + 15;
        return Math.min(100, prev + jump);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading, onFinishLoading]);

  if (!isLoading) return null;

  return (
    <div
      id="overlay_relative"
      className="fixed inset-0 z-40 flex flex-col items-center justify-between bg-[#0D101E] px-6 py-12 transition-opacity duration-300"
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative -mb-16 z-10">
          <img
            id="bomb"
            src="/assets/bomb.gif"
            alt="Bomb animation"
            className="w-48 h-48 md:w-52 md:h-52 object-contain"
          />
        </div>

        <div className="mt-4">
          <img
            id="loadingLogo"
            src="/assets/infotxt.png"
            alt="Tsunami Info Text"
            className="w-36 md:w-44 object-contain brightness-110 drop-shadow-md"
          />
        </div>

        <div className="w-56 mt-8 flex flex-col items-center gap-2">
          <div className="w-full bg-[#181C2D] h-1.5 rounded-full overflow-hidden border border-white/5">
            <div
              className="bg-[#4578E3] h-full transition-all duration-200 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            INITIALIZING GATEWAY {progress}%
          </span>
        </div>
      </div>

      <div className="mb-4">
        <img
          id="branding"
          src="/assets/branding.png"
          alt="Branding"
          className="h-10 w-auto object-contain opacity-80"
        />
      </div>
    </div>
  );
};
