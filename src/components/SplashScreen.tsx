import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(onComplete, 400);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      onClick={() => {
        setFade(true);
        setTimeout(onComplete, 200);
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D101E] cursor-pointer transition-opacity duration-400 select-none ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-500">
        <div className="relative mb-6">
          <img
            src="/assets/splash.png"
            alt="Tsunami Logo"
            className="w-36 h-36 md:w-44 md:h-44 object-contain drop-shadow-[0_10px_25px_rgba(69,120,227,0.35)]"
          />
          <div className="absolute -inset-4 rounded-full bg-blue-600/10 blur-xl -z-10 animate-pulse"></div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider text-white mb-2">
          TSUNAMI
        </h1>
        <p className="text-xs uppercase tracking-widest text-[#4578E3] font-semibold">
          High Velocity Gateway Stress Engine
        </p>

        <div className="mt-12 flex items-center gap-2 text-xs text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
          <span>Tap anywhere to launch</span>
        </div>
      </div>
    </div>
  );
};
