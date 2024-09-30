import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HabitObject } from '../pages/habits/habit';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  private apiURL_AllHabits = 'http://localhost:5000/api/allHabits';
  private apiURL_progressForHabitID = "http://localhost:5000/api/"

  constructor(private http: HttpClient) {} // Ensure HttpClient is correctly injected

  getAllHabits(): Observable<HabitObject[]> {
    return this.http.get<HabitObject[]>(this.apiURL_AllHabits);
  }

  getProgressHabit(id:any):Observable<any>{
    return this.http.get<any[]>(this.apiURL_progressForHabitID);
  }
}
