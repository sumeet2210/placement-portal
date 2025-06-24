console.log('main.js loaded');
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    console.log('Login form found');
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log('Login form submitted');
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const userType = document.querySelector('input[name="userType"]:checked')?.value || 'student';
      try {
        const response = await fetch('http://localhost:3001/api/v1/login', {
          method: 'POST',
          headers: { },
          body: JSON.stringify({ email, password, usermodel: userType })
        });
        let data = {};
        try {
          data = await response.json();
        } catch (jsonErr) {
          console.error('Error parsing JSON:', jsonErr);
          const text = await response.text();
          console.error('Raw response text:', text);
        }
        if (response.ok) {
          alert(data.message || 'Login successful!');
          // Redirect based on user type if needed
          if (userType === 'student') {
            window.location.href = '/frontend/pages/student-dashboard.html';
          } else if (userType === 'admin') {
            window.location.href = '/frontend/pages/admin-dashboard.html';
          } else if (userType === 'company') {
            window.location.href = '/frontend/pages/company-dashboard.html';
          } else {
            window.location.href = '/frontend/pages/student-dashboard.html';
          }
        } else {
          alert(data.message || 'Login failed');
        }
        console.log('Login response status:', response.status);
      } catch (err) {
        alert('Error connecting to server');
        console.error('Login fetch error:', err);
      }
    });
  } else {
    console.log('Login form not found');
  }
});
