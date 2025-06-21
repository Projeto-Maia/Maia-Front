import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuizQuestion, QuizOption } from '../../../core/services/api.service';

interface ResultadoItem {
  pergunta: string;
  respostaUsuario: QuizOption;
  correta: boolean;
  explicacao: string;
}

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent {
  total = 0;
  acertos = 0;
  tituloFinal = '';
  mensagemFinal = '';

  itens: ResultadoItem[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation()?.extras.state as {
      questions: QuizQuestion[];
      selectedAnswers: Record<number, string>;
      acertos: number;
      total: number;
    };

    if (!nav) {
      this.router.navigate(['/']);
      return;
    }

    this.total = nav.total;
    this.acertos = nav.acertos;

    this.itens = nav.questions.map((q) => {
      const respostaUsuarioId = nav.selectedAnswers[q.id];
      const respostaUsuario = q.options.find(
        (o) => o.id === respostaUsuarioId
      )!;

      return {
        pergunta: q.questionText,
        respostaUsuario,
        correta: respostaUsuarioId === q.correctOptionId,
        explicacao: q.explanation,
      };
    });

    this.definirMensagem();
  }

  private definirMensagem(): void {
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

  reiniciarQuiz(): void {
    this.router.navigate(['/quiz']);
  }

  verMapa(): void {
    this.router.navigate(['/mapa']);
  }
}
