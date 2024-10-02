import {
  AfterContentInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {CheckedState, habit_tracker_object, matrixObj} from '../../../assets/models';
import { HttpClientModule } from '@angular/common/http';
import { HabitsServiceService } from './habits-service.service';
import { LoggerService } from '../../../assets/logger.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-tracker',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './habit-tracker.component.html',
  styleUrls: ['./habit-tracker.component.css'],
  standalone: true,
})
/*
  This component use to make instance of object:
    - make component
 */
export class HabitTrackerComponent
  implements OnInit, OnChanges, AfterContentInit
{
  private _habit_id!: number;

  @Input()
  set habit_id(value: number) {
    this._habit_id = value;
    if (value) {
      console.log('this.habit_id here:', value);
    }
  }
  get habit_id(): number {
    return this._habit_id;
  }

  private _habit_name!: string;
  @Input()
  set habit_name(value: string) {
    this._habit_name = value;
    if (value) {
      console.log('here! habitName: ', this._habit_name);
    }
  }
  get habit_name(): string {
    return this._habit_name;
  }

  private _creation_date!: string;
  @Input()
  set creation_date(value: string) {
    this._creation_date = value;
    if (this._creation_date) {
      const columns = 7;
      const rows = 5;

      this.matrix = this.setHabitTrackerMatrix(
        columns,
        rows,
        this._creation_date,
      );
    }
  }
  get creation_date() {
    return this._creation_date;
  }

  private habitTrackerList: any[] = [];
  public matrix: habit_tracker_object = { id: this.habit_id, matrix: [] };
  constructor(
    public habit_service: HabitsServiceService,
    public log: LoggerService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes: ', changes);
  }

  ngAfterContentInit(): void {
    console.log('data:', this.habit_id, this.habit_name, this.creation_date);
  }

  ngOnInit(): void {
    // console.log('this.habit.', this.habit_service.allHabitsData);
    this.log.info('ngOnInit:');
    this.log.info(
      `@input: habit name, ${this.habit_name}, ${this.habit_id}, ${this.creation_date}`,
    );
  }

  createCanvas(habit_name: string, habitId: number, mat: habit_tracker_object) {
    console.log('createCanvas', mat, habit_name, habitId);
    if (typeof document !== 'undefined') {
      let daysGrid = document.getElementById(`days-${habitId}`) as HTMLElement;

      // Check if the daysGrid already exists to avoid duplicating it
      if (!daysGrid) {
        daysGrid = document.createElement('div');
        daysGrid.id = `days-${habitId}`;
        daysGrid.classList.add('days-grid');

        const container = document.querySelectorAll('.container');
        container[container.length - 1].appendChild(daysGrid);
        console.log(container, daysGrid);

        // Only display the first tracker; hide others
        const id = `days-${habitId}`;

        const hide = document.getElementById(id);
        if (hide !== null) hide.style.display = 'none';
      } else {
        // If the grid already exists, do not create a new one
        console.log(`Days grid for habit ${habitId} already exists.`);
        return; // Exit the function
      }

      // Now add the days to the grid
      for (let i = 0; i < 7; i++) {
        const rowContainer = document.createElement('div');
        rowContainer.style.paddingLeft = '1px';
        rowContainer.style.display = 'flex';
        rowContainer.classList.add('row');

        for (let j = 0; j < 5; j++) {
          const square = document.createElement('div');
          square.style.backgroundColor = '#d2d2d2';
          square.style.width = '10px';
          square.style.height = '10px';
          square.style.margin = '2px 1px';
          square.style.borderRadius = '1.5px';
          square.style.boxShadow = '-1px 4px 2px -3px rgba(0,0,0,0.63) inset';
          square.classList.add('square');
          rowContainer.appendChild(square);
        }
        daysGrid.appendChild(rowContainer);
      }

      // Additional logic for event listeners or other functionalities...
      this.habitTrackerList.push(mat); // Keep track of the habit tracker objects
    }
  }

  setHabitTrackerMatrix(columns: any, rows: any, creation_date: string) {
    const date = creation_date.split('-');
    const date_month = Number(date[1]);
    const date_day = Number(date[2]);
    const date_year = Number(date[0]);

    let days = -1;

    if (date_month == 2) {
      if (date_year % 4 == 0) {
        days = 29;
      } else {
        days = 28;
      }
    } else {
      if (
        date_month == 4 ||
        date_month == 6 ||
        date_month == 9 ||
        date_month == 11
      ) {
        days = 30;
      } else {
        days = 31;
      }
    }

    const habitTracker: habit_tracker_object = {
      id: this.habit_id,
      matrix: this.createMatrix(columns, rows, days, date_day),
    };

    console.log('Habit tracker: ', habitTracker);
    this.createCanvas(this.habit_name, this.habit_id, habitTracker);

    return habitTracker;
  }

  createMatrix(
    columns: number,
    rows: number,
    days: number,
    date_day: number,
  ): matrixObj[][] {
    const matrix: matrixObj[][] = [];
    let counter = 1;

    for (let i = 0; i < rows; i++) {
      const row: matrixObj[] = [];
      for (let j = 0; j < columns; j++) {
        if (counter <= date_day) {
          row.push({
            checked: 'disabled',
            day: counter++,
          });
        } else if (counter <= days && counter > date_day) {
          row.push({
            checked: false,
            day: counter++,
          });
        } else {
          row.push({
            checked: false,
            day: -1,
          });
        }
      }
      matrix.push(row);
    }
    return matrix;
  }

  setChecked(cell: CheckedState) {
    if(cell === true ){
      return false;
    } else {
      return true;
    }
  }
}
