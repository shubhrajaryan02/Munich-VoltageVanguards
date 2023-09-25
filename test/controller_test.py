import sys
import os

# Add the path to the src/ folder
sys.path.append(os.path.join(os.path.dirname(__file__), '../src'))

import unittest
from src.controller import app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_move_forward(self):
        response = self.app.post('/api/forward')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'PiCar-X moving forward', response.data)

    def test_move_backward(self):
        response = self.app.post('/api/backward')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'PiCar-X moving backward', response.data)

    def test_turn_left(self):
        response = self.app.post('/api/turn_left')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'PiCar-X turning left', response.data)

    def test_turn_right(self):
        response = self.app.post('/api/turn_right')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'PiCar-X turning right', response.data)

    def test_stop(self):
        response = self.app.post('/api/stop')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'PiCar-X stopped', response.data)

if __name__ == '__main__':
    unittest.main()
