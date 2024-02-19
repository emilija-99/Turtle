import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {title} from '../assets/global_cases.js'
import {AnywhereUiModule} from '@anywhere-ui/angular'
import { HeaderComponent } from './components/header/header.component.js';
import { HabitsComponent } from './pages/habits/habits.component.js';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnywhereUiModule, HeaderComponent, HabitsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {ngSkipHydration: 'true'},
})


export class AppComponent {
  title = title;
  

}
