import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface MandalaRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  petals: number;
  rotation: number;
}

export const SacredParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<MandalaRipple[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Warm Indian heritage colors: temple kansa gold, sacred kumkum maroon, marigold yellow
    const colors = [
      'rgba(214, 146, 59, 0.85)', // Temple Brass Gold
      'rgba(155, 24, 45, 0.85)',  // Sacred Maroon Red
      'rgba(245, 158, 11, 0.85)', // Marigold Amber
      'rgba(253, 248, 242, 0.7)', // Warm Ivory Silk
    ];

    const handleMouseMove = (e: MouseEvent) => {
      if (!enabled) return;
      const { clientX: x, clientY: y } = e;

      // Spawn subtle golden diya sparks along cursor path
      if (Math.random() < 0.45) {
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          life: 0,
          maxLife: 40 + Math.random() * 25,
          size: 1.5 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      lastPosRef.current = { x, y };
    };

    const handleClick = (e: MouseEvent) => {
      if (!enabled) return;
      // Trigger an unexpected sacred Rangoli / Mandala bloom at click coordinates
      const petals = Math.random() > 0.5 ? 8 : 12;
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 65 + Math.random() * 25,
        opacity: 0.9,
        petals,
        rotation: Math.random() * Math.PI,
      });

      // Burst of sacred flower dust sparks
      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 * i) / 16;
        const speed = 1.2 + Math.random() * 1.8;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 45 + Math.random() * 25,
          size: 1.8 + Math.random() * 2.2,
          color: colors[i % colors.length],
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render & update Mandala ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += (r.maxRadius - r.radius) * 0.08;
        r.opacity *= 0.94;
        r.rotation += 0.005;

        if (r.opacity < 0.01) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.rotation);

        // Concentric sacred ring
        ctx.strokeStyle = `rgba(214, 146, 59, ${r.opacity * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner maroon ring
        ctx.strokeStyle = `rgba(155, 24, 45, ${r.opacity * 0.8})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(0, 0, r.radius * 0.6, 0, Math.PI * 2);
        ctx.stroke();

        // Sacred Mandala Lotus Petals
        for (let p = 0; p < r.petals; p++) {
          const angle = (Math.PI * 2 * p) / r.petals;
          const px = Math.cos(angle) * r.radius;
          const py = Math.sin(angle) * r.radius;
          const cpx = Math.cos(angle + Math.PI / r.petals) * (r.radius * 1.22);
          const cpy = Math.sin(angle + Math.PI / r.petals) * (r.radius * 1.22);

          ctx.strokeStyle = `rgba(214, 146, 59, ${r.opacity * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.quadraticCurveTo(cpx, cpy, 0, 0);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Render & update floating Diya particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const currentOpacity = (1 - progress) * 0.75;

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color.replace('0.85', currentOpacity.toFixed(2));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-80"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
