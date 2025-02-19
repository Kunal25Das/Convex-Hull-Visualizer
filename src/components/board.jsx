import { useEffect, useRef } from "react";

export default function ConvexHull({ points, hull }) {
      const canvasRef = useRef(null);

      useEffect(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            // Set canvas dimensions dynamically
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            // Draw graph grid
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#ddd";
            ctx.lineWidth = 0.5;

            for (let x = 0; x < canvas.width; x += 20) {
                  ctx.beginPath();
                  ctx.moveTo(x, 0);
                  ctx.lineTo(x, canvas.height);
                  ctx.stroke();
            }

            for (let y = 0; y < canvas.height; y += 20) {
                  ctx.beginPath();
                  ctx.moveTo(0, y);
                  ctx.lineTo(canvas.width, y);
                  ctx.stroke();
            }

            // Draw points
            ctx.fillStyle = "blue";
            points.forEach(point => {
                  ctx.beginPath();
                  ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                  ctx.fill();
            });

            // Draw convex hull
            //   if (hull.length > 0) {
            //       ctx.strokeStyle = "red";
            //       ctx.lineWidth = 2;
            //       ctx.beginPath();
            //       ctx.moveTo(hull[0].x, hull[0].y);
            //       hull.forEach(point => {
            //           ctx.lineTo(point.x, point.y);
            //       });
            //       ctx.closePath();
            //       ctx.stroke();
            //   }
            if (hull.length > 0) {
                  for (let i = 0; i < hull.length; i++) {
                        setTimeout(() => {
                              ctx.beginPath();
                              ctx.moveTo(hull[i].x, hull[i].y);
                              ctx.lineTo(hull[(i + 1) % hull.length].x, hull[(i + 1) % hull.length].y);
                              ctx.strokeStyle = 'red';
                              ctx.lineWidth = 2;
                              ctx.stroke();

                              setTimeout(() => {
                                    ctx.strokeStyle = 'green';
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

      return <canvas ref={canvasRef} className="w-full h-full" />;
}
