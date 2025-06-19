import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent {
  acertos = 0;
  total = 0;
  mensagemFinal = '';
  tituloFinal = '';

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras
      .state as { acertos: number; total: number };
    if (state) {
      this.acertos = state.acertos;
      this.total = state.total;
    }
    this.definirMensagem();
  }

  definirMensagem() {
    const pct = this.total ? this.acertos / this.total : 0;
    if (pct >= 0.7) {
      this.tituloFinal = 'Parabéns!';
      this.mensagemFinal =
        'Você está bem informada! Conhecimento é poder. Compartilhe o app e ajude outras mulheres.';
    } else {
      this.tituloFinal = 'Obrigada por participar!';
      this.mensagemFinal =
        'Muitos sinais não são óbvios. Estar ciente é o primeiro passo. Veja no mapa os locais que podem te ajudar.';
    }
  }

  reiniciarQuiz() {
    this.router.navigate(['/quiz']);
  }

  verMapa() {
    this.router.navigate(['/mapa']);
  }
}
