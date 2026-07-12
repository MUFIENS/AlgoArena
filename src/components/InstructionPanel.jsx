import React from 'react';

export default function InstructionPanel() {
  return (
    <div className="h-full bg-slate-900 border-r border-slate-700/50 p-6 overflow-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">AlgoArena</h1>
        <div className="h-1 w-12 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full"></div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-teal-400 mb-2">Level 1: Langkah Pertama</h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Selamat datang di arena! Tugas Anda adalah memprogram robot agar mencapai bendera (target) hijau. 
            Hati-hati, jangan sampai menabrak tembok abu-abu!
          </p>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 shadow-inner">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Perintah Tersedia</h3>
          
          <ul className="space-y-4 text-sm">
            <li>
              <code className="text-teal-300 bg-slate-900 px-2 py-1 rounded font-mono">maju()</code>
              <p className="text-slate-400 mt-1 text-xs">Bergerak maju 1 kotak ke arah robot menghadap.</p>
            </li>
            <li>
              <code className="text-violet-300 bg-slate-900 px-2 py-1 rounded font-mono">belokKiri()</code>
              <p className="text-slate-400 mt-1 text-xs">Memutar arah robot 90 derajat ke kiri.</p>
            </li>
            <li>
              <code className="text-violet-300 bg-slate-900 px-2 py-1 rounded font-mono">belokKanan()</code>
              <p className="text-slate-400 mt-1 text-xs">Memutar arah robot 90 derajat ke kanan.</p>
            </li>
          </ul>
        </div>

        <div className="bg-teal-900/20 border border-teal-500/20 p-4 rounded-xl">
          <h4 className="text-teal-400 font-semibold text-sm mb-1">💡 Tips</h4>
          <p className="text-teal-200/70 text-xs leading-relaxed">
            Perhatikan baik-baik arah awal robot menghadap. Baca pesan di Terminal Console jika robot gagal bergerak.
          </p>
        </div>
      </div>
    </div>
  );
}
