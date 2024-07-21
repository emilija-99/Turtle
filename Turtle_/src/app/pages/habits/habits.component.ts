import { Component, ComponentFactoryResolver, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { HabitTrackerComponent } from '../../components/habit-tracker/habit-tracker.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventEmitter } from 'node:stream';
import { HabitObject } from './habit';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [HabitTrackerComponent, FormsModule,CommonModule],
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

  constructor(
    private resolver: ComponentFactoryResolver
  ){
    
  }
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


  addNewHabit(habitName: string) {
    console.log("habitName reseved: ", habitName);

    var newHabitObject = new HabitObject();
    newHabitObject.id = ++this.ID;
    newHabitObject.name = habitName;

    console.log("newHabitObject: ", newHabitObject);

    console.log("habitTrackerContainer",this.habitTrackerContainer);
    if (habitName && this.habitTrackerContainer) { 
      const factory = this.resolver.resolveComponentFactory(HabitTrackerComponent);
      const componentRef = this.habitTrackerContainer.createComponent(factory);
      componentRef.instance.habit_name = newHabitObject.name; 
      componentRef.instance.habit_id = newHabitObject.id;
      this.habitName = ''; 
      console.log("componentRed: ", componentRef);
    }else{
      console.log("we do not have this instance of component :).");
    }
   

  }
  
}
