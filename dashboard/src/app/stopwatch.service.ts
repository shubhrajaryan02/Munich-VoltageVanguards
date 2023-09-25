// stopwatch.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
  constructor(private http: HttpClient) {}

  startStopwatch(): Observable<any> {
    return this.http.post('http://your-server/start-stopwatch', {});
  }

  stopStopwatch(): Observable<any> {
    return this.http.post('http://your-server/stop-stopwatch', {});
  }
}
