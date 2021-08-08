import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelFoundComponent } from './travel-found.component';

describe('TravelFoundComponent', () => {
  let component: TravelFoundComponent;
  let fixture: ComponentFixture<TravelFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
