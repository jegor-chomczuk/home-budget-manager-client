import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanuaryComponent } from './january.component';

describe('JanuaryComponent', () => {
  let component: JanuaryComponent;
  let fixture: ComponentFixture<JanuaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JanuaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JanuaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
