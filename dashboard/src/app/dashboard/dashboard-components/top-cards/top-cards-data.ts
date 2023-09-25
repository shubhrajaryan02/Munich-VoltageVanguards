export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string,
    isConnected:boolean;
    autonomousMode: boolean; // Add autonomousMode property,
    elapsedTime: string; // Add elapsedTime property for stopwatch
    batteryLevel: number; // Add batteryLevel property
    extra: string
}

export const topcards: topcard[] = [

    
    {
        bgcolor: 'light', // Initial color for the button
        icon: 'bi bi-camera-video', // You can adjust the icon as needed
        title: 'Camera Feed',
        subtitle: 'Disconnected',
        isConnected: false,
        autonomousMode: false, // Add autonomousMode property,
        elapsedTime: "", // Add elapsedTime property for stopwatch,
        batteryLevel: 0, // Initialize batteryLevel to 0
        extra :"Click + to Connect"
    },
    {
        bgcolor: 'primary', // Change the color to 'primary' for the toggle button
        icon: 'bi bi-toggle-on', // You can adjust the icon as needed
        title: 'Driving Mode', // Change the title to 'Driving Mode'
        subtitle: 'Device Status: OFFLINE', // Initial subtitle
        isConnected: true, // You can set this to true if it's connected
        autonomousMode: false, // Set autonomousMode to false initially
        elapsedTime: "" ,// Add elapsedTime property for stopwatch
        batteryLevel: 0, // Initialize batteryLevel to 0,
        extra :""
    },
    {
      bgcolor: 'info',
      icon: 'bi bi-stopwatch',
      title: 'Stopwatch',
      subtitle: 'Device Status: OFFLINE',
      isConnected: false,
      autonomousMode: false,
      elapsedTime: "" ,// Add elapsedTime property for stopwatch
      batteryLevel: 0, // Initialize batteryLevel to 0,
      extra :""
    },
    {
      bgcolor: 'success', // Change the color as needed
      icon: 'bi bi-battery-full', // Add a battery icon
      title: 'Power State',
      subtitle: 'Device Status: OFFLINE', // Initialize the subtitle
      isConnected: false,
      autonomousMode: false,
      elapsedTime: "" ,// Add elapsedTime property for stopwatch
      batteryLevel: 0, // Initialize batteryLevel to 0
      extra :""
    }

] 