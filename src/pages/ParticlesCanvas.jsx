import { useEffect, useRef } from "react";

export default function ParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const rand = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    let particleNum = 100;
    let minDist = w / 2;
    const particles = [];
    const mouse = { x: 0, y: 0 };

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = rand(-1, 1);
        this.vy = Math.random();
        this.radius = 2;
      }

      draw() {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > w) this.x = 0;
        else if (this.x < 0) this.x = w;

        if (this.y > h) this.y = 0;
        else if (this.y < 0) this.y = h;
      }
    }

    function distance(p1, p2) {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= minDist) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,0,255,${0.2 - dist / minDist})`;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    function paintCanvas() {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);
    }

    for (let i = 0; i < particleNum; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;
    function draw() {
      paintCanvas();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.draw();
        p.update();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          distance(p, p2);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    function handleMouseMove(e) {
      mouse.x = e.clientX || e.pageX;
      mouse.y = e.clientY || e.pageY;
    }

    function handleResize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      minDist = w / 2;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}
