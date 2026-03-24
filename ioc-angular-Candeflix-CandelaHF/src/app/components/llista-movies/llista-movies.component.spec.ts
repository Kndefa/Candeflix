import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlistaMoviesComponent } from './llista-movies.component';

describe('LlistaMoviesComponent', () => {
  let component: LlistaMoviesComponent;
  let fixture: ComponentFixture<LlistaMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlistaMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
