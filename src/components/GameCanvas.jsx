import React, { useEffect, useRef, useState } from 'react';
import { INITIAL_MAP, INITIAL_ROBOT_STATE, TILE_SIZE } from '../game/Engine';

export default function GameCanvas({ actions, isRunning, onFinish, onLog }) {
  const canvasRef = useRef(null);
  const [images, setImages] = useState(null);
  
  useEffect(() => {
    const loadImages = async () => {
      const srcList = {
        robot_atas: '/assets/robot_hadap_atas.png',
        robot_bawah: '/assets/robot_hadap_bawah.png',
        robot_kiri: '/assets/robot_hadap_kiri.png',
        robot_kanan: '/assets/robot_hadap_kanan.png',
        lantai: '/assets/tile_lantai.png',
        tembok: '/assets/tile_tembok.png',
        target: '/assets/tile_target.png'
      };

      const loaded = {};
      const promises = Object.entries(srcList).map(([key, src]) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => { loaded[key] = img; resolve(); };
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(promises);
        setImages(loaded);
      } catch (err) {
        if (onLog) onLog('error', 'Gagal memuat aset gambar.');
      }
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (!images) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    
    let robotState = { ...INITIAL_ROBOT_STATE };
    let actionIndex = 0;
    let isAnimating = false; 
    let transitionProgress = 0;
    
    let startX = robotState.x;
    let startY = robotState.y;
    let targetX = robotState.x;
    let targetY = robotState.y;
    let hasWon = false;

    const drawMap = () => {
      for (let y = 0; y < INITIAL_MAP.length; y++) {
        for (let x = 0; x < INITIAL_MAP[y].length; x++) {
          const tile = INITIAL_MAP[y][x];
          ctx.drawImage(images.lantai, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          if (tile === 1) {
            ctx.drawImage(images.tembok, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          } else if (tile === 2) {
            ctx.drawImage(images.target, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    };

    const drawRobot = (x, y, direction) => {
      let img = images.robot_bawah;
      if (direction === 'atas') img = images.robot_atas;
      if (direction === 'kiri') img = images.robot_kiri;
      if (direction === 'kanan') img = images.robot_kanan;
      ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };

    const processNextAction = () => {
      if (!isRunning || !actions || actionIndex >= actions.length || hasWon) {
        if (isRunning && (actionIndex >= actions.length || hasWon)) {
          onFinish(hasWon ? 'win' : 'finish');
        }
        return;
      }

      const action = actions[actionIndex];
      isAnimating = true;
      transitionProgress = 0;
      
      startX = robotState.x;
      startY = robotState.y;

      if (action.type === 'MOVE_FORWARD') {
        if (robotState.direction === 'atas') targetY = Math.max(0, robotState.y - 1);
        if (robotState.direction === 'bawah') targetY = Math.min(INITIAL_MAP.length - 1, robotState.y + 1);
        if (robotState.direction === 'kiri') targetX = Math.max(0, robotState.x - 1);
        if (robotState.direction === 'kanan') targetX = Math.min(INITIAL_MAP[0].length - 1, robotState.x + 1);
        
        // Cek tabrakan dengan batas atau tembok
        if (targetX === startX && targetY === startY) {
            if (onLog) onLog('warn', `⚠️ Gagal maju! Menabrak batas area di koordinat (${startX}, ${startY})`);
        } else if (INITIAL_MAP[targetY][targetX] === 1) {
           targetX = startX;
           targetY = startY;
           if (onLog) onLog('error', `💥 BRAK! Menabrak tembok di koordinat (${startX}, ${startY})`);
        } else {
           if (onLog) onLog('info', `Maju ke (${targetX}, ${targetY})`);
        }

      } else if (action.type === 'TURN_LEFT') {
        const dirs = ['atas', 'kiri', 'bawah', 'kanan'];
        robotState.direction = dirs[(dirs.indexOf(robotState.direction) + 1) % 4];
        if (onLog) onLog('info', `Belok kiri, sekarang menghadap ${robotState.direction}`);
      } else if (action.type === 'TURN_RIGHT') {
        const dirs = ['atas', 'kanan', 'bawah', 'kiri'];
        robotState.direction = dirs[(dirs.indexOf(robotState.direction) + 1) % 4];
        if (onLog) onLog('info', `Belok kanan, sekarang menghadap ${robotState.direction}`);
      }
      
      actionIndex++;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMap();

      if (isRunning && !isAnimating) {
        processNextAction();
      }

      if (isAnimating) {
        transitionProgress += 0.05; 
        if (transitionProgress >= 1) {
           robotState.x = targetX;
           robotState.y = targetY;
           isAnimating = false;

           // Cek kondisi menang
           if (INITIAL_MAP[robotState.y][robotState.x] === 2) {
             hasWon = true;
           }
        }
      }

      const visualX = isAnimating ? startX + (targetX - startX) * transitionProgress : robotState.x;
      const visualY = isAnimating ? startY + (targetY - startY) * transitionProgress : robotState.y;

      drawRobot(visualX, visualY, robotState.direction);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [images, actions, isRunning]);

  return (
    <div className="w-full flex justify-center items-center">
      {!images ? (
        <div className="text-slate-400 animate-pulse font-mono text-sm">Memuat Aset 2D...</div>
      ) : (
        <div className="p-1 bg-[#161b22] border border-[#30363d] rounded-md shadow-sm z-10">
          <canvas
            ref={canvasRef}
            width={INITIAL_MAP[0].length * TILE_SIZE}
            height={INITIAL_MAP.length * TILE_SIZE}
            className="block rounded-sm bg-[#0d1117]"
          />
        </div>
      )}
    </div>
  );
}
