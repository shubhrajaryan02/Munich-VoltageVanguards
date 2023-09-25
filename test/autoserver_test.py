import unittest
from unittest.mock import MagicMock, patch
from webservers.autoserver import app

class TestAutoModeAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_start_auto_mode(self):
        with patch('app.threading.Thread') as mock_thread:
            response = self.app.post('/api/auto')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, {'message': 'Auto mode started'})
            mock_thread.assert_called_once_with(target=app.run_automode)
            mock_thread().start.assert_called_once()

if __name__ == '__main__':
    unittest.main()
