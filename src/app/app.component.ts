import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LayoutComponent, Link } from './ui/layout.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LayoutComponent],
  template: `
        <app-layout [links]="links">
            <router-outlet/>
        </app-layout>
    `,
})
export class AppComponent {
  links: Link[] = [
    {
      route: ['/carousel'],
      label: 'Carousel',
    },
    {
      route: ['/search'],
      label: 'Search',
    },
  ];
}
