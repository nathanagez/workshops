import { ScoreModule } from './score.component';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { Recipe } from './recipe';
import { RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-preview',
  template: ` <ng-container *ngIf="recipe">
    <h2 class="title">{{ getTitle() }}</h2>

    <ng-content select="[slot=subtitle]"></ng-content>

    <div class="actions-container">
      <ng-content select="[slot=actions]"></ng-content>
    </div>

    <!-- <wm-score (scoreChange)="scoreChange.emit($event)"></wm-score> -->
  </ng-container>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #ccc;
        margin: 2px;
      }

      .title {
        text-align: center;
      }

      .actions-container {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class RecipePreviewComponent {
  @Input() recipe?: Recipe;
  @Output() scoreChange = new EventEmitter<number>();

  getTitle() {
    return this.recipe?.name;
  }
}

@NgModule({
  declarations: [RecipePreviewComponent],
  exports: [RecipePreviewComponent],
  imports: [CommonModule, ScoreModule],
})
export class RecipePreviewModule {}
