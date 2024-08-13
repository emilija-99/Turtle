import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mono_theme_colors } from '../../assets/global_cases'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private current_style_global = new BehaviorSubject<string>('mono');
  
  private enableEmoji:boolean = false;
  private enable_emoji_progress_bar = new BehaviorSubject<boolean>(this.enableEmoji);
  
  currentStyle = this.current_style_global.asObservable();
  emoji_progress_bar = this.enable_emoji_progress_bar.asObservable();

  constructor(
   
  ) { }

  changeStyle(style:string){
    this.current_style_global.next(style);
    this.current_style_global.error("style isn't set")
  }

  offOnEmojiProgressBar(enabled: boolean){
    this.enable_emoji_progress_bar.next(enabled);
    this.enable_emoji_progress_bar.error("oh no... we can not change this now (:");
  }

  blueStyleOfProgressBar(e?: { target?: any; }){
    let target = e?.target;
    // if (current_progress < 20) {
    //   target.style.background = 'linear-gradient(180deg, #66FBDB 36%, #3D9582 100%)';
    // } else if (current_progress >= 20 && current_progress < 40) {
    //   target.style.background = 'linear-gradient(180deg, #FEAE7C 36%, #98684A 100%)';
    // } else if (current_progress >= 40 && current_progress < 50) {
    //   target.style.background = 'linear-gradient(180deg, #FF9886 36%, #995B50 100%)';
    // } else if (current_progress >= 50 && current_progress < 60) {  
    //   target.style.background = 'linear-gradient(180deg, #FF7F9C 36%, #994C5E 100%)';
    // } else if (current_progress >= 60 && current_progress < 80) {  
    //   target.style.background = 'linear-gradient(180deg, #CB90FC 36%, #795696 100%)';
    // } else if (current_progress >= 80 && current_progress < 100) {  
    //   target.style.background = 'linear-gradient(180deg, #9191FF 36%, #575799 100%)';
    // } else if (current_progress === 100) {
    //   target.style.background = 'linear-gradient(180deg, #9191FF 36%, #575799 100%)';
    // }
    return 'linear-gradient(180deg, #66FBDB 36%, #3D9582 100%)';
  }

  monoStyleProgressBar(e:{target:any}){
    return mono_theme_colors['background-color'];

  }

}
