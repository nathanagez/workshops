import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-score',
  template: ` <span class="star" *ngFor="let i of stars" (click)="setScore(i)">
    <span *ngIf="score >= i">★</span>
    <span *ngIf="score < i">☆</span>
  </span>`,
  styles: [
    `
      .star {
        cursor: pointer;
      }
    `,
  ],
})
export class ScoreComponent {
  @Input() score = 0;
  @Output() scoreChange = new EventEmitter<number>();
  stars = Array.from(Array(5)).map((_, i) => i + 1);

  setScore(score: number) {
    this.score = score;
    this.scoreChange.emit(score);
  }
}

@NgModule({
  declarations: [ScoreComponent],
  exports: [ScoreComponent],
  imports: [CommonModule],
})
export class ScoreModule {}
