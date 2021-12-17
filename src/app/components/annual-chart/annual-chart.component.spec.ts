import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualChartComponent } from './annual-chart.component';

describe('AnnualChartComponent', () => {
  let component: AnnualChartComponent;
  let fixture: ComponentFixture<AnnualChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
