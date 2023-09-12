import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';

@Component({
  selector: 'app-recipe-carousel',
  standalone: true,
  imports: [CommonModule, RecipePreviewComponent],
  template: `
    <app-recipe-preview [recipe]="recipes[index]"/>
    <button [disabled]="!hasPrevious()" (click)="goToPrevious()">
      PREVIOUS
    </button>
    <button [disabled]="!hasNext()" (click)="goToNext()">NEXT</button>
  `,
})
export class RecipeCarouselComponent {
  index = 0;
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

  hasPrevious() {
    return this.index > 0;
  }

  hasNext() {
    return this.index < this.recipes.length - 1;
  }

  goToNext() {
    this.index++;
  }

  goToPrevious() {
    this.index--;
  }
}
