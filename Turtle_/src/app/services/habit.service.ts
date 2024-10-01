import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HabitObject } from '../pages/habits/habit';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  });
  private apiURL = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) {} // Ensure HttpClient is correctly injected

  getAllHabits(): Observable<HabitObject[]> {
    return this.http.get<HabitObject[]>(`${this.apiURL}/allHabits`);
  }

  getProgressHabit(id: number): Observable<any> {
    return this.http.get<number[]>(`${this.apiURL}/getProgress/${id}`);
  }

  postHabit(name: string): Observable<any> {
    const options = {
      headers: this.httpHeaders,
    };

    return this.http.post(
      `${this.apiURL}/createHabit`,
      { name: name },
      options,
    );
  }
}
