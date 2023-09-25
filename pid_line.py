from picarx import Picarx
import time

# PID controller constants
Kp = 0.2  # Proportional gain
Ki = 0.01  # Integral gain
Kd = 0.01  # Derivative gain

# Thresholds for deciding left or right turn based on sensor values
LEFT_THRESHOLD = 150  # Adjust this threshold as needed for the left sensor (A0)
RIGHT_THRESHOLD = 150  # Adjust this threshold as needed for the right sensor (A2)

if __name__ == '__main__':
    try:
        print("Initializing the Picarx...")
        px = Picarx()
        max_speed = 50
        px.set_dir_servo_angle(0)

        # Initialize PID variables
        prev_error = 0
        integral = 0

        print("Waiting for 2 seconds...")
        time.sleep(5)  # Wait for 2 seconds

        print("Ready!")

        print("Starting the control loop...")
        while True:
            gm_val_list = px.get_grayscale_data()
            print("gm_val_list:", gm_val_list)

            # Calculate the error as the difference between the desired value (0) and the sensor reading
            error = sum(gm_val_list)
            print("Error:", error)

            # Update the integral and derivative terms
            integral += error
            derivative = error - prev_error

            # Calculate the control signal using PID formula
            control_signal = (Kp * error) + (Ki * integral) + (Kd * derivative)
            print("Control Signal:", control_signal)

            # Update the previous error for the next iteration
            prev_error = error

            # Determine the turn direction based on sensor values
            if gm_val_list[0] < LEFT_THRESHOLD and gm_val_list[2] > RIGHT_THRESHOLD:
                # Turn left
                steering_angle = -30
                print("Turn Left")
            elif gm_val_list[0] > LEFT_THRESHOLD and gm_val_list[2] < RIGHT_THRESHOLD:
                # Turn right
                steering_angle = 30
                print("Turn Right")
            else:
                # Straight
                steering_angle = control_signal
                print("Straight")

            # Limit the steering angle to avoid extreme values
            if steering_angle > 30:
                steering_angle = 30
            elif steering_angle < -30:
                steering_angle = -30

            # Set the direction servo angle
            px.set_dir_servo_angle(steering_angle)

            # Set motor speeds for forward motion
            left_speed = max_speed
            right_speed = max_speed

            # Apply speed adjustments for turns
            if steering_angle < 0:
                # Adjust left motor speed for right turn
                left_speed -= abs(steering_angle)
            elif steering_angle > 0:
                # Adjust right motor speed for left turn
                right_speed -= abs(steering_angle)

            # Set motor speeds
            px.forward(max_speed)
    finally:
        px.stop()
