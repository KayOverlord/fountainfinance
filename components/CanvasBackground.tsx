import React, { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import { theme } from "../styles/Theme";

const CanvasBackground = ({ timeout = 50 }) => {
  const canvas = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && canvas !== null) {
      const context = canvas.current.getContext("2d");

      let width = window.innerWidth;
      let height = window.screen.height;
      const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.current.width = width;
        canvas.current.height = height;
        context.fillStyle = theme.palette.background.default;
        context.fillRect(0, 0, width, height);
      };

      // calculate how many 'lines' to show and animate
      const columns = Math.floor(width / 20) + 1;
      const yPositions = Array.from({ length: columns }).fill(0);

      const matrixEffect = () => {
        context.fillStyle = "#0001";
        context.fillRect(0, 0, width, height);

        context.fillStyle = theme.palette.background.default;
        context.font = "15pt monospace";

        yPositions.forEach((y: number, index) => {
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
      handleResize();
      window.addEventListener("resize", handleResize);
      const interval = setInterval(matrixEffect, timeout);
      return () => {
        clearInterval(interval);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [canvas, timeout]);

  return (
    <>
      <canvas ref={canvas} className={styles.canvasBg} />
    </>
  );
};
export default CanvasBackground;
