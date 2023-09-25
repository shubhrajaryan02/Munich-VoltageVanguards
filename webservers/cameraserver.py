from flask import Flask, Response, request, jsonify
from picarx import Picarx  # Replace with the actual module name and import
import io
import picamera
import threading
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
picar = Picarx()  # Instantiate the PiCar-X object

# Handle CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


# Create a global variable to store the camera stream
global_frame = None


# Function to capture video frames from the Raspberry Pi camera
def capture_video():
    global global_frame
    with picamera.PiCamera() as camera:
        # Set the camera resolution and frame rate
        camera.resolution = (640, 480)
        camera.framerate = 30

        # Capture video frames continuously
        while True:
            # Create a stream to hold the video data
            stream = io.BytesIO()
            camera.capture(stream, format='jpeg', use_video_port=True)
            stream.seek(0)
            global_frame = stream.read()
            stream.close()

 
@app.route('/api/connect', methods=['POST', 'OPTIONS'])
def handle_post_request():
    
    status_code = 200  # OK status code
    message = 'Connected'

    # Prepare the JSON response with status and message
    response_data = {'status': status_code, 'message': message}

    # Return the JSON response with the status code
    return jsonify(response_data), status_code
# Route for streaming video
@app.route('/api/video', methods=['POST','GET', 'OPTIONS'])
def video():
    def generate():
        while True:
            if global_frame is not None:
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + global_frame + b'\r\n\r\n')

    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

 
if __name__ == '__main__':
    # Start the video capture thread
    video_thread = threading.Thread(target=capture_video)
    video_thread.daemon = True
    video_thread.start()


app.run(host='0.0.0.0', port=5001)  