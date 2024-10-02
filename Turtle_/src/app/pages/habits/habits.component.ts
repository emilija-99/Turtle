import {
  Component,
  ComponentFactoryResolver,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { HabitTrackerComponent } from '../../components/habit-tracker/habit-tracker.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventEmitter } from 'node:stream';
import { HabitObject } from './habit';
import { HabitService } from './../../services/habit.service';
import { HttpClientModule } from '@angular/common/http';
import { HabitsServiceService } from '../../components/habit-tracker/habits-service.service';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [HttpClientModule, HabitTrackerComponent, FormsModule, CommonModule],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css',
})
export class HabitsComponent implements OnInit, OnChanges {
  @ViewChild('habitTrackerContainer', { read: ViewContainerRef })
  habitTrackerContainer!: ViewContainerRef;

  public ID: number = -1;
  public habit_name: any = 'habit';
  public habitsNames: HabitObject[] = [];

  // @Output() habitNameChange = new EventEmitter<string>();

  public habitName: any = undefined;

  public visibleInput: boolean = true;
  private habits_tracker_obj: HabitObject[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private habitService: HabitsServiceService,
  ) {}

  ngOnInit(): void {
    this.getAllHabits();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes:', changes);
    this.inputChange();
  }

  inputChange(): void {
    console.log('habit_name', this.habitName);
    if (this.habitName) {
      this.habit_name = this.habitName;
    }
  }

  getAllHabits() {
    this.habitService.getAllHabits();
  }

  addNewHabit(habitName: string) {
    this.habitService.createNewHabit(habitName);

    const factory = this.resolver.resolveComponentFactory(
      HabitTrackerComponent,
    );
    const componentRef = this.habitTrackerContainer.createComponent(factory);

    this.habitService.getNewHabit().subscribe((habit) => {
      if(habit) {
        componentRef.instance.habit_name = habit['habit_name'];
        componentRef.instance.habit_id = habit['id'];
        componentRef.instance.creation_date = habit['creation_date'];
        componentRef.changeDetectorRef.detectChanges();
      }
    });

    if (habitName && this.habitTrackerContainer) {
      console.log('Component Reference: ', componentRef);
    } else {
      console.log('We do not have this instance of component.');
    }
  }
}
