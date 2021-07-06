import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCityLineComponent } from './trip-city-line.component';

describe('TripCityLineComponent', () => {
  let component: TripCityLineComponent;
  let fixture: ComponentFixture<TripCityLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripCityLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCityLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
