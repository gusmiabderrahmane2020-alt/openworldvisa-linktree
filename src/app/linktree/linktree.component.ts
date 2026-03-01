import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ParticlesService } from './particles/particles.service';

@Component({
  selector: 'app-linktree',
  templateUrl: './linktree.component.html',
  styleUrls: ['./linktree.component.css']  // Assurez-vous que c'est .component.css
})
export class Linktree implements AfterViewInit, OnDestroy {
  @ViewChild('particlesCanvas', { static: true }) particlesCanvas!: ElementRef<HTMLCanvasElement>;

  // URLs exactes pour Open World Visa
  facebookUrl = 'https://www.facebook.com/share/1HJsfgF4ox/';
  youtubeUrl = 'https://youtube.com/@experiences.de_vie?si=nttKW66i4e2Lb4gX';
  siteUrl = 'https://openwworldvisa.com/';
  instagramUrl ="https://www.instagram.com/study.ineurop?igsh=MXM1Y2V6a2w2aDU4bQ==";
  // État de la navigation
  activeSection: 'official' | 'orientation' = 'official';

  // Année dynamique pour le footer
  currentYear = new Date().getFullYear();

  constructor(private particlesService: ParticlesService) {}

  ngAfterViewInit() {
    // S'assurer que le canvas existe
    if (this.particlesCanvas && this.particlesCanvas.nativeElement) {
      // Petit délai pour être sûr que le DOM est prêt
      setTimeout(() => {
        this.particlesService.init(
          this.particlesCanvas.nativeElement,
          {
            iconSize: 24,
            opacity: 0.25,
            speed: 0.4
          }
        );
      }, 100);
    }
  }

  ngOnDestroy() {
    this.particlesService.destroy();
  }

  setSection(section: 'official' | 'orientation') {
    this.activeSection = section;
  }
}
