import { Injectable } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { LoggerService } from '../../../assets/logger.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HabitsServiceService {
  public allHabitsData: any = [];
  private newHabitSubject = new BehaviorSubject<any>(null);
  constructor(
    public habit_tracker_service: HabitService,
    public log: LoggerService,
  ) {}

  getAllHabits() {
    this.habit_tracker_service.getAllHabits().subscribe({
      next: (data) => {
        return data;
      },
      error: (error) => {
        this.log.error(
          'ERROR with receiving data from api/getAllHabits:',
          error,
        );
      },
      complete: () => {
        this.log.info('finished.exec');
      },
    });
  }

  getProgressForHabit(id: any) {
    this.habit_tracker_service.getProgressHabit(id).subscribe({
      next: (data) => {
        console.log('Received data from getProgressForHabitID: ', data);
        // data.forEach(element => {
        //   console.log("Elelemnt: ", element);
        // });
        return data;
      },
      error: (error) => {
        this.log.error('ERROR - data not found!', error);
      },
      complete: () => {
        this.log.info('Completed execution!');
      },
    });
  }

  createNewHabit(name: string) {
    console.log(`CreateNewHabit(${name}`);
    this.habit_tracker_service.postHabit(name).subscribe({
      next: (data) => {
        console.log('Response  success:', data);
        this.newHabitSubject.next(data);
      },
      error: (error: any) => {
        console.log('error in createing new habits.', error);
      },
      complete: () => {
        console.log('we are able to success!');
      },
    });
  }

  getNewHabit(): Observable<any> {
    return this.newHabitSubject.asObservable(); // Return the habit observable
  }
}
