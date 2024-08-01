import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HabitObject } from '../pages/habits/habit';
@Injectable({
  providedIn: 'root'
})
export class HabitService {

  private apiUrlAllHabits = 'http://localhost:5000/api/allHabits';

  constructor(
    private http:HttpClient
  ) { }

  getAllHabits():Observable<HabitObject[]>{
    return this.http.get<HabitObject[]>(this.apiUrlAllHabits);
  }
}
