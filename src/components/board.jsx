import { useEffect, useRef } from "react";

export default function ConvexHull({ points, hull }) {
    const backdropRef = useRef(null);
    const canvasRef = useRef(null);
    const overlayRef = useRef(null); // New overlay canvas
    const indexRef = useRef(0);

    useEffect(() => {
        const backdrop = backdropRef.current;
        const ctxBack = backdrop.getContext("2d");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const overlay = overlayRef.current;
        const ctxOverlay = overlay.getContext("2d"); // New overlay context
        indexRef.current = 0;

        // Set dimensions
        backdrop.width = backdrop.offsetWidth;
        backdrop.height = backdrop.offsetHeight;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        overlay.width = overlay.offsetWidth;
        overlay.height = overlay.offsetHeight;

        function drawBackdrop() {
            ctxBack.clearRect(0, 0, backdrop.width, backdrop.height);

            // Draw grid
            ctxBack.strokeStyle = "#ddd";
            ctxBack.lineWidth = 0.5;
            for (let x = 0; x < backdrop.width; x += 20) {
                ctxBack.beginPath();
                ctxBack.moveTo(x, 0);
                ctxBack.lineTo(x, backdrop.height);
                ctxBack.stroke();
            }
            for (let y = 0; y < backdrop.height; y += 20) {
                ctxBack.beginPath();
                ctxBack.moveTo(0, y);
                ctxBack.lineTo(backdrop.width, y);
                ctxBack.stroke();
            }

            // Draw all points
            points.forEach(point => {
                ctxBack.beginPath();
                ctxBack.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                ctxBack.fillStyle = "blue";
                ctxBack.fill();
            });
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        drawBackdrop();

        if (hull.length < 2) return;

        function drawNextStep() {
            if (indexRef.current >= hull.length) return;
        
            clearCanvas(); // Clear the middle canvas but NOT the backdrop or overlay.
        
            let current = hull[indexRef.current];
            let next = hull[(indexRef.current + 1) % hull.length];
        
            // Draw the purple base point (Current point under evaluation)
            ctx.beginPath();
            ctx.arc(current.x, current.y, 7, 0, 2 * Math.PI);
            ctx.fillStyle = "purple";
            ctx.fill();
        
            // Increase delay for the dashed lines animation
            ctx.strokeStyle = "gray";
            ctx.setLineDash([5, 5]);
            points.forEach((point, i) => {
                setTimeout(() => {
                    clearCanvas(); // Keep only the necessary elements
                    ctx.beginPath();
                    ctx.arc(current.x, current.y, 7, 0, 2 * Math.PI);
                    ctx.fillStyle = "purple";
                    ctx.fill();
                    for (let j = 0; j <= i; j++) {
                        ctx.beginPath();
                        ctx.moveTo(current.x, current.y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }, i * 200); // Increased delay to 200ms per iteration
            });
        
            setTimeout(() => {
                clearCanvas();
        
                // Draw the final red line on the backdrop (Non-interactive)
                ctxBack.setLineDash([]);
                ctxBack.strokeStyle = "green";
                ctxBack.lineWidth = 3;
                ctxBack.beginPath();
                ctxBack.moveTo(current.x, current.y);
                ctxBack.lineTo(next.x, next.y);
                ctxBack.stroke();
        
                // Draw past hull points in red on the overlay
                ctxOverlay.clearRect(0, 0, overlay.width, overlay.height);
                hull.slice(0, indexRef.current + 1).forEach((p) => {
                    ctxOverlay.beginPath();
                    ctxOverlay.arc(p.x, p.y, 7, 0, 2 * Math.PI);
                    ctxOverlay.fillStyle = "red";
                    ctxOverlay.fill();
                });
        
                indexRef.current++;
                setTimeout(drawNextStep, 1200); // Adjusted delay for better visualization
            }, points.length * 200 + 500);
        }
        

        drawNextStep();

        return () => {
            indexRef.current = 0;
        };
    }, [points, hull]);

    return (
        <div className="relative w-full h-full">
            <canvas ref={backdropRef} className="absolute top-0 left-0 w-full h-full" />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-auto" />
            <canvas ref={overlayRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
        </div>
    );
}
