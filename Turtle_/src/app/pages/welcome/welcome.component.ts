import { AfterViewInit, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoaderComponent } from "../../components/loader/loader.component";
import { Subscriber, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit, AfterViewInit{
  
  public isLoading:boolean = true;
  private loaderClear:ReturnType<typeof setTimeout> | undefined;
 

  public constructor(
    private router: Router,
  ){}

  ngAfterViewInit(): void {
    console.log("ready!");
    this.loaderClear = setTimeout(() => {
      console.log('loading');
      this.isLoading = false;
    }, 1000);

    console.log("this.isLoadig: ", this.isLoading);
  }
 
  ngOnInit(): void {
    if(this.loaderClear) clearTimeout(this.loaderClear)
  }

  public toHomePage():void{
    var btn_text = document.getElementsByClassName('redirect');
    console.log("btn.text");
    this.router.navigate(['home']);
  }

  

}
