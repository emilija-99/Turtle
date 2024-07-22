import { Component, Input, model, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { habit_tracker_object, matrixObj } from '../../../assets/models';

@Component({
  selector: 'app-habit-tracker',
  templateUrl: './habit-tracker.component.html',
  styleUrls: ['./habit-tracker.component.css'],
  standalone:true
})
export class HabitTrackerComponent implements OnInit, OnChanges {
  @Input({required:true}) habit_id!: number;
  @Input({required:true}) habit_name!: string; 
  private date: Date = new Date();
  private days?: any;
  private habitTrackerList: any[] = [];
  private months: {} = {
    Jan: 31,
    Feb: 28,
    Marth: 31,
    April: 30,
    May: 31,
    Jun: 30,
    July: 31,
    Avg: 31,
    Sept: 30,
    Okt: 31,
    Nov: 30,
    Dec: 31
  };


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes:", changes);
    if (changes['habit_id'].currentValue) {
      this.setDaysForMonth();
    }

    
  }

  ngOnInit(): void {
    console.log("init.")
    if (this.habit_id) {
      this.setDaysForMonth();
    }
  }

  setDaysForMonth(): void {
    var current_month = this.date.getMonth();
    this.days = Object.entries(this.months)[current_month];
    console.log("days:", this.days);
    this.createCanvas(this.habit_name, this.habit_id); 
  }

  createCanvas(habit_name:string, habitId: number) { 
    console.log("days,", habit_name, habitId);
    if (typeof document !== 'undefined') {
      
      console.log("createCanvas if");
      let daysGrid = document.getElementById(`days-${habitId}`) as HTMLElement; 
      console.log(daysGrid);
      if (!daysGrid) {
        // If it doesn't exist, create it
        daysGrid = document.createElement('div');
        daysGrid.id = `days-${habitId}`;
        daysGrid.classList.add('days-grid');
        
        let container = document.querySelectorAll('.container');
        container[container.length-1].appendChild(daysGrid);
       
      }
        var rows = (this.days[1] / 7);
        var columns = 7;
        console.log('rows, columns', rows, columns);
        rows = Math.round(rows)+1;
        let mat = this.setHabitTrackerMatrix(columns, rows);
        console.log("mat", mat);
        
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
        daysGrid.addEventListener('click',()=>{
          mat.matrix[1][0].checked = !mat.matrix[1][0].checked;
          if(mat.matrix[1][0].checked){
            const row = daysGrid.querySelectorAll('.row')[1];
            const column = row.querySelectorAll('.square')[0];
            
            // column.style.backgroundColor = 'green';
           // document.querySelectorAll('#days-1')[0].querySelectorAll('.row')[1].querySelectorAll('.square')[0].style.backgroundColor = 'green'
            console.log("column", column);
           console.log('row',row);
            console.log('row.querySelectorAll(square).length',row.querySelectorAll('.square').length);
            console.log('ma',daysGrid);
          }
        })
        this.habitTrackerList.push(mat);
      }

      
}

  setHabitTrackerMatrix(columns: any, rows: any): habit_tracker_object {
    console.log("column, rows", columns, rows);

    const habitTracker : habit_tracker_object = {
      id: this.habit_id,
      matrix: this.createMatrix(columns, rows)
    }
    console.log(">> Matrix: habit_tracker: ", habitTracker);
   return habitTracker;
  }
  createMatrix(columns: number, rows:number): matrixObj[][] {
    const matrix: matrixObj[][] = [];
    let counter = 0;

    for(let i = 0; i < rows; i++){
      const row: matrixObj[] = [];
      for(let j = 0; j < columns; j++){
        if(counter <= 31){
          row.push({
            checked:false,
            day: counter++
          });
        }else{
          row.push({
            checked:false,
            day:-1,
          });
        }
      }
      matrix.push(row);
    }
    return matrix;
  }

  
}
