import {
  AfterContentInit,
  Component,
  Input,
  model,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { habit_tracker_object, matrixObj } from '../../../assets/models';
import { HttpClientModule } from '@angular/common/http';
import { HabitsServiceService } from './habits-service.service';
import { LoggerService } from '../../../assets/logger.service';

@Component({
  selector: 'app-habit-tracker',
  imports: [HttpClientModule],
  templateUrl: './habit-tracker.component.html',
  styleUrls: ['./habit-tracker.component.css'],
  standalone: true,
})
/*
  This component use to make instance of object:
    - make component
 */
export class HabitTrackerComponent implements OnInit, OnChanges {
  @Input({ required: true }) habit_id!: number;
  @Input({ required: true }) habit_name!: string;
  @Input({ required: true }) creation_date!: string;

  // @Input({required:true}) creation_date!:string;
  private date: Date = new Date();
  private days?: any;
  private habitTrackerList: any[] = [];
  protected matrix!: habit_tracker_object;

  constructor(
    public habit_service: HabitsServiceService,
    public log: LoggerService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes:', changes);
  }

  ngOnInit(): void {
    // console.log('this.habit.', this.habit_service.allHabitsData);
    this.log.info('ngOnInit:');
    this.log.info(
      `@input: habit name, ${this.habit_name}, ${this.habit_id}, ${this.creation_date}`,
    );

    // if (this.habit_id) {
    //   let rows = this.days[1] / 7;
    //   const columns = 7;
    //   rows = Math.round(rows) + 1;
    //   this.matrix = this.setHabitTrackerMatrix(columns, rows);
    //   console.log('mat: ', this.matrix);
    //   // this.setDaysForMonth();
    // }
  }

  setDaysForMonth(): void {
    this.createCanvas(this.habit_name, this.habit_id);
  }

  createCanvas(habit_name: string, habitId: number) {
    if (typeof document !== 'undefined') {
      let daysGrid = document.getElementById(`days-${habitId}`) as HTMLElement;
      if (!daysGrid) {
        // If it doesn't exist, create it
        daysGrid = document.createElement('div');
        daysGrid.id = `days-${habitId}`;
        daysGrid.classList.add('days-grid');

        const container = document.querySelectorAll('.container');
        container[container.length - 1].appendChild(daysGrid);
      }

      let rows = this.days[1] / 7;
      const columns = 7;
      console.log('rows, columns', rows, columns);
      rows = Math.round(rows) + 1;
      const mat = this.setHabitTrackerMatrix(columns, rows);
      console.log('mat', mat);

      for (let i = 0; i < rows; i++) {
        const rowContainer = document.createElement('div');
        rowContainer.style.paddingLeft = '1px';
        rowContainer.style.display = 'flex';

        rowContainer.classList.add('row');

        for (let j = 0; j < columns; j++) {
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
      daysGrid.addEventListener('click', () => {
        mat.matrix[1][0].checked = !mat.matrix[1][0].checked;
        if (mat.matrix[1][0].checked) {
          const row = daysGrid.querySelectorAll('.row')[1];
          const column = row.querySelectorAll('.square')[0];
        }
      });
      this.habitTrackerList.push(mat);
    }
  }

  setHabitTrackerMatrix(columns: any, rows: any): habit_tracker_object {
    console.log('column, rows', columns, rows);

    const habitTracker: habit_tracker_object = {
      id: this.habit_id,
      matrix: this.createMatrix(columns, rows),
    };
    console.log('>> Matrix: habit_tracker: ', habitTracker);
    return habitTracker;
  }

  createMatrix(columns: number, rows: number): matrixObj[][] {
    const matrix: matrixObj[][] = [];
    let counter = 0;

    for (let i = 0; i < rows; i++) {
      const row: matrixObj[] = [];
      for (let j = 0; j < columns; j++) {
        if (counter <= 31) {
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
}
