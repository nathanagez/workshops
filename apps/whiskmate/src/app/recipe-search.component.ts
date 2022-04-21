import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Recipe } from './recipe';
import { RecipePreviewModule } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  selector: 'wm-recipe-search',
  template: `
    <input
      (input)="onKeywordsInput($event)"
      placeholder="Keywords"
      type="text"
    />

    <div *ngIf="!recipes">Loading...</div>

    <div *ngIf="recipes?.length === 0">No recipes</div>

    <wm-recipe-preview
      *ngFor="let recipe of recipes"
      [recipe]="recipe"
    ></wm-recipe-preview>
  `,
})
export class RecipeSearchComponent implements OnInit {
  recipes?: Recipe[];
  private _keywords$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(private _recipeRepository: RecipeRepository) {}

  ngOnInit() {
    this._keywords$
      .pipe(switchMap((keywords) => this._recipeRepository.search(keywords)))
      .subscribe((recipes) => (this.recipes = recipes));
  }

  onKeywordsInput(event: Event) {
    const keywords = (event.target as HTMLInputElement).value;
    this._keywords$.next(keywords);
  }
}

@NgModule({
  declarations: [RecipeSearchComponent],
  exports: [RecipeSearchComponent],
  imports: [CommonModule, RecipePreviewModule],
})
export class RecipeSearchModule {}
