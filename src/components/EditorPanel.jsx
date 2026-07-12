import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

export default function EditorPanel({ onRunCode }) {
  const [code, setCode] = useState(`// AlgoArena: Capai Target!
// Perintah tersedia:
// maju();
// belokKiri();
// belokKanan();

maju();
maju();
belokKanan();
maju();
`);

  const handleRun = () => {
    onRunCode(code);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117]">
      <div className="flex items-center justify-between p-4 border-b border-[#30363d] bg-[#161b22]">
        <div className="flex items-center gap-2">
          {/* Mac-style window controls */}
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-3 text-sm text-slate-400 font-mono">script.js</span>
        </div>
        <button
          onClick={handleRun}
          className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold transition-colors active:scale-95 text-sm border border-teal-500/30"
        >
          Jalankan Kode
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <CodeMirror
          value={code}
          height="100%"
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setCode(value)}
          className="text-sm"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            foldGutter: true,
          }}
        />
      </div>
    </div>
  );
}
