import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { habit_tracker_object } from '../../../assets/models';

@Component({
  selector: 'app-habit-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './habit-tracker.component.html',
  styleUrl: './habit-tracker.component.css'
})
export class HabitTrackerComponent implements OnInit,OnChanges{
  
  @Input() habit_name: any;
  private date: Date = new Date();
  private days?: any;
  private habitTrackerList:any[]=[];
  private months :{}={
    Jan: 31,
    Feb:28,
    Marth:31,
    April:30,
    May: 31,
    Jun:30,
    July:31,
    Avg: 31,
    Sept: 30,
    Okt: 31,
    Nov: 30,
    Dec: 31
  };

//  public visibleElement:boolean = false;

  constructor(
    private renderer: Renderer2
  ){
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes:", changes);
    if(changes['habit_name'].currentValue){
      this.setDaysForMonth();
     // this.createCanvas(this.days);
     // this.visibleElement = true;
    }else{
    //  this.visibleElement = false;
    }
  }
  ngOnInit(): void {
   
  }

  ngAfterViewInit(){
   
   
  }

  setDate():void{
    this.date = new Date();
  }

  getDate():Date{
    return this.date;
  }

  setDaysForMonth():void{
    console.log(this.date.getMonth());
    var current_month = this.date.getMonth() 
    this.days = Object.entries(this.months)[current_month];
    this.createCanvas(this.days)
  }

  setHabitTrackerMatrix(columns: any, rows: any): habit_tracker_object[][] {
  const habitTracker: habit_tracker_object[][] = [];

  for (let i = 0; i < columns; i++) {
    habitTracker[i] = [];

    for (let j = 0; j < rows; j++) {
      habitTracker[i][j] = { id:1,checked: false }; // Initialize each element as an object
    }
  }

  return habitTracker;
}


  setHabitObject(columns:any, rows:any, habit_tracker_object:habit_tracker_object[][]):habit_tracker_object[][]{
    habit_tracker_object[columns][rows].checked = true;
    return habit_tracker_object;
  }
  createCanvas(days : any){
    
    if(typeof document !== 'undefined'){
      console.log("not here (:")
      document.addEventListener('DOMContentLoaded', ()=>{
      const daysGrid = document.getElementById('days');
       if(daysGrid){
        var rows = (days[1]/7);
        var columns = 7;
        this.setHabitTrackerMatrix(columns, rows);
        for(let i = 0; i < columns; i++){
          var rowContainer = document.createElement('div');
          rowContainer.style.paddingLeft = '1px';
          rowContainer.classList.add('row');

          for(let j = 0; j < rows; j++){
              const square = document.createElement('div');
              // square.style.backgroundColor='#8AB753'; - checked.
              square.style.backgroundColor='#d2d2d2'
              square.style.width='6px';
              square.style.height = '6px'
              square.style.margin = '2px 1px'
              square.style.borderRadius = '1.5px'
              square.style.boxShadow = '-1px 4px 2px -3px rgba(0,0,0,0.63) inset'
              square.classList.add('square');
              
              var habitTracker = this.setHabitTrackerMatrix(columns,rows);

              square.addEventListener('click', (event) => {
                const rowIndex = i;
                const columnIndex = j;
                
                habitTracker[rowIndex][columnIndex].checked = !habitTracker[rowIndex][columnIndex].checked ;
                if(habitTracker[rowIndex][columnIndex].checked == true){
                  square.style.backgroundColor='#8AB753';
                }else{
                  square.style.backgroundColor='#d2d2d2'
                }
               console.warn(`Object at (${rowIndex}, ${columnIndex}) clicked. Checked status: ${habitTracker[i][j].checked}`);
              
              });

              rowContainer.appendChild(square);
              this.habitTrackerList.push(habitTracker);
          }
          daysGrid.appendChild(rowContainer)
        }
      }

    })
  }

     
  }


}
