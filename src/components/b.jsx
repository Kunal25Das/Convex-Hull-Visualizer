import { useEffect, useRef } from "react";

export default function ConvexHull({ points, hull }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        function drawGrid() {
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
        }

        function drawPoints() {
            points.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "blue";
                ctx.fill();
            });
        }

        function drawHullEdges(final = false) {
            ctx.strokeStyle = "green";
            ctx.lineWidth = 3;
            for (let i = 0; i < hull.length - (final ? 0 : 1); i++) {
                ctx.beginPath();
                ctx.moveTo(hull[i].x, hull[i].y);
                ctx.lineTo(hull[(i + 1) % hull.length].x, hull[(i + 1) % hull.length].y);
                ctx.stroke();
            }
        }

        if (hull.length < 2) return;

        let index = 0;
        let confirmedRedPoints = new Set();

        function drawNextStep() {
            if (index >= hull.length) return;

            let current = hull[index];
            let next = hull[(index + 1) % hull.length];

            drawGrid();
            drawPoints();

            // Draw persisted red points
            confirmedRedPoints.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 7, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
            });

            drawHullEdges();

            // Set base point to purple
            ctx.beginPath();
            ctx.arc(current.x, current.y, 7, 0, 2 * Math.PI);
            ctx.fillStyle = "purple";
            ctx.fill();

            // Draw dashed analysis lines
            ctx.strokeStyle = "gray";
            ctx.setLineDash([5, 5]); // Dashed lines
            for (let i = 0; i < hull.length; i++) {
                ctx.beginPath();
                ctx.moveTo(current.x, current.y);
                ctx.lineTo(hull[i].x, hull[i].y);
                ctx.stroke();
            }

            setTimeout(() => {
                ctx.setLineDash([]); // Solid line
                ctx.strokeStyle = "green";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(current.x, current.y);
                ctx.lineTo(next.x, next.y);
                ctx.stroke();

                // Persist previous hull points as red
                if (index > 0) confirmedRedPoints.add(hull[index - 1]);

                // If last point, clear dashed lines after analysis
                if (index === hull.length - 1) {
                    setTimeout(() => {
                        drawGrid();
                        drawPoints();
                        drawHullEdges(true);

                        // Draw all red points
                        confirmedRedPoints.add(current);
                        confirmedRedPoints.forEach(point => {
                            ctx.beginPath();
                            ctx.arc(point.x, point.y, 7, 0, 2 * Math.PI);
                            ctx.fillStyle = "red";
                            ctx.fill();
                        });
                    }, 800);
                }

                index++;
                setTimeout(drawNextStep, 1000);
            }, 800);
        }

        drawNextStep();
    }, [points, hull]);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}
