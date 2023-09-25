import { Component, OnInit } from '@angular/core';
import { topcard, topcards } from './top-cards-data';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
import { Observable } from 'rxjs'; // Import the Observable class
import { HttpHeaders } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { StopwatchService } from 'src/app/stopwatch.service';
import { apiURL } from '../api-data';
import { SharedDataService } from 'src/app/shared-data.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
  styleUrls:['./top-cards.component.scss']
})
export class TopCardsComponent implements OnInit {

  topcards: topcard[];
  connectionStatusColor = 'disconnected-button';
  connectionStatus: string = 'Disconnected'; // Initial color
  parentautonomousMode: boolean = false; // Define parentautonomousMode property
  stopwatchInterval: any;
  elapsedTime: number = 0;
  private isStopwatchRunning: boolean = false;
  isDisconnected: boolean = true; //
  timervale = 0
  connectionLabel:string = ""

  constructor(private http: HttpClient, private stopwatchService: StopwatchService, public sharedDataService: SharedDataService) { // Inject the HttpClient module
    this.topcards = topcards;
  }

  ngOnInit(): void {
    // Start the stopwatch when the component initializes (if needed)
    
    // Set parentautonomousMode based on your logic
    this.parentautonomousMode = false;
    this.topcards[0].extra = "Click + to Connect"
    this.sharedDataService.connectionStatus$.subscribe((status) => {
      // Update isStreamLive based on the new status
      this.checkStreamStatusBasedOnSharedVariable(status);
    });
    
    this.sharedDataService.getTimerValue().subscribe((value) => {
      const formattedTime = this.formatTime(value);
      this.topcards[2].subtitle = `Time Elapsed: ${formattedTime}`;
    });
    

  }
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = this.padZero(minutes);
    const formattedSeconds = this.padZero(remainingSeconds);
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
  
  // Function to check the stream status based on the shared variable
  checkStreamStatusBasedOnSharedVariable(connectionStatus: boolean) {
    // Check the shared variable from your service and update isStreamLive accordingly
    if (connectionStatus) {
      // Implement your logic to check the stream status here
      // For example, make an HTTP request or use another method
      // Set this.isStreamLive to true if the stream is live, or false otherwise
      // Example:
      this.topcards[3].subtitle = "Battery Level: 90%"; // Set to true if the stream is live
      this.topcards[1].subtitle = "Current Mode: MANUAL";
      this.topcards[2].subtitle = "Time Elapsed: 00:00";
      this.setAutonomousModeSubtitle(); // Update subtitle based on autonomous mode
    } else {
      this.sharedDataService.stopTimer();
      this.sharedDataService.resetTimer();
      this.topcards[3].subtitle = "Device Status: OFFLINE";
      this.topcards[1].subtitle = "Device Status: OFFLINE";
      this.topcards[2].subtitle = "Device Status: OFFLINE";
      this.toggleAutonomousModeProgrammatically(false); // Turn off autonomous mode
    }
  }
  // Function to update the subtitle based on the autonomous mode
private setAutonomousModeSubtitle() {
  this.topcards[1].subtitle = this.parentautonomousMode ? 'Current Mode: Autonomous' : 'Current Mode: MANUAL';
}

// Function to toggle autonomous mode programmatically
private toggleAutonomousModeProgrammatically(isAutonomous: boolean) {
  this.parentautonomousMode = isAutonomous;
  this.sharedDataService.setAutoMode(this.parentautonomousMode);
}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    })
  };
  checkConnectionStatus() {
    // const headers = new HttpHeaders().set('X-Status', '1');
    // if (this.connectionStatus === 'Connected') {
    //   // If currently connected, set to Disconnected
    //   this.connectionStatus = 'Disconnected';
    //   this.connectionStatusColor = 'blue'; // Reset color

    // } else {
    //   let statusurl = apiURL + "/api/connect"
    //   // If currently disconnected, try to connect
    //   this.http.post(statusurl, {}, this.httpOptions).subscribe({
    //     next: (response: any) => {
    //       // Parse the JSON response
    //       const responseData = response.body;

    //       if (1) {
    //         // The server responded with 'status' set to 'OK'
    //         this.connectionStatusColor = 'green';
    //         this.connectionStatus = 'Connected';
    //       } else {
    //         this.connectionStatusColor = 'red';
    //         this.connectionStatus = 'Connection 100';
    //       }
    //     },
    //     error: (error) => {
    //       this.connectionStatusColor = 'red';
    //       this.connectionStatus = 'Connection 100';
    //       console.error('HTTP POST Error:', error);
    //     },
    //   });
    // }
    
    if (this.connectionStatus === 'Connected') {
      this.connectionStatus = 'Not Connected';
      //this.parentautonomousMode = true;
      this.connectionStatusColor = 'disconnected-button';
      this.sharedDataService.setConnectionStatus(false);
      this.connectionLabel = ""
      
    
    } else {
      this.connectionStatus = 'Connected';
      this.connectionStatusColor = 'connected-button';
      //this.parentautonomousMode = false;
      this.sharedDataService.setConnectionStatus(true);
      this.connectionLabel = "(To Disconnect, Click again)"
    }
    
  }
  toggleAutonomousMode() {
    this.sharedDataService.setAutoMode(this.parentautonomousMode);

    // Update the subtitle based on the toggle state
    this.topcards[1].subtitle = !this.parentautonomousMode ? 'Current Mode: MANUAL ' : 'Current Mode: Win Hackathon';
  
  }

 

 

  
}


