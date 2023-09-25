import { Component, OnInit, Input, HostListener } from '@angular/core';
import { topcards } from '../top-cards/top-cards-data';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';
import { apiURL, autoControl, manualControlURL } from '../api-data';
import { SharedDataService } from 'src/app/shared-data.service';
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feed.component.scss'] // Include your SCSS file here
})
export class FeedsComponent implements OnInit {
  @Input() autonomousMode!: boolean;
  constructor(private http: HttpClient, public sharedDataService:SharedDataService) { } // Inject HttpClient


  ngOnInit(): void { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200', // Specify the allowed origin
      // Other CORS-related headers as needed
    })
  };
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.move('Up');
        break;
      case 'ArrowLeft':
        this.move('Left');
        break;
      case 'ArrowDown':
        this.move('Down');
        break;
      case 'ArrowRight':
        this.move('Right');
        break;
      case 's': // Added 's' key for stopping
        this.move('Stop'); // Call the stop method when 's' is pressed
        break;
      default:
        // Handle any other key events if needed
        break;
    }
  }

  move(direction: string): void {
    // Implement your logic here based on the direction parameter
    switch (direction) {
      case 'Up':
        console.log('Up button pressed');
        this.sendHttpPostRequest("/api/forward");
        // Handle Up button click
        break;
      case 'Left':
        console.log('Left button pressed');
        this.sendHttpPostRequest("/api/turn_left");
        // Handle Left button click
        break;
      case 'Down':
        console.log('Down button pressed');
        this.sendHttpPostRequest("/api/backward");
        // Handle Down button click
        break;
      case 'Right':
        console.log('Right button pressed');
        this.sendHttpPostRequest("/api/turn_right");
        // Handle Right button click
        break;
      case 'Stop':
        console.log('Stop button pressed');
        this.sendHttpPostRequest("/api/stop");
        break;
      default:
        // Handle any other cases or errors
        break;
    }
  }
  sendHttpPostRequest(direction: string): void {
    const apiUrl = manualControlURL + direction;
    const requestBody = { direction: direction };

    // Use an observer to handle the HTTP request
    const observer: Observable<Object> = this.http.post(apiUrl, requestBody, this.httpOptions);

    observer.subscribe({
      next: (response) => {
        console.log('HTTP POST request success', response);
        // Handle the response if needed
      },
      error: (error) => {
        console.error('HTTP POST request error', error);
        // Handle the error if needed
      }
    });
  }

  sendAutoModeRequest(mode: string): void {
    const apiUrl = autoControl + mode;
    const requestBody = { direction: mode };

    // Use an observer to handle the HTTP request
    const observer: Observable<Object> = this.http.post(apiUrl, requestBody, this.httpOptions);

    observer.subscribe({
      next: (response) => {
        console.log('HTTP POST request success', response);
        // Handle the response if needed
      },
      error: (error) => {
        console.error('HTTP POST request error', error);
        // Handle the error if needed
      }
    });
  }

  startTimer() {
    this.sharedDataService.startTimer();
    this.sendAutoModeRequest("/api/start_auto_mode");
  }

  stopTimer() {
    this.sharedDataService.stopTimer();
    this.sendHttpPostRequest("/api/stop");

  }

  resetTimer() {
    this.sharedDataService.resetTimer();
  }
}

// import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
// import { topcards } from '../top-cards/top-cards-data';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, Subscription, interval } from 'rxjs';
// import { apiURL } from '../api-data';
// @Component({
//   selector: 'app-feeds',
//   templateUrl: './feeds.component.html'
// })
// export class FeedsComponent implements OnInit, OnDestroy {
//   @Input() autonomousMode!: boolean;
//   private keyHoldTimer: Subscription | undefined;
//   private directionBeingHeld: string | undefined;

//   constructor(private http: HttpClient) { }
  
//   //url = "https://6177-62-245-145-86.ngrok.io";
  
//   ngOnInit(): void { }

//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': 'http://localhost:4200',
//     })
//   };

//   @HostListener('document:keydown', ['$event'])
//   handleKeyDown(event: KeyboardEvent): void {
//     //console.log('Key down event:', event.key);
//     if (this.directionBeingHeld) {
//       // A key is already being held down, ignore this event
//       return;
//     }

//     switch (event.key) {
//       case 'ArrowUp':
//       case 'ArrowLeft':
//       case 'ArrowDown':
//       case 'ArrowRight':
//         this.startKeyHold(event.key);
//         break;
//       case 's':
//         this.move('Stop');
//         break;
//       default:
//         // Handle any other key events if needed
//         break;
//     }
//   }

//   @HostListener('document:keyup', ['$event'])
//   handleKeyUp(event: KeyboardEvent): void {
//     //console.log('Key up event:', event.key);
//     switch (event.key) {
//       case 'ArrowUp':
//       case 'ArrowLeft':
//       case 'ArrowDown':
//       case 'ArrowRight':
//         this.stopKeyHold();
//         break;
//       default:
//         // Handle any other key events if needed
//         break;
//     }
//   }

//   startKeyHold(direction: string): void {
//     this.directionBeingHeld = direction;
//     this.keyHoldTimer = interval(500).subscribe(() => {
//       this.move(direction);
//     });
//   }

//   stopKeyHold(): void {
//     if (this.keyHoldTimer) {
//       this.keyHoldTimer.unsubscribe();
//     }
//     this.directionBeingHeld = undefined;
//   }

//   move(direction: string): void {
//     // Implement your logic here based on the direction parameter
//     switch (direction) {
//       case 'Up':
//         console.log('Up button pressed');
//         this.sendHttpPostRequest("/api/forward");
//         break;
//       case 'Left':
//         console.log('Left button pressed');
//         this.sendHttpPostRequest("/api/turn_left");
//         break;
//       case 'Down':
//         console.log('Down button pressed');
//         this.sendHttpPostRequest("/api/backward");
//         break;
//       case 'Right':
//         console.log('Right button pressed');
//         this.sendHttpPostRequest("/api/turn_right");
//         break;
//       case 'Stop':
//         console.log('Stop button pressed');
//         this.sendHttpPostRequest("/api/stop");
//         break;
//       default:
//         // Handle any other cases or errors
//         break;
//     }
//   }

//   sendHttpPostRequest(direction: string): void {
//     const apiUrl = apiURL + direction;
//     const requestBody = { direction: direction };

//     const observer: Observable<Object> = this.http.post(apiUrl, requestBody, this.httpOptions);

//     observer.subscribe({
//       next: (response) => {
//         console.log('HTTP POST request success', response);
//       },
//       error: (error) => {
//         console.error('HTTP POST request error', error);
//       }
//     });
//   }

//   ngOnDestroy(): void {
//     this.stopKeyHold();
//   }
// }
