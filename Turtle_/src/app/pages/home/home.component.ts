import { Component } from '@angular/core';
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ProgressBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

}
