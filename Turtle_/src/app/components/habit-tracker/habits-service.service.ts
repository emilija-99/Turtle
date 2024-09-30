import { Injectable } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { LoggerService } from '../../../assets/logger.service';

@Injectable({
  providedIn: 'root'
})
export class HabitsServiceService {

  public allHabitsData:any;
  constructor(
    public habit_tracker_service: HabitService,
    public log:LoggerService
  ) { }

  getAllHabits(){
    this.habit_tracker_service.getAllHabits().subscribe({
      next:(data)=>{
        
        this.allHabitsData = data;

        console.log("Recived data from api/getAllHabits:", data);
      },
      error:(error)=>{
        this.log.error("ERROR with receiving data from api/getAllHabits:", error);
      },
      complete:()=>{
        this.log.info("finished.exec");
      }
    })
  }

  getProgressForHabit(id:any){
    this.habit_tracker_service.getProgressHabit(id).subscribe({
      next:(data)=>{
        console.log("Received data from getProgressForHabitID: ", data);
        // data.forEach(element => {
        //   console.log("Elelemnt: ", element);
        // });
        return data;
      },
      error:(error)=>{
        this.log.error("ERROR - data not found!",error);
      },
      complete:()=>{
        this.log.info("Completed execution!");
      }
    })
  }
}
