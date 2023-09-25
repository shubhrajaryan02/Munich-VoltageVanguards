import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // Use BehaviorSubject to track the connection status
  private _connectionStatus = new BehaviorSubject<boolean>(false);
  private _sharedAutonomousMode = new BehaviorSubject<boolean>(false);

  // Expose the connection status as an observable
  connectionStatus$ = this._connectionStatus.asObservable();
  automode$ = this._sharedAutonomousMode.asObservable();


  // timer code
  private timer$: Observable<number>;
  private timerSource = new BehaviorSubject<number>(0);
  private timerRunning = false;
  private timerInterval: any;
  private elapsedTime = 0;

  // Setter method to update the connection status
  setConnectionStatus(status: boolean) {
    this._connectionStatus.next(status);
  }
  public setAutoMode(mode: boolean)
  {
    this._sharedAutonomousMode.next(mode)
  }
  constructor() {
    this.timer$ = this.timerSource.asObservable();
  }

  startTimer() {
    if (!this.timerRunning) {
      this.timerRunning = true;
      this.timerInterval = interval(1000).subscribe(() => {
        this.elapsedTime++;
        this.timerSource.next(this.elapsedTime);
      });
    }
  }

  stopTimer() {
    if (this.timerRunning) {
      this.timerRunning = false;
      this.timerInterval.unsubscribe();
    }
  }

  resetTimer() {
    this.elapsedTime = 0;
    this.timerSource.next(0);
  }

  getTimerValue(): Observable<number> {
    return this.timer$;
  }
}
