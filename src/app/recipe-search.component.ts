import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipeFilterV2Component } from './recipe-filter-v2.component';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [
    CommonModule,
    RecipeFilterComponent,
    RecipeFilterV2Component,
    RecipePreviewComponent,
  ],
  template: `
<!--        <app-recipe-filter (filterSubmit)="search($event)"/>-->
        <app-recipe-filter-v2 (filterChange)="search($event)"/>
        <hr>
        <app-recipe-preview *ngFor="let recipe of recipes" [recipe]="recipe"/>
    `,
})
export class RecipeSearchComponent implements OnInit {
  recipes?: Recipe[];

  private _repo = inject(RecipeRepository);

  ngOnInit() {
    this.search();
  }

  search(keywords?: string) {
    this._repo
      .searchRecipes(keywords)
      .subscribe((recipes) => (this.recipes = recipes));
  }
}
