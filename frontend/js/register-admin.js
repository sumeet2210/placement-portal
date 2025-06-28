document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('adminRegisterForm');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', document.getElementById('admin-name').value);
      formData.append('email', document.getElementById('admin-email').value);
      formData.append('password', document.getElementById('admin-password').value);
      formData.append('secretcode', document.getElementById('admin-secret').value);
      const profilePicInput = document.getElementById('admin-profile-pic');
      if (profilePicInput && profilePicInput.files.length > 0) {
        formData.append('profilepic', profilePicInput.files[0]);
      }
  
      try {
        console.log('Submitting admin registration form...');
        const response = await fetch('http://localhost:3001/api/v1/admin/register', {
          method: 'POST',
          body: formData // Do NOT set headers here!
        });
        console.log('Fetch response received:', response);
        let data = {};
        try {
          data = await response.json();
          console.log('Parsed JSON response:', data);
        } catch (jsonErr) {
          console.error('Error parsing JSON:', jsonErr);
          const text = await response.text();
          console.error('Raw response text:', text);
        }
        if (response.ok) {
          alert('Registration successful! Please login.');
          window.location.href = '/frontend/pages/login.html';
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (err) {
        alert('Error connecting to server');
        console.error('Fetch error:', err);
        if (err instanceof TypeError) {
          console.error('Likely a network or CORS error.');
        }
      }
    });
  }
});

window.addEventListener('error', function(e) {
  alert('Global error: ' + e.message);
  console.error('Global error:', e);
});
window.addEventListener('unhandledrejection', function(e) {
  alert('Unhandled promise rejection: ' + (e.reason && e.reason.message ? e.reason.message : e.reason));
  console.error('Unhandled promise rejection:', e);
});
