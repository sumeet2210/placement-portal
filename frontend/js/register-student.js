console.log('register-student.js loaded');
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded fired');
  const form = document.getElementById('studentRegisterForm');
  if (form) {
    console.log('Form found');
    form.addEventListener('submit', async function(e) {
      alert('Form submit event triggered');
      e.preventDefault();
      console.log('Form submitted');
      const formData = new FormData();
      formData.append('fullname', document.getElementById('name').value);
      formData.append('email', document.getElementById('email').value);
      formData.append('branch', document.getElementById('branch').value);
      formData.append('year', document.getElementById('year').value);
      formData.append('password', document.getElementById('password').value);
      formData.append('gender', document.querySelector('input[name="gender"]:checked').value);
      formData.append('rollno', document.getElementById('rollno').value);
      formData.append('profilepic', document.getElementById('profilePhoto').files[0]);
      try {
        const response = await fetch('http://localhost:3001/api/v1/student/register', {
          method: 'POST',
          body: formData
        });
        console.log('Fetch request sent');
        console.log('Raw response:', response);
        let data = {};
        try {
          data = await response.json();
        } catch (jsonErr) {
          console.error('Error parsing JSON:', jsonErr);
          const text = await response.text();
          console.error('Raw response text:', text);
        }
        console.log('Parsed data:', data);
        if (response) {
          alert('Registration successful! Please login.');
          window.location.href = '/frontend/pages/login.html';
        } else {
          alert(data.message || 'Registration failed');
        }
        console.log('Response status:', response.status);
      } catch (err) {
        alert('Error connecting to server');
        console.error('Fetch error:', err);
      }
    });
  } else {
    console.log('Form not found');
  }
});
