import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css'
})
export class GoalComponent {
  @Input({required:true}) habit_name: string | undefined;
}
