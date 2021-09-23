import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovedTripsDialogComponent } from './removed-trips-dialog.component';

describe('RemovedTripsDialogComponent', () => {
  let component: RemovedTripsDialogComponent;
  let fixture: ComponentFixture<RemovedTripsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovedTripsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovedTripsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
