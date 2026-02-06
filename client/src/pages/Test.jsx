import React, { useState } from 'react';
import { ChessKnightLoader } from '../components/Common';

export const Test = () => {
  const [loading, setLoading] = useState(true);

  const handleStartLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-navy mb-12 text-center">
          Chess Knight Loader Test
        </h1>

        {/* Main Loader Demo */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-8">
          <h2 className="text-2xl font-bold text-blue mb-8 text-center">
            Live Loader
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <ChessKnightLoader size="lg" text="Loading Chess Data..." />
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-green-600 font-semibold">✓ Loading Complete!</p>
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={handleStartLoading}
              className="bg-blue text-white px-6 py-3 rounded font-semibold hover:bg-navy transition"
            >
              {loading ? 'Loading...' : 'Start Loading'}
            </button>
          </div>
        </div>

        {/* Size Variations */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-8">
          <h2 className="text-2xl font-bold text-blue mb-8 text-center">
            Size Variations
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Small */}
            <div className="flex flex-col items-center gap-4 p-6 border-2 border-gold rounded">
              <p className="font-semibold text-navy">Small</p>
              <ChessKnightLoader size="sm" text="Small" />
            </div>

            {/* Medium */}
            <div className="flex flex-col items-center gap-4 p-6 border-2 border-gold rounded">
              <p className="font-semibold text-navy">Medium</p>
              <ChessKnightLoader size="md" text="Medium" />
            </div>

            {/* Large */}
            <div className="flex flex-col items-center gap-4 p-6 border-2 border-gold rounded">
              <p className="font-semibold text-navy">Large</p>
              <ChessKnightLoader size="lg" text="Large" />
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-8">
          <h2 className="text-2xl font-bold text-blue mb-8 text-center">
            Common Use Cases
          </h2>

          <div className="space-y-6">
            {/* Loading Events */}
            <div className="border-l-4 border-blue p-6 bg-blue bg-opacity-5 rounded">
              <h3 className="font-bold text-navy mb-3">📋 Loading Events</h3>
              <div className="flex items-center gap-4">
                <ChessKnightLoader size="sm" />
                <p className="text-gray-700">Fetching events from database...</p>
              </div>
            </div>

            {/* Submitting Form */}
            <div className="border-l-4 border-gold p-6 bg-gold bg-opacity-5 rounded">
              <h3 className="font-bold text-navy mb-3">📝 Submitting Application</h3>
              <div className="flex items-center gap-4">
                <ChessKnightLoader size="sm" />
                <p className="text-gray-700">Saving your membership application...</p>
              </div>
            </div>

            {/* Admin Login */}
            <div className="border-l-4 border-navy p-6 bg-navy bg-opacity-5 rounded">
              <h3 className="font-bold text-navy mb-3">🔐 Admin Login</h3>
              <div className="flex items-center gap-4">
                <ChessKnightLoader size="sm" />
                <p className="text-gray-700">Verifying credentials...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-white rounded-lg shadow-lg p-12">
          <h2 className="text-2xl font-bold text-blue mb-6 text-center">
            How to Use
          </h2>

          <div className="bg-gray-900 text-gray-100 p-6 rounded overflow-auto">
            <pre className="text-sm">
{`import { ChessKnightLoader } from '../components/ChessKnightLoader';

// Default (medium, with text)
<ChessKnightLoader />

// Custom size and text
<ChessKnightLoader size="lg" text="Loading..." />

// Small loader, no text
<ChessKnightLoader size="sm" />

// In a conditional render
{loading && <ChessKnightLoader text="Processing..." />}
{!loading && <p>Done!</p>}`}
            </pre>
          </div>

          <div className="mt-6 p-4 bg-blue bg-opacity-10 rounded border border-blue">
            <p className="text-sm text-gray-700">
              <strong>Props:</strong>
            </p>
            <ul className="text-sm text-gray-700 mt-2 space-y-1">
              <li>• <code className="bg-gray-200 px-2 py-1 rounded">size</code>: "sm" | "md" | "lg" (default: "md")</li>
              <li>• <code className="bg-gray-200 px-2 py-1 rounded">text</code>: string - Loading text (default: "Loading...")</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
