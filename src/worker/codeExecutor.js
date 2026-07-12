// Worker untuk mengeksekusi kode user secara aman
self.onmessage = function(e) {
  const code = e.data;
  const actions = [];

  // API yang disediakan untuk user
  const maju = () => actions.push({ type: 'MOVE_FORWARD' });
  const belokKiri = () => actions.push({ type: 'TURN_LEFT' });
  const belokKanan = () => actions.push({ type: 'TURN_RIGHT' });

  // Override fungsi berbahaya (sederhana)
  const window = undefined;
  const document = undefined;
  const fetch = undefined;
  const XMLHttpRequest = undefined;

  try {
    // Mengeksekusi kode user
    // Menggunakan Function constructor sebagai pengganti eval
    const execute = new Function('maju', 'belokKiri', 'belokKanan', `
      "use strict";
      ${code}
    `);
    
    execute(maju, belokKiri, belokKanan);
    
    self.postMessage({ success: true, actions });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
};
