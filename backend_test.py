import requests
import sys
import json
import os
from datetime import datetime
from io import BytesIO

# Get the backend URL from environment
BACKEND_URL = "https://design-studio-3d-4.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.failures = []

    def run_test(self, name, test_func):
        """Run a single test and track results"""
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            success = test_func()
            if success:
                self.tests_passed += 1
                print(f"✅ {name} - PASSED")
                return True
            else:
                print(f"❌ {name} - FAILED")
                self.failures.append(name)
                return False
        except Exception as e:
            print(f"❌ {name} - ERROR: {str(e)}")
            self.failures.append(f"{name}: {str(e)}")
            return False

    def test_api_health(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                return data.get("message") == "Hello World"
            return False
        except Exception as e:
            print(f"API Health check failed: {e}")
            return False

    def test_contact_post_valid_data(self):
        """Test POST /api/contact with valid data (no file)"""
        try:
            data = {
                'name': 'Test Usuario',
                'email': 'test@ejemplo.com',
                'phone': '+1234567890',
                'service_type': 'arquitectura',
                'message': 'Este es un mensaje de prueba para validar el formulario de contacto.'
            }
            
            response = requests.post(f"{API_BASE}/contact", data=data, timeout=15)
            
            if response.status_code == 200:
                result = response.json()
                # Verify response contains required fields
                required_fields = ['id', 'name', 'email', 'service_type', 'message', 'created_at', 'status']
                return all(field in result for field in required_fields)
            else:
                print(f"POST contact failed with status: {response.status_code}")
                print(f"Response: {response.text}")
                return False
        except Exception as e:
            print(f"Contact POST test failed: {e}")
            return False

    def test_contact_post_with_file(self):
        """Test POST /api/contact with file upload"""
        try:
            # Create a fake STL file content
            fake_stl_content = b"""solid Test
  facet normal 0.0 0.0 1.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 1.0 0.0 0.0
      vertex 0.0 1.0 0.0
    endloop
  endfacet
endsolid Test"""
            
            data = {
                'name': 'Test Usuario File',
                'email': 'testfile@ejemplo.com', 
                'service_type': 'diseno-interior',
                'message': 'Testing file upload functionality'
            }
            
            files = {'file': ('test_model.stl', BytesIO(fake_stl_content), 'application/octet-stream')}
            
            response = requests.post(f"{API_BASE}/contact", data=data, files=files, timeout=15)
            
            if response.status_code == 200:
                result = response.json()
                return 'id' in result and result.get('name') == 'Test Usuario File'
            else:
                print(f"POST contact with file failed with status: {response.status_code}")
                print(f"Response: {response.text}")
                return False
        except Exception as e:
            print(f"Contact POST with file test failed: {e}")
            return False

    def test_contact_post_invalid_file_type(self):
        """Test POST /api/contact with invalid file type should fail"""
        try:
            fake_file_content = b"This is not a valid 3D file"
            
            data = {
                'name': 'Test Invalid File',
                'email': 'invalid@ejemplo.com',
                'service_type': 'arquitectura',
                'message': 'Testing invalid file type'
            }
            
            files = {'file': ('test.txt', BytesIO(fake_file_content), 'text/plain')}
            
            response = requests.post(f"{API_BASE}/contact", data=data, files=files, timeout=15)
            
            # Should return 400 for invalid file type
            return response.status_code == 400
        except Exception as e:
            print(f"Invalid file type test failed: {e}")
            return False

    def test_contact_post_missing_required_fields(self):
        """Test POST /api/contact with missing required fields"""
        try:
            # Missing name, email, service_type, and message
            data = {
                'phone': '+1234567890'
            }
            
            response = requests.post(f"{API_BASE}/contact", data=data, timeout=15)
            
            # Should return 422 for missing required fields
            return response.status_code == 422
        except Exception as e:
            print(f"Missing fields test failed: {e}")
            return False

    def test_contact_get_submissions(self):
        """Test GET /api/contact to retrieve submissions"""
        try:
            response = requests.get(f"{API_BASE}/contact", timeout=10)
            
            if response.status_code == 200:
                submissions = response.json()
                # Should return a list
                return isinstance(submissions, list)
            else:
                print(f"GET contact failed with status: {response.status_code}")
                return False
        except Exception as e:
            print(f"GET submissions test failed: {e}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend API Tests...")
        print("=" * 50)
        
        # Test API connectivity first
        if not self.run_test("API Health Check", self.test_api_health):
            print("❌ API is not accessible. Stopping tests.")
            return False
        
        # Test contact form endpoints
        self.run_test("Contact Form - Valid Data", self.test_contact_post_valid_data)
        self.run_test("Contact Form - With File Upload", self.test_contact_post_with_file)
        self.run_test("Contact Form - Invalid File Type", self.test_contact_post_invalid_file_type)
        self.run_test("Contact Form - Missing Required Fields", self.test_contact_post_missing_required_fields)
        self.run_test("Get Contact Submissions", self.test_contact_get_submissions)
        
        # Print results
        print("\n" + "=" * 50)
        print(f"📊 Backend Test Results:")
        print(f"✅ Tests Passed: {self.tests_passed}/{self.tests_run}")
        print(f"❌ Tests Failed: {len(self.failures)}")
        
        if self.failures:
            print("\n🚨 Failed Tests:")
            for failure in self.failures:
                print(f"  • {failure}")
        
        return len(self.failures) == 0

def main():
    tester = BackendTester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())