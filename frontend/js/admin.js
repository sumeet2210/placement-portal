// Logout functionality for admin
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await fetch('http://localhost:3001/api/v1/admin/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (e) {
            // Ignore errors, just redirect
        }
        window.location.href = 'login.html';
    });
}

// Fetch and display admin profile data
async function loadAdminProfile() {
    try {
        const res = await fetch('http://localhost:3001/api/v1/admin/profile', {
            credentials: 'include',
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to fetch admin profile');
        const admin = data.admin;
        document.getElementById('adminName').textContent = admin.name || '';
        document.getElementById('adminEmail').textContent = admin.email || '';
        if (admin.profilepic && document.getElementById('adminProfilePic')) {
            document.getElementById('adminProfilePic').src = admin.profilepic;
        }
    } catch (err) {
        if (document.getElementById('adminName'))
            document.getElementById('adminName').textContent = 'Error loading profile';
        if (document.getElementById('adminEmail'))
            document.getElementById('adminEmail').textContent = err.message;
        console.error('Admin profile load error:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadAdminProfile();
});
