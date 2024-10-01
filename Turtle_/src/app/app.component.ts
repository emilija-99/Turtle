import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HabitsComponent } from './pages/habits/habits.component';
import { HabitTrackerComponent } from './components/habit-tracker/habit-tracker.component';
import { title } from '../assets/global_cases';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HabitsComponent,
    HabitTrackerComponent,
    HomeComponent,
    HeaderComponent,
    WelcomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: { ngSkipHydration: 'true' },
})
export class AppComponent {
  title = title;
}
