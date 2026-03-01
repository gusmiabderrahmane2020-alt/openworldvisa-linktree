import { Injectable, OnDestroy } from '@angular/core';

export interface Particle {
  x: number;
  y: number;
  size: number;
  icon: string;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
}

@Injectable({
  providedIn: 'root'
})
export class ParticlesService implements OnDestroy {
  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private animationFrame: number = 0;
  private particles: Particle[] = [];
  private width: number = 0;
  private height: number = 0;
  private options = {
    iconSize: 24,
    opacity: 0.25,
    speed: 0.4
  };

  // Icons représentant l'étude et l'orientation
  private readonly icons = [
    '📘', '📗', '📚', '🎓', '🧭', '🌍', '✈️', '📖', '🗺️', '📌',
    '🖋️', '📝', '🏛️', '🌐', '🧳', '🎒', '🔬', '📐', '⚓', '🧫',
    '🔍', '📏', '🧪', '🌎', '🎯', '💼', '📋', '🔖', '⭐', '📍'
  ];

  init(canvas: HTMLCanvasElement, options?: Partial<typeof this.options>) {
    console.log('Initializing particles service...');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = { ...this.options, ...options };
    
    this.resize();
    this.initParticles();
    this.animate();
    
    window.addEventListener('resize', this.handleResize);
  }

  private handleResize = () => {
    this.resize();
    this.initParticles();
  };

  private resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private initParticles() {
    console.log('Initializing particles...');
    this.particles = [];
    const count = 45;
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: 16 + Math.floor(Math.random() * 24),
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        speedX: (Math.random() - 0.5) * this.options.speed,
        speedY: (Math.random() - 0.5) * this.options.speed,
        opacity: 0.15 + Math.random() * 0.25,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 0.2
      });
    }
  }

  private animate = () => {
    if (!this.ctx || !this.canvas) {
      this.animationFrame = requestAnimationFrame(this.animate);
      return;
    }
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.particles.forEach(p => {
      // Mise à jour position
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      // Rebondir sur les bords
      if (p.x < -50) p.x = this.width + 50;
      if (p.x > this.width + 50) p.x = -50;
      if (p.y < -50) p.y = this.height + 50;
      if (p.y > this.height + 50) p.y = -50;

      // Vérifier que le contexte existe toujours
      if (this.ctx) {
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.font = `${p.size}px 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = '#e2dccd';
        this.ctx.shadowColor = '#b59d6b';
        this.ctx.shadowBlur = 12;
        this.ctx.fillText(p.icon, 0, 0);
        this.ctx.restore();
      }
    });

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  destroy() {
    console.log('Destroying particles service...');
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    window.removeEventListener('resize', this.handleResize);
    this.ctx = null;
    this.canvas = null;
  }

  ngOnDestroy() {
    this.destroy();
  }
}