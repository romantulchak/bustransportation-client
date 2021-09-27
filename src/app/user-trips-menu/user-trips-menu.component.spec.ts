import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTripsMenuComponent } from './user-trips-menu.component';

describe('UserTripsMenuComponent', () => {
  let component: UserTripsMenuComponent;
  let fixture: ComponentFixture<UserTripsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTripsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTripsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
