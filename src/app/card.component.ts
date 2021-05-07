import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-card',
  template: `
    <h1>
      <ng-content select="[slot=title]"></ng-content>
    </h1>
    <section>
      <ng-content select="[slot=body]"></ng-content>
    </section>
    <div class="actions">
      <ng-content select="[slot=actions]"></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        border: solid red 1px;
        border-radius: 5px;
      }

      .actions {
        text-align: center;
      }
    `,
  ],
})
export class CardComponent {}
