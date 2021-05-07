import { BookSearchComponent } from './book-seach.component';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(BookSearchComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookSearchComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  it('should search books', () => {
    const fixture = TestBed.createComponent(BookSearchComponent);
    console.log(fixture.componentInstance);
    console.log(fixture.debugElement);
  });
});
