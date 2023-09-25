import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { apiURL , cameraURL} from '../api-data';
import { SharedDataService } from 'src/app/shared-data.service';
import { interval } from 'rxjs'; // Import the interval function from RxJS

@Component({
  selector: 'app-sales-ratio',
  templateUrl: './sales-ratio.component.html'
})
export class SalesRatioComponent implements OnInit {

  streamUrl = cameraURL +"/api/video"; // Replace with your actual stream URL
  
  isStreamLive: boolean = false; // Initialize as false, assuming the stream is not live by default
  isDisconnected: boolean = true;


  constructor(public sharedDataService: SharedDataService) {}
  
  ngOnInit(): void {
    // Subscribe to the connectionStatus$ observable
    this.sharedDataService.connectionStatus$.subscribe((status) => {
      // Update isStreamLive based on the new status
      this.checkStreamStatusBasedOnSharedVariable(status);
    });
  }

  // Function to check the stream status based on the shared variable
  checkStreamStatusBasedOnSharedVariable(connectionStatus: boolean) {
    if (connectionStatus) {
      // Implement your logic to check the stream status here
      // For example, make an HTTP request or use another method
      // Set this.isStreamLive to true if the stream is live, or false otherwise
      // Example:
      this.isStreamLive = true; // Set to true if the stream is live
    } else {
      this.isStreamLive = false; // Set to false if the connection status is false
    }
  }

}
