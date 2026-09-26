import React from 'react';

interface NoInternetViewProps {
  onRetry: () => void;
  isRetrying: boolean;
}

export const NoInternetView: React.FC<NoInternetViewProps> = ({ onRetry, isRetrying }) => {
  return (
    <div
      id="relativeLayout"
      className="fixed inset-0 z-30 flex flex-col items-center justify-between bg-[#0D101E] px-6 py-12 select-none"
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-4">
          <img
            id="noConnectionLogo"
            src="/assets/no_internet.gif"
            alt="No Internet Connection"
            className="w-64 h-64 md:w-72 md:h-72 object-contain"
          />
        </div>

        <h2
          id="txtNoConnection"
          className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-6 -mt-8"
        >
          No Internet Connection
        </h2>

        <button
          id="btnNoConnection"
          onClick={onRetry}
          disabled={isRetrying}
          className="bg-[#4578E3] hover:bg-[#3465CC] active:bg-[#BDD2FF] active:text-[#0D101E] text-white font-medium text-[15px] px-8 py-2.5 rounded-full transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isRetrying ? 'Connecting...' : 'Retry'}
        </button>
      </div>

      <div className="mb-4">
        <img
          id="branding1"
          src="/assets/branding.png"
          alt="Branding"
          className="h-10 w-auto object-contain opacity-80"
        />
      </div>
    </div>
  );
};
