import { AfterViewChecked, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { LoggerService } from '../../../assets/logger.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements OnInit, AfterViewChecked{
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
  public progressClass = 'progress-blue'
  public current_style_progress_bar?:string;
  private styleSubscribtion: Subscription;

  constructor(private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformID:Object,
    private logger: LoggerService
  ){
    this.styleSubscribtion = this.themeService.currentStyle.subscribe({
      next:(response)=>{
        
        if(this.current_style_progress_bar !== response){
          // loader - change style
          this.logger.info('loaded - style is changed!', response);
        }
        this.current_style_progress_bar = response;
      },
      error:(error)=>{
        this.current_style_progress_bar = 'blue';
      },
      complete:()=>{
      }
    })
  }
  ngAfterViewChecked(): void {
    if(isPlatformBrowser(this.platformID)){
      let initRange = document?.getElementById('range_input');
       if(initRange)
          initRange.style.background = this.setStyleOfProgressBar();
    }
  }
  ngOnInit(): void {
   this.logger.error('component start!')
  }

  ngOnDestroy(){
    this.styleSubscribtion.unsubscribe();
  }
  updateProgress(value: number){
    this.current_progress = value;
    if(document?.getElementById("range_input")){
      let item = document?.getElementById("range_input")
      item?.addEventListener('input',this.changeStyleOfProgressBar);
    }
  }

  changeStyleOfProgressBar(e: { target: any; }){
    let target = e.target;
    if (this.current_progress < 20) {
      target.style.background = 'linear-gradient(180deg, #66FBDB 36%, #3D9582 100%)';
    } else if (this.current_progress >= 20 && this.current_progress < 40) {
      target.style.background = 'linear-gradient(180deg, #FEAE7C 36%, #98684A 100%)';
    } else if (this.current_progress >= 40 && this.current_progress < 50) {
      target.style.background = 'linear-gradient(180deg, #FF9886 36%, #995B50 100%)';
    } else if (this.current_progress >= 50 && this.current_progress < 60) {  
      target.style.background = 'linear-gradient(180deg, #FF7F9C 36%, #994C5E 100%)';
    } else if (this.current_progress >= 60 && this.current_progress < 80) {  
      target.style.background = 'linear-gradient(180deg, #CB90FC 36%, #795696 100%)';
    } else if (this.current_progress >= 80 && this.current_progress < 100) {  
      target.style.background = 'linear-gradient(180deg, #9191FF 36%, #575799 100%)';
    } else if (this.current_progress === 100) {
      target.style.background = 'linear-gradient(180deg, #9191FF 36%, #575799 100%)';
    }
  }

  setStyleOfProgressBar() : string{
    if (this.current_progress < 20) {
     return 'linear-gradient(180deg, #66FBDB 36%, #3D9582 100%)';
    } else if (this.current_progress >= 20 && this.current_progress < 40) {
      return 'linear-gradient(180deg, #FEAE7C 36%, #98684A 100%)';
    } else if (this.current_progress >= 40 && this.current_progress < 50) {
      return 'linear-gradient(180deg, #FF9886 36%, #995B50 100%)';
    } else if (this.current_progress >= 50 && this.current_progress < 60) {  
      return 'linear-gradient(180deg, #FF7F9C 36%, #994C5E 100%)';
    } else if (this.current_progress >= 60 && this.current_progress < 80) {  
      return 'linear-gradient(180deg, #CB90FC 36%, #795696 100%)';
    } else if (this.current_progress >= 80 && this.current_progress < 100) {  
      return 'linear-gradient(180deg, #9191FF 36%, #575799 100%)';
    } else if (this.current_progress === 100) {
      return 'linear-gradient(180deg, #9191FF 36%, #575799 100%)';
    }

    return 'linear-gradient(180deg, #66FBDB 36%, #3D9582 100%)';
    
  }
  



}
