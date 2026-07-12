export const TILE_SIZE = 64;

// Peta awal (0: Lantai, 1: Tembok, 2: Target)
// Dibuat lebih leluasa di awal agar pemain bisa mencoba maju
export const INITIAL_MAP = [
  [0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [1, 2, 0, 0, 0],
];

export const INITIAL_ROBOT_STATE = {
  x: 0,
  y: 0,
  direction: 'kanan' // Mulai menghadap kanan agar jalur terbuka
};
