import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizOption, QuizQuestion } from '../../../../core/services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule],
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent {
  @Input() question!: QuizQuestion;
  @Output() optionSelected = new EventEmitter<QuizOption>();

  selectOption(option: QuizOption) {
    this.optionSelected.emit(option);
  }
}
