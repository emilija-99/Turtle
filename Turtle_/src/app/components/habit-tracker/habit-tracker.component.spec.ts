import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitTrackerComponent } from './habit-tracker.component';

describe('HabitTrackerComponent', () => {
  let component: HabitTrackerComponent;
  let fixture: ComponentFixture<HabitTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
