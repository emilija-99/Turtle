import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HabitsComponent } from './pages/habits/habits.component';
import { HabitTrackerComponent } from './components/habit-tracker/habit-tracker.component';
import { title } from '../assets/global_cases'; 


import {HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    HeaderComponent,
    HabitsComponent,
    HabitTrackerComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  host: { ngSkipHydration: 'true' }
})
export class AppComponent {
  title = title;
}
