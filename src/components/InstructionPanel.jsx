import React from 'react';

export default function InstructionPanel() {
  return (
    <div className="h-full bg-[#161b22] p-6 overflow-auto text-slate-300">
      <div className="mb-6 border-b border-[#30363d] pb-4">
        <h1 className="text-2xl font-semibold text-slate-100 mb-1">AlgoArena</h1>
        <p className="text-sm text-slate-400">Logic & Algorithm Sandbox</p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-slate-200 mb-2">Level 1: Langkah Pertama</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Tugas Anda adalah memprogram robot agar mencapai bendera (target) hijau. 
            Gunakan perintah di bawah ini dan hindari menabrak tembok abu-abu.
          </p>
        </div>

        <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 border-b border-[#30363d] pb-2">Available Commands</h3>
          
          <ul className="space-y-4 text-sm">
            <li>
              <code className="text-[#58a6ff] bg-[#161b22] px-1.5 py-0.5 rounded font-mono border border-[#30363d]">maju()</code>
              <p className="text-slate-400 mt-2 text-xs">Bergerak maju 1 kotak ke arah robot menghadap.</p>
            </li>
            <li>
              <code className="text-[#d2a8ff] bg-[#161b22] px-1.5 py-0.5 rounded font-mono border border-[#30363d]">belokKiri()</code>
              <p className="text-slate-400 mt-2 text-xs">Memutar arah robot 90 derajat ke kiri (berlawanan jarum jam).</p>
            </li>
            <li>
              <code className="text-[#d2a8ff] bg-[#161b22] px-1.5 py-0.5 rounded font-mono border border-[#30363d]">belokKanan()</code>
              <p className="text-slate-400 mt-2 text-xs">Memutar arah robot 90 derajat ke kanan (searah jarum jam).</p>
            </li>
          </ul>
        </div>

        <div className="bg-[#1f2428] border-l-4 border-[#e3b341] p-4 rounded-r-md">
          <h4 className="text-[#e3b341] font-semibold text-sm mb-1">Tips</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Baca pesan di panel Console jika terjadi error atau robot gagal bergerak.
          </p>
        </div>
      </div>
    </div>
  );
}
