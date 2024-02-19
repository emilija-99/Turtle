import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-habit-tracker',
  standalone: true,
  imports: [],
  templateUrl: './habit-tracker.component.html',
  styleUrl: './habit-tracker.component.css'
})
export class HabitTrackerComponent implements OnInit{
  
  private date: Date = new Date();
  private days?: any;
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

  constructor(
    private renderer: Renderer2
  ){
  }
  ngOnInit(): void {
    console.log("Date",this.date);  
    this.createCanvas(this.days)
  
  }

  ngAfterViewInit(){
    this.setDaysForMonth();
   
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

  createCanvas(days : any){
    if(typeof document !== 'undefined'){
      console.log("not here (:")
      document.addEventListener('DOMContentLoaded', ()=>{
      const daysGrid = document.getElementById('days');
       if(daysGrid){
        var rows = (days[1]/7);
        var columns = 7;

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
              square.style.boxShadow = '-3px 4px 12px -6px rgba(0,0,0,0.63) inset'
              square.classList.add('square');
              rowContainer.appendChild(square);
           
          }
          daysGrid.appendChild(rowContainer)
        }
      }

    })
  }

     
  }


}
