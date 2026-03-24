import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetaMovieComponent } from './targeta-movie.component';

describe('TargetaMovieComponent', () => {
  let component: TargetaMovieComponent;
  let fixture: ComponentFixture<TargetaMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetaMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
