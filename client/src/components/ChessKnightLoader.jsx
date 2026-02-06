import React from 'react';
import '../styles/knightLoader.css';

export const ChessKnightLoader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }[size];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClass} knight-loader`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <g stroke="currentColor" strokeWidth="1.5">
            {/* Top crown/head */}
            <path
              d="m5.5 22l1-3h11l1 3"
              className="knight-line-1"
            />

            {/* Detail line */}
            <path
              d="m9.75 10.5l2-.5"
              className="knight-line-2"
            />

            {/* Main body outline */}
            <path
              d="M16.5 19L15 8c-.5-3-2.486-4.907-5.75-5.5v2l-5 4l1.5 3l4-1L7.5 19"
              className="knight-line-3"
            />
          </g>

        </svg>
      </div>
      {text && <p className="text-navy font-semibold text-sm">{text}</p>}
    </div>
  );
};
