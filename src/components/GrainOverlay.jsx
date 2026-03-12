import { useEffect, useRef } from 'react';

export default function GrainOverlay() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let patternSize = 150;

        const resize = () => {
            canvas.width = patternSize;
            canvas.height = patternSize;
        };

        const drawGrain = () => {
            const imageData = ctx.createImageData(patternSize, patternSize);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
                data[i + 3] = 25;
            }

            ctx.putImageData(imageData, 0, 0);
            animationId = requestAnimationFrame(drawGrain);
        };

        resize();
        drawGrain();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="grain-overlay"
            style={{
                width: '100%',
                height: '100%',
                imageRendering: 'pixelated',
            }}
        />
    );
}
