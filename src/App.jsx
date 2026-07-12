import React, { useState, useRef } from 'react';
import EditorPanel from './components/EditorPanel';
import GameCanvas from './components/GameCanvas';
import Terminal from './components/Terminal';
import InstructionPanel from './components/InstructionPanel';

function App() {
  const [actions, setActions] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([{ type: 'info', message: 'Sistem siap. Ketik kode dan tekan Jalankan Kode.' }]);
  
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
        setLogs([{ type: 'info', message: 'Memulai eksekusi algoritma...', time: new Date().toLocaleTimeString() }]);
      } else {
        addLog('error', e.data.error);
        setIsRunning(false);
      }
    };

    setIsRunning(false);
    setActions([]);
    workerRef.current.postMessage(code);
  };

  const handleFinish = (result) => {
    setIsRunning(false);
    if (result === 'win') {
      addLog('success', '✨ SELAMAT! Robot berhasil mencapai target!');
    } else {
      addLog('info', 'Eksekusi kode selesai.');
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Panel 1: Instruksi */}
      <div className="w-1/4 h-full hidden xl:block">
        <InstructionPanel />
      </div>
      
      {/* Panel 2: Editor */}
      <div className="flex-1 xl:w-1/3 h-full z-10">
        <EditorPanel onRunCode={handleRunCode} />
      </div>

      {/* Panel 3: Game & Terminal */}
      <div className="w-full xl:w-[45%] h-full flex flex-col bg-slate-900/40 relative">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex-1 p-4 lg:p-8 flex items-center justify-center relative z-10">
          <GameCanvas 
            actions={actions} 
            isRunning={isRunning} 
            onFinish={handleFinish}
            onLog={addLog}
          />
        </div>
        <div className="h-56 border-t border-slate-700/50 bg-slate-950/80 backdrop-blur-xl relative z-10">
          <Terminal logs={logs} />
        </div>
      </div>
    </div>
  );
}

export default App;
