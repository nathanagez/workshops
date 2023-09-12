import { Component } from '@angular/core';

interface Recipe {
  id: string;
  name: string;
}

@Component({
  selector: 'app-recipe-carousel',
  standalone: true,
  template: `
    <div>{{ recipes[0].name }}</div>
    <button [disabled]="false">PREVIOUS</button>
    <button (click)="goToNext()">NEXT</button>
  `,
})
export class RecipeCarouselComponent {
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

  goToNext() {
    console.log('goToNext');
  }
}
