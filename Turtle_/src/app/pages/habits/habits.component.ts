import { Component } from '@angular/core';
import { HabitTrackerComponent } from '../../components/habit-tracker/habit-tracker.component';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [HabitTrackerComponent],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent {

}
