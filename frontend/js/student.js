// Fetch and display applied jobs for the logged-in student
async function loadAppliedJobs() {
    const appliedJobsList = document.getElementById('appliedJobsList');
    appliedJobsList.innerHTML = '<li>Loading...</li>';
    try {
        const res = await fetch('http://localhost:3001/api/v1/student/applications', {
            credentials: 'include', // Ensure cookies are sent with the request
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to fetch applications');
        if (!data.applications.length) {
            appliedJobsList.innerHTML = '<li>No jobs applied yet.</li>';
            return;
        }
        appliedJobsList.innerHTML = '';
        data.applications.forEach(app => {
            const job = app.job || {};
            const li = document.createElement('li');
            li.className = 'applied-item';
            li.innerHTML = `
                <span><strong>${job.title || 'Job Title N/A'}</strong> at ${job.company || 'Company N/A'}</span>
                <span class="status">${app.status}</span>
            `;
            appliedJobsList.appendChild(li);
        });
    } catch (err) {
        appliedJobsList.innerHTML = `<li style="color:red;">${err.message}</li>`;
    }
}

// Fetch and display student profile data
async function loadStudentProfile() {
    try {
        const res = await fetch('http://localhost:3001/api/v1/student/profile', {
            credentials: 'include',
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to fetch student profile');
        const student = data.student;
        document.getElementById('studentName').textContent = student.fullname || '';
        document.getElementById('studentEmail').textContent = student.email || '';
        document.getElementById('studentBranch').textContent = 'Branch: ' + (student.branch || '');
        // Optionally show more fields if you have elements for them:
        if (document.getElementById('studentYear')) {
            document.getElementById('studentYear').textContent = 'Year: ' + (student.year || '');
        }
        if (document.getElementById('studentGender')) {
            document.getElementById('studentGender').textContent = 'Gender: ' + (student.gender || '');
        }
        if (document.getElementById('studentRollno')) {
            document.getElementById('studentRollno').textContent = 'Roll No: ' + (student.rollno || '');
        }
        if (student.profilepic) {
            document.getElementById('studentProfilePic').src = student.profilepic;
        }
    } catch (err) {
        document.getElementById('studentName').textContent = 'Error loading profile';
        document.getElementById('studentEmail').textContent = err.message;
        console.error('Profile load error:', err);
    }
}

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            // Call backend logout endpoint if exists, else just clear cookies on client
            await fetch('http://localhost:3001/api/v1/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (e) {
            // Ignore errors, just redirect
        }
        // Redirect to login page
        window.location.href = 'login.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadStudentProfile();
    loadAppliedJobs();
});
