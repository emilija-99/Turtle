import { Component } from '@angular/core';
import { interval, Subscriber, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-pomodoro-timer',
  standalone: true,
  imports: [],
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.css',
})
export class PomodoroTimerComponent {
  /*

  in settings you can chose your timer!

*/
  public currentTime = null;
  public minutes = 25;
  public seconds = 0;
  public interval: Subscription | undefined;

  protected timeSettings = {
    pomodoro25: 25,
    pomodoro35: 35,
    pomodoro45: 45,
    pomodoro60: 60,
  };

  protected radioOn = {};

  protected history = {
    today: null,
    lastweek: null,
    lastmonth: null,
  };

  protected settings = null;

  onInit() {}

  getMinutes() {
    return this.minutes;
  }

  setMinutes(minutes: number) {
    this.minutes = minutes;
  }

  startTimer(time: number) {
    var timeNow = interval(1000);
    this.interval = timeNow.subscribe((t) => {
      console.log('t:', t, this.minutes);
      if (t % 60 == 0) {
        this.minutes--;
      }
      this.seconds = 60 - (t % 60);
    });
  }

  transform(time: number) {
    const seconds = Math.floor(time / 60);
  }

  resetTimer() {
    this.interval?.unsubscribe();
    this.minutes = this.timeSettings.pomodoro25;
    this.seconds = 0;
  }
}
