import { useEffect, useRef } from 'react';

export default function ConvexHull({ points, hull }) {
      const canvasRef = useRef(null);

      useEffect(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw points 
            points.forEach(p => {
                  ctx.beginPath();
                  ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
                  ctx.fillStyle = 'black';
                  ctx.fill();
            });

            // Draw hull edges dynamically
            if (hull.length > 0) {
                  for (let i = 0; i < hull.length; i++) {
                        setTimeout(() => {
                              ctx.beginPath();
                              ctx.moveTo(hull[i].x, hull[i].y);
                              ctx.lineTo(hull[(i + 1) % hull.length].x, hull[(i + 1) % hull.length].y);
                              ctx.strokeStyle = 'blue';
                              ctx.lineWidth = 2;
                              ctx.stroke();

                              setTimeout(() => {
                                    ctx.strokeStyle = 'red';
                                    ctx.lineWidth = 3;
                                    ctx.stroke();

                                    ctx.beginPath();
                                    ctx.arc(hull[i].x, hull[i].y, 7, 0, 2 * Math.PI);
                                    ctx.fillStyle = 'red';
                                    ctx.fill();
                              }, 500);
                        }, i * 1000);
                  }
            }
      }, [points, hull]);

      return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', border: '1px solid black' }} />;
}
