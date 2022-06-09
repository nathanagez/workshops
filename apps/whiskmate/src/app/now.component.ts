import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
} from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-now',
  imports: [CommonModule],
  template: `{{ now | date: 'medium' }}`,
})
export class NowComponent {
  now = new Date();

  constructor(cdr: ChangeDetectorRef, zone: NgZone) {
    zone.runOutsideAngular(() => {
      setInterval(() => {
        this.now = new Date();
        cdr.detectChanges();
      }, 100);
    });
  }
}
