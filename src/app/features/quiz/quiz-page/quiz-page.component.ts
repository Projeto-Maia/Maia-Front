import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from '../components/question-card/question-card.component';
import { Router } from '@angular/router';
import { ApiService, QuizOption, QuizQuestion } from '../../../core/services/api.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent, MatProgressBarModule],
  templateUrl: 'quiz-page.component.html',
  styleUrls: ['quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  questions: QuizQuestion[] = [];
  currentIndex = 0;
  selectedAnswers: Record<number, string> = {};
  acertos = 0;                             

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getQuiz().subscribe((data) => (this.questions = data));
  }

  get currentQuestion(): QuizQuestion | null {
    return this.questions[this.currentIndex] || null;
  }

  handleOptionSelected(option: QuizOption): void {
    const perguntaAtual = this.currentQuestion!;
    this.selectedAnswers[perguntaAtual.id] = option.id;


    if (option.id === perguntaAtual.correctOptionId) {
      this.acertos++;
    }

    
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.router.navigate(['/quiz/resultado'], {
        state: { acertos: this.acertos, total: this.questions.length },
      });
    }
  }
}
