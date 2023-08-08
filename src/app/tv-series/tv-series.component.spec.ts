import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSeriesComponent } from './tv-series.component';

describe('TvSeriesComponent', () => {
  let component: TvSeriesComponent;
  let fixture: ComponentFixture<TvSeriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvSeriesComponent]
    });
    fixture = TestBed.createComponent(TvSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
