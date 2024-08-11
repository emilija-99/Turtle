import { Component, ComponentFactoryResolver, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { HabitTrackerComponent } from '../../components/habit-tracker/habit-tracker.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventEmitter } from 'node:stream';
import { HabitObject } from './habit';
import { HabitService } from './../../services/habit.service'
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [HttpClientModule, HabitTrackerComponent, FormsModule, CommonModule],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent implements OnInit, OnChanges{
  @ViewChild('habitTrackerContainer', { read: ViewContainerRef }) habitTrackerContainer!: ViewContainerRef ;
  public ID:number = 0;
  public habit_name:any='habit';
  public habitsNames:HabitObject[] = [];
 // @Output() habitNameChange = new EventEmitter<string>();
  
  public habitName:any;
  public visibleInput:boolean = true;
  private habits_tracker_obj:HabitObject[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private habitService: HabitService
  ){
    
  }
  ngOnInit(): void {
    this.getAllHabits();
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

  getAllHabits(){
    this.habitService.getAllHabits().subscribe({
      next:(response)=>{
        console.log("HabitService response: ", response);
        if(response)
          this.habits_tracker_obj = response;
      },
      complete:()=>{

      },
      error:(error)=>{
        console.error("getAllHabits error response: ",error);
      }
    })
  }


  addNewHabit(habitName: string) {
    console.log("habitName reseved: ", habitName);

    var newHabitObject = new HabitObject();
    newHabitObject.habit_id = ++this.ID;
    newHabitObject.habit_name = habitName;
    newHabitObject.creation_date = new Date().toISOString();

    console.log("newHabitObject: ", newHabitObject);

    console.log("habitTrackerContainer",this.habitTrackerContainer);
    if (habitName && this.habitTrackerContainer) { 
      const factory = this.resolver.resolveComponentFactory(HabitTrackerComponent);
      const componentRef = this.habitTrackerContainer.createComponent(factory);
      componentRef.instance.habit_name = newHabitObject.habit_name; 
      componentRef.instance.habit_id = newHabitObject.habit_id;
      // componentRef.instance.creation_date = newHabitObject.creation_date.toString();

      this.habitName = ''; 
      console.log("componentRed: ", componentRef);
      // document.getElementById('habitTrackerContainer')?
    }else{
      console.log("we do not have this instance of component :).");
    }
   

  }
  
}
