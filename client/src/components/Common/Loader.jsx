import React from 'react';
import { ChessKnightLoader } from './ChessKnightLoader';

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 z-50">
      <ChessKnightLoader size="lg" text="Loading Game..." />
    </div>
  );
};
