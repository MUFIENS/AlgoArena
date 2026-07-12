import React, { useState } from 'react';

export default function EditorPanel({ onRunCode }) {
  const [code, setCode] = useState(`// AlgoArena: Capai Target!
// Perintah tersedia: maju(), belokKiri(), belokKanan()

maju();
belokKanan();
maju();
maju();
`);
  const [error, setError] = useState(null);

  const handleRun = () => {
    setError(null);
    onRunCode(code, (err) => {
      setError(err);
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-700">
      <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
        <h2 className="text-lg font-bold text-slate-200">Code Editor</h2>
        <button
          onClick={handleRun}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded shadow transition"
        >
          RUN KODE
        </button>
      </div>
      
      {error && (
        <div className="p-3 bg-red-900/50 border-l-4 border-red-500 text-red-200 text-sm">
          Error: {error}
        </div>
      )}

      <textarea
        className="flex-1 w-full p-4 bg-slate-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
      />
    </div>
  );
}
