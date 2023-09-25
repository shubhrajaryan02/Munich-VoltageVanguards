import sys
import os
import unittest
from unittest.mock import patch, MagicMock

# Add the path to the src/ folder
sys.path.append(os.path.join(os.path.dirname(__file__), '../webservers'))

from webservers.cameraserver import app

class TestApp(unittest.TestCase):
    def setUp(self):
        app.testing = True
        self.client = app.test_client()

    def test_video_route(self):
        response = self.client.get('/api/video')
        self.assertEqual(response.status_code, 200)

    # Add more test cases as needed

if __name__ == '__main__':
    unittest.main()
