import sys
import os
import unittest
from unittest.mock import patch, MagicMock

# Add the path to the src/ folder
sys.path.append(os.path.join(os.path.dirname(__file__), '../webservers'))

from webservers.manualserver import app

class TestManualServer(unittest.TestCase):
    def setUp(self):
        app.testing = True
        self.client = app.test_client()

    def test_move_forward(self):
        response = self.client.post('/api/forward')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIn('PiCar-X moving forward', data['message'])

    def test_move_backward(self):
        response = self.client.post('/api/backward')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIn('PiCar-X moving backward', data['message'])

    def test_turn_left(self):
        response = self.client.post('/api/turn_left')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIn('PiCar-X turning left', data['message'])

    def test_turn_right(self):
        response = self.client.post('/api/turn_right')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIn('PiCar-X turning right', data['message'])

    def test_stop(self):
        response = self.client.post('/api/stop')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIn('PiCar-X stopped', data['message'])

    # Add more test cases as needed

if __name__ == '__main__':
    unittest.main()
