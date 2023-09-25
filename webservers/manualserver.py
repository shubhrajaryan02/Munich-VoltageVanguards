from flask import Flask, Response, request, jsonify
from picarx import Picarx  # Replace with the actual module name and import
import io
import picamera
import threading
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
picar = Picarx()  # Instantiate the PiCar-X object

# Global variables for speed and angle
global_speed = 0
global_angle = 0
# Offset to be added to global_angle
angle_offset = 2
# Helper function to set speed and angle and control the PiCar-X
def set_speed_and_angle(speed, angle, action):
    angle +=angle_offset
    picar.set_dir_servo_angle(angle)
    if speed >= 0:
        picar.forward(speed)
    else:
        picar.backward(-speed)
    print(f"{action}: Speed = {speed}, Angle = {angle}")

# API endpoint to move the PiCar-X forward
@app.route('/api/forward', methods=['POST','OPTIONS'])
def move_forward():
    global global_angle
    global_angle = angle_offset
    global global_speed
    global_speed = min(global_speed + 5, 100)  # Increase speed by 5, max at 100 (forward)
    set_speed_and_angle(global_speed, global_angle, "FORWARD")
    
    return jsonify({'message': f'PiCar-X moving forward at speed {global_speed}'})

# API endpoint to move the PiCar-X backward
@app.route('/api/backward', methods=['POST','OPTIONS'])
def move_backward():
    global global_angle
    global_angle = angle_offset
    global global_speed
    global_speed = max(global_speed - 5, -100)  # Decrease speed by 5, min at -100 (backward)
    set_speed_and_angle(global_speed, global_angle, "BACKWARD")
    
    return jsonify({'message': f'PiCar-X moving backward at speed {global_speed}'})


# API endpoint to turn the PiCar-X left
@app.route('/api/turn_left', methods=['POST','OPTIONS'])
def turn_left():
    global global_angle
    global_angle = max(global_angle - 5, -35)  # Decrease angle by 5 degrees, min at -35
    set_speed_and_angle(global_speed, global_angle, "LEFT")
    
    return jsonify({'message': f'PiCar-X turning left at angle {global_angle}'})

# API endpoint to turn the PiCar-X right
@app.route('/api/turn_right', methods=['POST','OPTIONS'])
def turn_right():
    global global_angle
    global_angle = min(global_angle + 5, 35)  # Increase angle by 5 degrees, max at 35
    set_speed_and_angle(global_speed, global_angle, "RIGHT")
   
    return jsonify({'message': f'PiCar-X turning right at angle {global_angle}'})

@app.route('/api/stop', methods=['POST','OPTIONS'])
def stop():
    picar.set_dir_servo_angle(angle_offset)
    global global_angle
    global_angle = angle_offset
    picar.stop()
    print("STOP")
    return jsonify({'message': f'PiCar-X stopped'})

# Handle CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

 
if __name__ == '__main__':
    print("manual server ON")
    
    
app.run(host='0.0.0.0', port=5002)  


