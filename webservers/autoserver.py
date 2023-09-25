import threading
import time
from flask import Flask, Response, request, jsonify
from picarx import Picarx  # Replace with the actual module name and import
import io
import picamera
from flask_cors import CORS
import logging
app = Flask(__name__)


# API endpoint to start auto mode
@app.route('/api/auto', methods=['POST', 'GET', 'OPTIONS'])
def start_auto_mode():
    # Send an immediate response to the client
    response = {'message': 'Auto mode started'}
    
    # Create a thread to run the time-consuming function
    t = threading.Thread(target=run_autonomous)
    t.start()
    
    return jsonify(response)


logger = logging.getLogger()
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s |  %(levelname)s | %(message)s')

file_handler = logging.FileHandler('logs' + time.strftime("%d%H%M%S") + '.log')
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)

logger.info('This is a log message!')
logger.error('This is an error message.')

startTime = 0
elapsedTime = 0
stopTime = 0
firstStartFlag = True

app = Flask(__name__)
CORS(app)
picar = Picarx()  # Instantiate the PiCar-X object

# Global variables for speed and angle
global_speed = 0
global_angle = 0
# Offset to be added to global_angle
angle_offset = 0

List = [
    ['FORWARD', 200, 4, 0],
    ['RIGHT', 200, 9, 1.638500576],
    ['RIGHT', 200, 14, 2.0725836753845215],
    ['RIGHT', 200, 19, 2.350529909133911],
    ['FORWARD', 200, 4, 3.5228655338287354],
    ['RIGHT', 200, 9, 3.8977537155151367],
    ['RIGHT', 200, 14, 4.2175633907318115],
    ['LEFT', 200, 9, 4.5333943367004395],
    ['LEFT', 200, 4, 4.740665912628174],
    ['LEFT', 200, -1, 4.955533266067505],
    ['LEFT', 200, -6, 5.09447455406189],
    ['LEFT', 200, -11, 5.2309770584106445],
    ['LEFT', 200, -16, 5.420860528945923],
    ['FORWARD', 200, 4, 6.363924741744995],
    ['LEFT', 200, -1, 6.594829082489014],
    ['LEFT', 200, -6, 6.749771356582642],
    ['LEFT', 200, -11, 6.916523694992065],
    ['FORWARD', 200, 4, 7.372862339019775],
    ['LEFT', 200, -1, 7.7484095096588135],
    ['LEFT', 200, -6, 7.988248825073242],
    ['LEFT', 200, -11, 8.162100076675415],
    ['FORWARD', 200, 4, 8.846972465515137],
    ['LEFT', 200, -1, 9.194438934326172],
    ['LEFT', 200, -6, 9.401432037353516],
    ['LEFT', 200, -11, 9.580974102020264],
    ['FORWARD', 200, 4, 10.47228741645813],
    ['LEFT', 200, -1, 10.692201614379883],
    ['LEFT', 200, -6, 10.865972995758057],
    ['LEFT', 200, -11, 11.245692253112793],
    ['LEFT', 200, -16, 11.352103242874146],
    ['FORWARD', 200, 4, 12.16569447517395],

    ['RIGHT', 200, 9, 14.050000001494751],

    ['RIGHT', 200, 14, 14.3574658203125],
    ['RIGHT', 200, 19, 14.422383403778076],
    ['RIGHT', 200, 24, 14.56002836227417],
    ['FORWARD', 200, 4, 15.368807077407837],

    ['LEFT', 200, -1, 16.321584606170654],
    ['LEFT', 200, -6, 16.622040462493896],
    ['STOP', 0, 0, 18.000]
    ]

def run_autonomous():
    global startTime
    global elapsedTime

    listIncr = 0

    while (List[listIncr][0] != "STOP"):
        run_action(List[listIncr][0], List[listIncr][1], List[listIncr][2])
        listIncr += 1
        actionTime = (List[listIncr][3] - List[listIncr-1][3]) 
        time.sleep(actionTime)

    run_action(List[listIncr][0], List[listIncr][1], List[listIncr][2])
 

# Helper function to set speed and angle and control the PiCar-X
def set_speed_and_angle(speed, angle, action):
    global startTime
    global elapsedTime
    global stopTime
    global firstStartFlag
    angle += angle_offset
    picar.set_dir_servo_angle(angle)
    if speed >= 0:
        picar.forward(speed)
    else:
        picar.backward(-speed)

    if action == "FORWARD":
        if firstStartFlag == True:
            startTime = time.time()
            firstStartFlag = False
            print("START")
            print(f"{action}: Speed = {speed}, Angle = {angle}, StartTime = {startTime - startTime}")
            #logger.info(f"{action}: Speed = {speed}, Angle = {angle}, StartTime = {startTime - startTime}")
        else:
            elapsedTime = time.time()
            print(f"{action}: Speed = {speed}, Angle = {angle}, ElapsedTime = {elapsedTime - startTime}")
            #logger.info(f"{action}: Speed = {speed}, Angle = {angle}, ElapsedTime = {elapsedTime - startTime}")
    elif action == "RIGHT":
        elapsedTime = time.time()
        print(f"{action}: Speed = {speed}, Angle = {angle}, ElapsedTime = {elapsedTime - startTime}")
        #logger.info(f"{action}: Speed = {speed}, Angle = {angle}, ElapsedTime = {elapsedTime - startTime}")
    elif action == "LEFT":
        elapsedTime = time.time()
        print(f"{action}: Speed = {speed}, Angle = {angle}, ElapsedTime = {elapsedTime - startTime}")
        #logger.info(f"{action}: Speed = {speed}, Angle = {angle}, ElapsedTime = {elapsedTime - startTime}")
    elif action == "BACKWARD":
        elapsedTime = time.time()
        print(f"{action}: Speed = {speed}, Angle = {angle}, ElapsedTime = {elapsedTime - startTime}")
        #logger.info(f"{action}: Speed = {speed}, Angle = {angle}, ElapsedTime = {elapsedTime - startTime}")
    elif action == "STOP":
        stopTime = time.time()
        print(f"{action}: Speed = {speed}, Angle = {angle}, StopTime = {stopTime - startTime}")
        #logger.info(f"{action}: Speed = {speed}, Angle = {angle}, StopTime = {stopTime - startTime}")

def run_action(action, speed, angle):
    if action == "FORWARD":
        move_forward_A(speed, angle)
    elif action == "RIGHT":
        turn_right_A(speed, angle)
    elif action == "LEFT":
        turn_left_A(speed, angle)
    elif action == "BACKWARD":
        move_backward_A(speed, angle)
    elif action == "STOP":
        stop_A(speed, angle)

def move_forward_A(speed, angle):
    set_speed_and_angle(speed, angle, "FORWARD")

def turn_right_A(speed, angle):
    set_speed_and_angle(speed, angle, "RIGHT")

def turn_left_A(speed, angle):
    set_speed_and_angle(speed, angle, "LEFT")

def move_backward_A(speed, angle):
    set_speed_and_angle(speed, angle, "BACKWARD")

def stop_A(speed, angle):
    set_speed_and_angle(speed, angle, "STOP")

# Handle CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response



if __name__ == '__main__':
    print("auto server started")
    
    
app.run(host='0.0.0.0', port=5003)


