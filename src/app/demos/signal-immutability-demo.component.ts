import {
  ChangeDetectionStrategy,
  Component,
  effect,
  Input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'app-user',
  template: `{{ user.name }}`,
})
export class UserComponent {
  @Input({ required: true }) user!: { name: string };
}

@Component({
  selector: 'app-signal-immutability-demo',
  standalone: true,
  imports: [CommonModule, UserComponent],
  template: `<app-user [user]="user()"/>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalImmutabilityDemoComponent {
  user = signal({ name: 'Foo' });

  constructor() {
    /* Change is not propagated to child because child component
     * is "OnPush" and will only update if input reference changes.
     * We should use `update()` instead and create a new reference. */
    setTimeout(() => {
      this.user.mutate((user) => (user.name = 'John'));
    });
  }
}
