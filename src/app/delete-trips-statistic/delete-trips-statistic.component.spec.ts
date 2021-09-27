import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTripsStatisticComponent } from './delete-trips-statistic.component';

describe('DeleteTripsStatisticComponent', () => {
  let component: DeleteTripsStatisticComponent;
  let fixture: ComponentFixture<DeleteTripsStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTripsStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTripsStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
