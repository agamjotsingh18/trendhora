import React, { useEffect, useRef } from 'react';

/**
 * SnakeCursor
 * - Canvas-based, high-performance snake/trailing cursor
 * - Uses CSS mix-blend-mode: difference so it auto-adapts to page theme (light/dark)
 * - Disables itself on touch/coarse pointer devices
 */
const SnakeCursor = ({
  segments = 18, // number of trailing segments
  headSize = 14, // base radius of the head circle in px
  tailSize = 5,  // base radius of the tail circle in px
  opacity = 0.55, // max opacity for head, tail fades automatically
  speed = 0.22, // following speed of the head (0..1)
  tightness = 0.33, // how tightly each segment follows the previous
  zIndex = 2147483647 // on top of everything
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });

  // Disable on coarse pointers (touch devices)
  const shouldDisable = (() => {
    if (typeof window === 'undefined') return true;
    try {
      return 'ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches;
    } catch (_) {
      return false;
    }
  })();

  useEffect(() => {
    if (shouldDisable) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setSize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    // initialize points along the mouse position
    pointsRef.current = Array.from({ length: segments }, () => ({ x: mouseRef.current.x, y: mouseRef.current.y }));

    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onResize = () => setSize();

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', onResize);

    let lastTime = performance.now();

    const render = (time) => {
      const dt = Math.min((time - lastTime) / 16.7, 3); // normalize ~60fps to 1.0
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update physics
      const pts = pointsRef.current;
      if (pts.length === 0) return;

      // head follows mouse
      const head = pts[0];
      head.x += (mouseRef.current.x - head.x) * (speed * dt);
      head.y += (mouseRef.current.y - head.y) * (speed * dt);

      // trailing segments follow previous segment
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const p = pts[i];
        p.x += (prev.x - p.x) * (tightness * dt);
        p.y += (prev.y - p.y) * (tightness * dt);
      }

      // Draw from tail to head for nice layering
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        const t = i / (pts.length - 1 || 1); // 0 (head) .. 1 (tail) if reversed, but we're drawing tail->head
        const radius = tailSize + (headSize - tailSize) * (1 - t);
        const a = 0.12 + (opacity - 0.12) * (1 - t); // tail faint, head brighter

        ctx.beginPath();
        // Draw white with difference blend to auto-contrast with background
        ctx.fillStyle = `rgba(255, 255, 255, ${a.toFixed(3)})`;
        // Subtle glow using shadow
        ctx.shadowColor = 'rgba(255, 255, 255, 0.35)';
        ctx.shadowBlur = 8 * (1 - t);
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Small inner head dot for precision
      ctx.beginPath();
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.arc(pts[0].x, pts[0].y, Math.max(2, headSize * 0.35), 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [segments, headSize, tailSize, opacity, speed, tightness, shouldDisable]);

  if (shouldDisable) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex,
        mixBlendMode: 'difference',
      }}
    />
  );
};

export default SnakeCursor;
