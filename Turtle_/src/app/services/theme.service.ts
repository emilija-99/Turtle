import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private current_style_global = new BehaviorSubject<string>('blue');
  currentStyle = this.current_style_global.asObservable();
  constructor() { }

  changeStyle(style:string){
    this.current_style_global.next(style);
  }
}
