import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';

@Component({
  selector: 'app-recipe-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RecipePreviewComponent],
  template: `
        <app-recipe-preview [recipe]="currentRecipe()"/>
        <button [disabled]="!hasPrevious()" (click)="goToPrevious()">
            PREVIOUS
        </button>
        <button [disabled]="!hasNext()" (click)="goToNext()">NEXT</button>
    `,
})
export class RecipeCarouselComponent {
  index = signal(0);
  recipes: Recipe[] = [
    {
      id: 'burger',
      name: 'Burger',
    },
    {
      id: 'pizza',
      name: 'Pizza',
    },
    {
      id: 'pasta',
      name: 'Pasta',
    },
  ];
  currentRecipe = () => this.recipes[this.index()];
  hasPrevious = () => this.index() > 0;
  hasNext = () => this.index() < this.recipes.length - 1;

  goToNext() {
    setTimeout(
      () =>
        this.index.update((index) =>
          Math.min(index + 1, this.recipes.length - 1)
        ),
      500
    );
  }

  goToPrevious() {
    setTimeout(() => this.index.update((index) => Math.max(index - 1, 0)), 500);
  }
}

export default RecipeCarouselComponent;
