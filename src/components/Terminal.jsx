import React, { useEffect, useRef } from 'react';

export default function Terminal({ logs }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="h-full flex flex-col font-mono text-sm bg-[#161b22]">
      <div className="flex items-center px-4 py-2 bg-[#0d1117] border-b border-[#30363d]">
        <span className="text-slate-400 font-semibold text-xs uppercase">Terminal</span>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {logs.map((log, index) => {
          let colorClass = "text-slate-300";
          if (log.type === 'error') colorClass = "text-[#f85149]";
          if (log.type === 'success') colorClass = "text-[#3fb950] font-bold";
          if (log.type === 'warn') colorClass = "text-[#d29922]";

          return (
            <div key={index} className={`flex gap-3 ${colorClass}`}>
              <span className="text-slate-600 select-none">[{log.time}]</span>
              <span className="whitespace-pre-wrap">{log.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
