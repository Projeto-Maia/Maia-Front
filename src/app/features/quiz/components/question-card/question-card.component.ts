import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  QuizOption,
  QuizQuestion,
} from '../../../../core/services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRadioModule],
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnChanges {
  @Input() question!: QuizQuestion;

  @Input() selectedId: string | null = null;

  @Output() optionSelected = new EventEmitter<QuizOption>();

  @ViewChild(MatRadioGroup, { static: true }) radioGroup!: MatRadioGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] || changes['selectedId']) {
      if (!this.selectedId && this.radioGroup) {
        this.radioGroup.value = null;

        (this.radioGroup as any)._controlValueAccessorChangeFn?.(null);
      }
    }
  }

  onSelectionChange(id: string): void {
    this.selectedId = id;
    const opt = this.question.options.find((o) => o.id === id)!;
    this.optionSelected.emit(opt);
  }
}
