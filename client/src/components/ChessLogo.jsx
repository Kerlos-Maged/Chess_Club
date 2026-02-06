import React from 'react';

export const ChessLogo = ({ width = 50, height = 50 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Background */}
      <rect width="100" height="100" fill="none" />

      {/* Left section - Lightning bolt (Strategy) */}
      <g transform="translate(15, 20)">
        <path
          d="M 15 0 L 5 25 L 12 25 L 0 45 L 20 15 L 13 15 Z"
          fill="#666666"
          opacity="0.9"
        />
      </g>

      {/* Center section - Knight head */}
      <g transform="translate(35, 15)">
        {/* Knight profile */}
        <ellipse cx="10" cy="12" rx="8" ry="10" fill="#0B5FA5" />
        {/* Knight neck */}
        <rect x="8" y="20" width="4" height="8" fill="#0B5FA5" />
        {/* Knight nose point */}
        <path d="M 14 10 L 18 9 L 16 12 Z" fill="#0B5FA5" />
        {/* Knight eye */}
        <circle cx="13" cy="10" r="1.5" fill="white" />
      </g>

      {/* Right section - Castle/Rook tower */}
      <g transform="translate(65, 15)">
        {/* Tower base */}
        <rect x="2" y="18" width="16" height="22" fill="#C9A23A" />
        {/* Tower crenellations */}
        <rect x="2" y="12" width="4" height="6" fill="#C9A23A" />
        <rect x="14" y="12" width="4" height="6" fill="#C9A23A" />
        {/* Tower details */}
        <rect x="8" y="15" width="2" height="4" fill="#0A1630" opacity="0.3" />
        {/* Decorative line */}
        <line x1="2" y1="28" x2="18" y2="28" stroke="#0A1630" strokeWidth="1" opacity="0.2" />
      </g>

      {/* Bottom accent bar */}
      <line x1="10" y1="60" x2="90" y2="60" stroke="#0B5FA5" strokeWidth="3" />
      <line x1="10" y1="64" x2="90" y2="64" stroke="#C9A23A" strokeWidth="2" />
    </svg>
  );
};
