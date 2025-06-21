import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from '../components/question-card/question-card.component';
import { Router } from '@angular/router';
import {
  ApiService,
  QuizOption,
  QuizQuestion,
} from '../../../core/services/api.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent, MatButtonModule],
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

  get answeredCurrent(): boolean {
    const q = this.currentQuestion;
    return !!(q && this.selectedAnswers[q.id]);
  }

  get selectedIdForCurrentQuestion(): string | null {
    const q = this.currentQuestion;
    return q ? this.selectedAnswers[q.id] ?? null : null;
  }

  handleOptionSelected(option: QuizOption): void {
    const pergunta = this.currentQuestion!;
    this.selectedAnswers[pergunta.id] = option.id;

    if (option.id === pergunta.correctOptionId) {
      this.acertos++;
    }
  }

  next(): void {
    if (!this.answeredCurrent) return;

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.router.navigate(['/quiz/resultado'], {
        state: {
          acertos: this.acertos,
          total: this.questions.length,
          questions: this.questions,
          selectedAnswers: this.selectedAnswers,
        },
      });
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
