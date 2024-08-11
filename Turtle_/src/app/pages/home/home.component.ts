import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ThemeService } from '../../services/theme.service';
import { PomodoroTimerComponent } from "../../components/pomodoro-timer/pomodoro-timer.component";
import { HabitTrackerComponent } from "../../components/habit-tracker/habit-tracker.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, HeaderComponent, PomodoroTimerComponent, HabitTrackerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.theme.changeStyle('mono')
  }
  
  constructor(
    private theme: ThemeService
  ){

  }
}
