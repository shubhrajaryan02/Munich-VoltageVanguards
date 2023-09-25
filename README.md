# Linkt to video run https://drive.google.com/file/d/1dSqnbqDWTWNuOTQh5f_Pd5zb3IUqVHd5/view?usp=drive_link
# Introduction 
This project focuses on providing a user-friendly interface to control the PiCar-X robot remotely. It includes a manual control feature for real-time movement, a live camera feed for monitoring the surroundings, and an automated mode for autonomous driving. The UI is built using Angular, ensuring a modern and intuitive experience.


## Features

- **Manual Control**: Control the PiCar-X robot in real-time using a responsive and intuitive interface.
- **Live Camera Feed**: Stream live video from the PiCar-X's camera, providing visual feedback of the robot's perspective.
- **Automated Mode**: Enable autonomous driving, allowing the PiCar-X to follow a predefined path or navigate with obstacle avoidance.
- **User-Friendly Interface**: The UI is designed to be easy to use and navigate, making robot control accessible to all users.

# Getting Started

Install Python 3.x and all the prerequisites present in requirments.txt file

### Prerequisites

- Python 3.x
- Node.js and npm: Ensure you have Node.js and npm (Node Package Manager) installed on your machine.
- Ensure you have the necessary libraries installed. If not, install them using:

    ```bash
    pip3 install -r requirements.txt
    ```

     ```bash
    npm install
    ```

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://dev.azure.com/erniegh/ERNI-SmartFactory/_git/7a8fbf1f-c112-4533-8021-ebae5e1219ce?path=%2F&version=GBdevelop&_a=contents

    ```
    
    ``` bash
    cd <repository_directory>
    ```




# Exposing the Application via ngrok

To expose the application running on your local server to the public internet, you can use ngrok. Ngrok creates secure tunnels to your localhost and allows you to share the application externally.

1. Install Ngrok: If you haven't installed ngrok, you can download it from ngrok website. Follow the       installation instructions for your operating system.

2. Expose the APIs:

To expose the API server for the manual control interface, run:


    ```bash
    ngrok http 5001

    ```
    ```bash
    ngrok http 5002

    ```
    ```bash
    ngrok http 5003

    ```
3. Accessing the Exposed APIs:

After running the ngrok command, it will provide a public URL (e.g., http://your-ngrok-subdomain.ngrok.io). You can use this URL to access the application from anywhere.


# How to run the web servers 



1. Run the backeend servers using Python:

    ```bash
    python3 manualserver.py
    python3 cameraserver.py
    python3 autoserver.py

    ```

2. Run the UI

```bash
    ng serve --port <port_number>
```


# Accessing the UI
1)Pre-requisite: install angular and npm on machine
2) run "npm install" from terminal  to install alll dependencies in node_modules, all dependencies needed for this UI are already defined in package.json file
3) run ng serve --open <port>
4) the UI is now online
Once the Angular server is running, you can access the UI by navigating to http://localhost:<port_number> in your web browser.


# Very very important about code file names:
1) Since the UI is using a template from web, the names of components in code are not matching real meaning.
2) top-cards is actually topcards, feeds is the car controls
3) sales-ratio is the Picamera feed
4) a file named "api-data.ts" has all url which need to be replaced with URL of web servers..Since we are using ngrok, once the three web servers are online, copy their urls in here and the dashboard should be able to 
communicate to web servers and finally to Picar.
In order to access it from outside the network, we need to do ngrok on the UI as well
# UI features

## Automated Mode
The automated mode allows the PiCar-X to drive autonomously based on predefined paths or obstacle avoidance algorithms. This mode can be activated within the UI, providing a convenient way to let the PiCar-X navigate without manual control.


## Manual Mode with Live Camera Integration

The manual mode allows users to have direct control over the PiCar-X robot, enabling movements such as turning left, turning right, moving forward, moving backward, and stopping. The UI provides intuitive controls for these actions.

### Controlling the PiCar-X

- **Turn Left**: Steer the PiCar-X to the left to change its direction.
- **Turn Right**: Steer the PiCar-X to the right to change its direction.
- **Move Forward**: Drive the PiCar-X in the forward direction.
- **Move Backward**: Drive the PiCar-X in the backward direction.
- **Stop**: Halt the PiCar-X's movement, bringing it to a complete stop.

### Live Camera Integration

The manual control interface is enhanced by integrating a live camera feed from the PiCar-X. This live video stream provides real-time visual feedback to the user, allowing for better control and navigation of the robot.

The camera feed is displayed within the UI, giving the user a view of the surroundings as seen by the PiCar-X. This integration enhances the manual mode, enabling more precise control and safer maneuvering of the robot.

The combination of manual control options and the live camera feed ensures a comprehensive and immersive experience for users, making the PiCar-X robot easy to control and navigate in real-time.


# PiCar-X Unit Tests

This project contains unit tests for the PiCar-X APIs.

2. Navigate to the server directory:

    ```bash
    cd src
    ```

   The server will start, and you can now access the PiCar-X APIs.

## Running the Unit Tests

To run the unit tests for the PiCar-X Manual Server APIs, use the `unittest` framework:

1. Navigate to the `test/` directory:

    ```bash
    cd test
    ```

2. Run the tests using the following command:

    ```bash
    python3 -m unittest manualserver_test.py
    python3 -m unittest cameraserver_test.py
    python3 -m unittest autoserver_test.py
    python3 -m unittest controller_test.py

    ```

   The tests will run, and you'll see the results for each test case.

## Test Cases

- `test_move_forward`: Tests the API endpoint to move PiCar-X forward.
- `test_move_backward`: Tests the API endpoint to move PiCar-X backward.
- `test_turn_left`: Tests the API endpoint to turn PiCar-X left.
- `test_turn_right`: Tests the API endpoint to turn PiCar-X right.
- `test_stop`: Tests the API endpoint to stop PiCar-X.

## Authors


