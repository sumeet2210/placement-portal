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
      try {
        const response = await fetch('http://localhost:3001/api/v1/register/admin', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (response.ok) {
          alert('Registration successful! Please login.');
          window.location.href = '/frontend/pages/login.html';
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (err) {
        alert('Error connecting to server');
      }
    });
  }
});
