import React, { useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import { theme } from '../styles/Theme';



const CanvasBackground=({timeout=50})=>{


const canvas = useRef();
useEffect(() => {
  const context = canvas.current.getContext('2d');

  const width = document.body.offsetWidth;
  const height = document.body.offsetHeight;
  canvas.current.width = width;
  canvas.current.height = height;

  context.fillStyle =  theme.palette.background.default;
  context.fillRect(0, 0, width, height);

  // calculate how many 'lines' to show and animate
  const columns = Math.floor(width / 20) + 1;
  const yPositions = Array.from({ length: columns }).fill(0);

  context.fillStyle =  theme.palette.background.default;
  context.fillRect(0, 0, width, height);

  const matrixEffect = () => {
      context.fillStyle = '#0001';
      context.fillRect(0, 0, width, height);

      context.fillStyle = theme.palette.background.default;
      context.font = '15pt monospace';

      yPositions.forEach((y, index) => {
          const text = String.fromCharCode(Math.random() * 128);
          const x = index * 20;
          context.fillText(text, x, y);

          if (y > 100 + Math.random() * 10000) {
              yPositions[index] = 0;
          } else {
              yPositions[index] = y + 20;
          }
      });
  };

  const interval = setInterval(matrixEffect, timeout);
  return () => {
      clearInterval(interval);
  };
}, [canvas, timeout]);

  return (
    <>
          <canvas ref={canvas} className={styles.canvasBg}/>
    </>
  );
}
export default CanvasBackground