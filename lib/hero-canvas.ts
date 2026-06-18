// Animated node/aurora hero background — ported from initHeroCanvas().
// Attaches to an existing <canvas> element and returns a cleanup function.

export function startHeroCanvas(cv: HTMLCanvasElement): () => void {
  const ctx = cv.getContext("2d");
  if (!ctx) return () => {};

  let W = 0,
    H = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const mouse = { x: -999, y: -999, active: false };
  const BLUE: [number, number, number] = [29, 95, 224];
  const ORANGE: [number, number, number] = [242, 107, 29];
  type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: [number, number, number]; big: boolean; pulse: number };
  let nodes: Node[] = [];
  let t = 0;
  let raf: number | null = null;
  let running = true;

  const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  function build() {
    const count = Math.min(14, Math.floor((W * H) / 52000));
    nodes = [];
    for (let i = 0; i < count; i++) {
      const big = Math.random() < 0.16;
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: big ? 3 + Math.random() * 2 : 1 + Math.random() * 1.6,
        hue: Math.random() < 0.78 ? BLUE : ORANGE,
        big,
        pulse: Math.random() * 6.28,
      });
    }
  }

  function resize() {
    const r = cv.getBoundingClientRect();
    W = r.width;
    H = r.height;
    cv.width = W * DPR;
    cv.height = H * DPR;
    ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    build();
  }

  function step() {
    t += 0.016;
    ctx!.clearRect(0, 0, W, H);
    const blobs = [
      { x: W * 0.7 + Math.sin(t * 0.3) * 40, y: H * 0.25 + Math.cos(t * 0.25) * 30, r: Math.max(W, H) * 0.42, c: BLUE, a: 0.07 },
      { x: W * 0.2 + Math.cos(t * 0.22) * 40, y: H * 0.7 + Math.sin(t * 0.28) * 30, r: Math.max(W, H) * 0.36, c: ORANGE, a: 0.05 },
    ];
    blobs.forEach((b) => {
      const g = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, rgba(b.c, b.a));
      g.addColorStop(1, rgba(b.c, 0));
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, W, H);
    });
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += 0.03;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      if (mouse.active) {
        const dx = n.x - mouse.x,
          dy = n.y - mouse.y,
          d = Math.hypot(dx, dy);
        if (d < 120) {
          const f = ((120 - d) / 120) * 0.25;
          n.x += (dx / d) * f;
          n.y += (dy / d) * f;
        }
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 150) {
          const al = (1 - d / 150) * 0.18;
          const grd = ctx!.createLinearGradient(a.x, a.y, b.x, b.y);
          grd.addColorStop(0, rgba(a.hue, al));
          grd.addColorStop(1, rgba(b.hue, al));
          ctx!.strokeStyle = grd;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }
    }
    nodes.forEach((n) => {
      const pr = n.r + (n.big ? Math.sin(n.pulse) * 0.8 : 0);
      if (n.big) {
        const g = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr * 4);
        g.addColorStop(0, rgba(n.hue, 0.14));
        g.addColorStop(1, rgba(n.hue, 0));
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, pr * 4, 0, 6.29);
        ctx!.fill();
      }
      ctx!.fillStyle = rgba(n.hue, n.big ? 0.55 : 0.32);
      ctx!.beginPath();
      ctx!.arc(n.x, n.y, pr, 0, 6.29);
      ctx!.fill();
    });
    if (running) raf = requestAnimationFrame(step);
  }

  const onMove = (e: PointerEvent) => {
    const r = cv.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.active = true;
  };
  const onLeave = () => {
    mouse.active = false;
    mouse.x = -999;
    mouse.y = -999;
  };
  cv.addEventListener("pointermove", onMove);
  cv.addEventListener("pointerleave", onLeave);
  window.addEventListener("resize", resize);

  const hero = cv.closest(".hero");
  let heroObs: IntersectionObserver | null = null;
  if (hero) {
    heroObs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          running = e.isIntersecting;
          if (running && !raf) raf = requestAnimationFrame(step);
          if (!running && raf) {
            cancelAnimationFrame(raf);
            raf = null;
          }
        }),
      { threshold: 0.01 }
    );
    heroObs.observe(hero);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    resize();
    running = false;
    step();
  } else {
    resize();
    step();
  }

  return () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    cv.removeEventListener("pointermove", onMove);
    cv.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("resize", resize);
    heroObs?.disconnect();
  };
}
