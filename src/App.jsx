import React, { useState, useRef } from 'react';
import EditorPanel from './components/EditorPanel';
import GameCanvas from './components/GameCanvas';
import Terminal from './components/Terminal';
import InstructionPanel from './components/InstructionPanel';

function App() {
  const [actions, setActions] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [modalState, setModalState] = useState(null); // null | { type: 'win' | 'fail' | 'error', message?: string }
  
  const workerRef = useRef(null);

  const addLog = (type, message) => {
    setLogs(prev => [...prev, { type, message, time: new Date().toLocaleTimeString() }]);
  };

  const handleRunCode = (code) => {
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL('./worker/codeExecutor.js', import.meta.url), { type: 'module' });
    }

    workerRef.current.onmessage = (e) => {
      if (e.data.success) {
        setActions(e.data.actions);
        setIsRunning(true);
        setLogs([{ type: 'info', message: 'Memulai eksekusi...', time: new Date().toLocaleTimeString() }]);
      } else {
        addLog('error', e.data.error);
        setIsRunning(false);
        setModalState({ type: 'error', message: e.data.error });
      }
    };

    setIsRunning(false);
    setActions([]);
    setModalState(null);
    workerRef.current.postMessage(code);
  };

  const handleFinish = (result) => {
    setIsRunning(false);
    if (result === 'win') {
      addLog('success', 'Berhasil mencapai target!');
      setModalState({ type: 'win' });
    } else {
      addLog('error', 'Gagal mencapai target.');
      setModalState({ type: 'fail', message: 'Robot belum mencapai bendera hijau atau menabrak tembok!' });
    }
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-slate-300 overflow-hidden font-sans">
      <div className="w-1/4 h-full hidden xl:block border-r border-[#30363d] bg-[#161b22]">
        <InstructionPanel />
      </div>
      
      <div className="flex-1 xl:w-1/3 h-full border-r border-[#30363d] z-10 bg-[#0d1117]">
        <EditorPanel onRunCode={handleRunCode} />
      </div>

      <div className="w-full xl:w-[45%] h-full flex flex-col bg-[#010409]">
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <GameCanvas 
            actions={actions} 
            isRunning={isRunning} 
            onFinish={handleFinish}
            onLog={addLog}
          />
          
          {/* Status Modal Overlay */}
          {modalState && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              {modalState.type === 'win' && (
                <div className="bg-[#161b22] border border-[#3fb950] p-8 rounded-xl shadow-[0_0_50px_rgba(63,185,80,0.2)] text-center animate-bounce-in max-w-sm w-full mx-4">
                  <div className="text-6xl mb-4">🏆</div>
                  <h2 className="text-2xl font-bold text-[#3fb950] mb-2">LEVEL SELESAI!</h2>
                  <p className="text-slate-300 mb-6 text-sm">Luar biasa! Algoritma Anda berhasil memandu robot ke target dengan sempurna.</p>
                  <button 
                    onClick={() => setModalState(null)}
                    className="w-full py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md font-medium transition-colors"
                  >
                    Lanjutkan
                  </button>
                </div>
              )}
              
              {modalState.type === 'fail' && (
                <div className="bg-[#161b22] border border-[#f85149] p-8 rounded-xl shadow-[0_0_50px_rgba(248,81,73,0.15)] text-center animate-bounce-in max-w-sm w-full mx-4">
                  <div className="text-6xl mb-4">💥</div>
                  <h2 className="text-2xl font-bold text-[#f85149] mb-2">MISI GAGAL!</h2>
                  <p className="text-slate-300 mb-6 text-sm">{modalState.message}</p>
                  <button 
                    onClick={() => setModalState(null)}
                    className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md font-medium transition-colors border border-slate-600"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
              
              {modalState.type === 'error' && (
                <div className="bg-[#161b22] border border-[#d29922] p-8 rounded-xl shadow-[0_0_50px_rgba(210,153,34,0.15)] text-center animate-bounce-in max-w-sm w-full mx-4">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h2 className="text-2xl font-bold text-[#d29922] mb-2">SYNTAX ERROR!</h2>
                  <p className="text-slate-300 mb-2 text-sm">Ada kesalahan pada kode Anda:</p>
                  <div className="bg-black/50 p-3 rounded text-left text-xs font-mono text-[#f85149] mb-6 overflow-x-auto whitespace-pre-wrap">
                    {modalState.message}
                  </div>
                  <button 
                    onClick={() => setModalState(null)}
                    className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md font-medium transition-colors border border-slate-600"
                  >
                    Perbaiki Kode
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="h-64 border-t border-[#30363d] bg-[#161b22]">
          <Terminal logs={logs} />
        </div>
      </div>
    </div>
  );
}

export default App;
