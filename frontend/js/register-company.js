console.log('register-company.js loaded');
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('companyRegisterForm');
  if (form) {
    console.log('Company form found');
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log('Company form submitted');
      const formData = new FormData();
      formData.append('name', document.getElementById('company-name').value);
      formData.append('email', document.getElementById('company-email').value);
      formData.append('password', document.getElementById('company-password').value);
      formData.append('address', document.getElementById('company-address').value);
      formData.append('website', document.getElementById('company-website').value);
      formData.append('description', document.getElementById('company-description').value);
      formData.append('contactPerson', document.getElementById('company-contact-person').value);
      formData.append('contactNumber', document.getElementById('company-contact-number').value);
      formData.append('companyfield', document.getElementById('company-core').value);
      // If you have a company logo file input, append it here:
      const logoInput = document.getElementById('company-logo');
      if (logoInput && logoInput.files.length > 0) {
        formData.append('companylogo', logoInput.files[0]);
      }
      try {
        const response = await fetch('http://localhost:3001/api/v1/company/register', {
          method: 'POST',
          body: formData
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
          alert(data.message || 'Registration successful! Please login.');
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
    console.log('Company form not found');
  }
});
