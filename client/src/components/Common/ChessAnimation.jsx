import React from 'react';

/**
 * ChessAnimation Component - Displays animated chess pieces
 * @param {string} piece - Chess piece: 'queen', 'knight', 'bishop', 'rook', 'pawn', 'king'
 * @param {string} size - Size: 'sm', 'md', 'lg', 'xl'
 * @param {boolean} animated - Enable animation
 */
export const ChessAnimation = ({ piece = 'queen', size = 'md', animated = true, className = '' }) => {
  const sizeMap = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  const pieceEmojis = {
    queen: '♛',
    king: '♚',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  };

  const animationMap = {
    queen: 'animate-queen',
    knight: 'animate-knight',
    bishop: 'animate-bishop',
    rook: 'animate-rook',
    pawn: 'animate-pawn',
    king: 'animate-king'
  };

  const animClass = animated ? animationMap[piece] || 'animate-queen' : '';

  return (
    <span
      className={`chess-piece ${sizeMap[size]} ${animClass} ${className}`}
      style={{ color: '#C9A23A' }}
    >
      {pieceEmojis[piece]}
    </span>
  );
};

/**
 * ChessBoardPattern - Displays animated chess board pattern
 */
export const ChessBoardPattern = ({ children, className = '' }) => {
  return (
    <div className={`chess-board-bg animate-board-glow ${className}`}>
      {children}
    </div>
  );
};

/**
 * FloatingChessPiece - Piece that floats and glows
 */
export const FloatingChessPiece = ({
  piece = 'queen',
  position = 'relative',
  delay = 0,
  size = 'lg'
}) => {
  const sizeMap = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-7xl',
    xl: 'text-9xl'
  };

  const pieceEmojis = {
    queen: '♛',
    king: '♚',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  };

  return (
    <div
      className={`${sizeMap[size]} animate-float animate-queen-shine`}
      style={{
        position,
        animation: `float 3s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        color: '#C9A23A',
        filter: 'drop-shadow(0 0 10px rgba(201, 162, 58, 0.5))'
      }}
    >
      {pieceEmojis[piece]}
    </div>
  );
};

/**
 * ChessSequenceAnimation - Plays sequence of chess piece animations
 */
export const ChessSequenceAnimation = ({ pieces = ['queen', 'knight', 'bishop'], size = 'md', speed = 'normal' }) => {
  const speedMap = {
    slow: 4,
    normal: 3,
    fast: 2
  };

  const sizeMap = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };

  const pieceEmojis = {
    queen: '♛',
    king: '♚',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  };

  return (
    <div className="flex gap-8 items-center justify-center">
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={`${sizeMap[size]} animate-piece-fade`}
          style={{
            color: '#C9A23A',
            animation: `pieceFadeIn 0.6s ease-out ${index * 0.2}s both`,
            filter: 'drop-shadow(0 0 8px rgba(201, 162, 58, 0.4))'
          }}
        >
          {pieceEmojis[piece]}
        </div>
      ))}
    </div>
  );
};

/**
 * AnimatedChessIcon - Glowing chess icon with hover effects
 */
export const AnimatedChessIcon = ({
  piece = 'queen',
  onClick,
  className = ''
}) => {
  const pieceEmojis = {
    queen: '♛',
    king: '♚',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  };

  return (
    <button
      onClick={onClick}
      className={`text-4xl transition-all duration-300 hover:scale-125 cursor-pointer animate-queen-shine ${className}`}
      style={{
        color: '#C9A23A',
        background: 'none',
        border: 'none',
        padding: '0.5rem'
      }}
      onMouseEnter={(e) => {
        e.target.style.filter = 'drop-shadow(0 0 15px rgba(201, 162, 58, 0.8))';
      }}
      onMouseLeave={(e) => {
        e.target.style.filter = 'drop-shadow(0 0 5px rgba(201, 162, 58, 0.4))';
      }}
    >
      {pieceEmojis[piece]}
    </button>
  );
};

/**
 * ChessMovingAnimation - Shows a piece moving across the board
 */
export const ChessMovingAnimation = ({
  piece = 'queen',
  duration = 3,
  delay = 0,
  size = 'lg'
}) => {
  const sizeMap = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-7xl'
  };

  const pieceEmojis = {
    queen: '♛',
    king: '♚',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  };

  const animationMap = {
    queen: 'moveQueen',
    knight: 'knightMove',
    bishop: 'bishopMove',
    rook: 'rookMove',
    pawn: 'pawnAttack'
  };

  return (
    <div
      className={`${sizeMap[size]} inline-block`}
      style={{
        color: '#C9A23A',
        animation: `${animationMap[piece]} ${duration}s ease-in-out ${delay}s infinite`,
        filter: 'drop-shadow(0 0 10px rgba(201, 162, 58, 0.6))'
      }}
    >
      {pieceEmojis[piece]}
    </div>
  );
};
