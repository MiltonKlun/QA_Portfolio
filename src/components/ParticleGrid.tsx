import { useEffect, useRef, useCallback } from "react";

interface Dot {
    x: number;
    y: number;
    baseOpacity: number;
    opacity: number;
    baseRadius: number;
    radius: number;
    pulseOffset: number;
}

const ParticleGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animFrameRef = useRef<number>(0);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    const GRID_SPACING = 40;
    const DOT_BASE_RADIUS = 1.2;
    const DOT_MAX_RADIUS = 2.8;
    const MOUSE_RADIUS = 180;
    const BASE_OPACITY = 0.15;
    const MAX_OPACITY = 0.6;
    const PULSE_SPEED = 0.0008;

    const initDots = useCallback((width: number, height: number) => {
        const dots: Dot[] = [];
        const cols = Math.ceil(width / GRID_SPACING) + 1;
        const rows = Math.ceil(height / GRID_SPACING) + 1;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                dots.push({
                    x: col * GRID_SPACING,
                    y: row * GRID_SPACING,
                    baseOpacity: BASE_OPACITY + Math.random() * 0.05,
                    opacity: BASE_OPACITY,
                    baseRadius: DOT_BASE_RADIUS,
                    radius: DOT_BASE_RADIUS,
                    pulseOffset: Math.random() * Math.PI * 2,
                });
            }
        }
        dotsRef.current = dots;
    }, []);

    const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const now = Date.now();
        ctx.clearRect(0, 0, width, height);

        // Get the computed primary color from CSS variables
        const style = getComputedStyle(document.documentElement);
        const primaryHSL = style.getPropertyValue("--primary").trim();

        for (const dot of dotsRef.current) {
            // Pulse breathing effect
            const pulse = Math.sin(now * PULSE_SPEED + dot.pulseOffset) * 0.5 + 0.5;
            dot.opacity = dot.baseOpacity + pulse * 0.06;
            dot.radius = dot.baseRadius + pulse * 0.3;

            // Mouse proximity glow
            const dx = mouseRef.current.x - dot.x;
            const dy = mouseRef.current.y - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MOUSE_RADIUS) {
                const intensity = 1 - distance / MOUSE_RADIUS;
                const eased = intensity * intensity; // quadratic easing for softer falloff
                dot.opacity = Math.min(MAX_OPACITY, dot.opacity + eased * (MAX_OPACITY - dot.opacity));
                dot.radius = Math.min(DOT_MAX_RADIUS, dot.radius + eased * (DOT_MAX_RADIUS - dot.radius));
            }

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${primaryHSL} / ${dot.opacity})`;
            ctx.fill();
        }

        animFrameRef.current = requestAnimationFrame(() => animate(ctx, width, height));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const setupCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            initDots(rect.width, rect.height);
            // Cancel any existing animation before starting new
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            animate(ctx, rect.width, rect.height);
        };

        // Initial setup
        setupCanvas();

        // Resize observer for responsive canvas
        resizeObserverRef.current = new ResizeObserver(() => {
            setupCanvas();
        });
        resizeObserverRef.current.observe(canvas);

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [initDots, animate]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        />
    );
};

export default ParticleGrid;
