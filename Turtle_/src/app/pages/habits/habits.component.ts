import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HabitTrackerComponent } from '../../components/habit-tracker/habit-tracker.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [HabitTrackerComponent, FormsModule,CommonModule],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent implements OnInit, OnChanges{
  
  public habit_name:any='habit';
  public habitName:any;
  public visibleInput:boolean = true;

  ngOnInit(): void {
    console.log("Item.");
    this.inputChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes:", changes);
    
  }

  inputChange():void{
    console.log("habit_name", this.habitName);
    if(this.habitName){
      this.habit_name = this.habitName;
    }
  }

  addNewHabit($event: any){
    console.log("EVENT: ", $event);
    if($event){
      this.habit_name = $event;
      this.visibleInput = false;
    }
  }

  
}
