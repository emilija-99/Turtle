import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent {
/*
  - real time based on the tasks or golas that is tied to
  - different colors
  - optional labes to indicate what eatch progress bar represent
  
  types:
  - linear (simple tasks)
  - circual or semi circual bars for visial striking 

  - hover effect to show exacct percentages for details on progress
  - clicable to drill down into more detailed view or logs

  - responsible design
  - proper ARIA roles and label for accessibility
*/
  public current_progress = 20;
  public current_style_progress_bar?:string;
  private styleSubscribtion: Subscription;

  constructor(private themeService: ThemeService){
    this.styleSubscribtion = this.themeService.currentStyle.subscribe({
      next:(response)=>{
        
        console.log("this.current_style_progress :", response);
        if(this.current_style_progress_bar !== response){
          // loader - change style
        }
        this.current_style_progress_bar = response;
      },
      error:(error)=>{
        this.current_style_progress_bar = 'blue';
      },
      complete:()=>{
        console.log("Your style changed!");
      }
    })
  }

  ngOnDestroy(){
    this.styleSubscribtion.unsubscribe();
  }
  updateProgress(value: number){
    console.log('updateProgress:', value);
    this.current_progress = value;
  }

}
