import React from 'react';
import { Crown } from 'lucide-react';

export const WelcomeBanner: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold backdrop-blur-md shadow-xl my-2">
      <Crown className="w-4 h-4 text-amber-400 shrink-0" />
      <span>Meffo & Nzie · Bienvenue à Ndoh-Djuttitsa</span>
    </div>
  );
};
