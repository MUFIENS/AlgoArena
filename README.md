# 🤖 AlgoArena

AlgoArena adalah platform edukasi interaktif berbasis web untuk belajar pemrograman (coding) dan logika algoritma dasar. Terinspirasi dari game pemrograman robot, pengguna dapat menulis baris kode untuk mengontrol pergerakan sebuah robot di dalam arena 2D agar bisa menghindari tembok dan mencapai target (bendera hijau).

## ✨ Fitur Utama

- **CodeMirror Integration**: Code editor kelas profesional dengan pewarnaan sintaks (*syntax highlighting*) dan penomoran baris.
- **Web Worker Execution**: Kode pengguna dijalankan secara terisolasi di dalam *background thread* untuk mencegah *hang* atau masalah keamanan (sandbox execution).
- **Interactive 2D Canvas**: Visualisasi pergerakan robot secara aktual dengan animasi yang mulus.
- **Terminal Simulator**: Jendela output khusus yang mencatat setiap langkah robot, termasuk peringatan jika mencoba menabrak batas, dan pesan *error* asli (*syntax error*) jika kode yang diketik salah.
- **Flat Professional Design**: Antarmuka bersih bergaya mode gelap (*dark mode*) layaknya *Integrated Development Environment (IDE)* asli.

## 🕹️ Cara Bermain

Tujuan utama dari game ini adalah mengontrol pergerakan robot di panel kiri (*canvas*) dengan cara mengetik instruksi pada panel editor di tengah layar. Anda dapat menggunakan perintah-perintah berikut:

- `maju()`: Menggerakkan robot 1 petak ke depan (sesuai arah ia menghadap).
- `belokKiri()`: Memutar robot 90 derajat ke arah kiri (berlawanan jarum jam).
- `belokKanan()`: Memutar robot 90 derajat ke arah kanan (searah jarum jam).

**Target:** Bawa robot tepat berada di atas kotak yang berisi gambar bendera hijau tanpa menabrak tembok abu-abu!

## 🚀 Instalasi & Menjalankan Lokal

Pastikan Anda memiliki [Node.js](https://nodejs.org/) yang terinstal di komputer.

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/USERNAME/AlgoArena.git
   cd AlgoArena
   ```

2. **Install semua dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan *development server*:**
   ```bash
   npm run dev
   ```

4. **Buka di Browser:**
   Kunjungi `http://localhost:5173` untuk mulai bermain dan mencoba platformnya.

## 🛠️ Teknologi yang Digunakan

- **React.js** (Antarmuka Utama)
- **Vite** (Build Tool yang super cepat)
- **Tailwind CSS** (Styling & animasi murni)
- **CodeMirror 6** (Code Editor Component)
- **HTML5 Canvas API** (Render Game / Robot)
- **Web Workers** (Eksekusi Sandboxed Code)

---
*Dibuat untuk mempermudah belajar coding dasar dengan cara yang menyenangkan.*
