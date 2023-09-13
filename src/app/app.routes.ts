import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'carousel',
    loadComponent: () => import('./demos/recipe-carousel.component'),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./recipe-feature-search/recipe-search.component'),
  },
  {
    path: 'recipe/:recipeId',
    loadComponent: () =>
      import('./recipe-feature-detail/recipe-detail.component'),
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.routes'),
  // },
  {
    path: '**',
    redirectTo: 'search',
  },
];
