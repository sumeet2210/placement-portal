// Company related functions
const getCompanyDetails = async (companyId) => {
    try {
        const response = await fetch(`/api/companies/${companyId}`);
        if (!response.ok) {
            throw new Error(`Error fetching company details: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch company details");
    }
};

// Logout functionality for company dashboard
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await fetch('http://localhost:3001/api/v1/company/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (e) {
            // Ignore errors, just redirect
        }
        window.location.href = 'login.html';
    });
}

// Fetch and display company profile data
async function loadCompanyProfile() {
    try {
        const res = await fetch('http://localhost:3001/api/v1/company/profile', {
            credentials: 'include',
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to fetch company profile');
        const company = data.company;
        if (document.getElementById('companyName'))
            document.getElementById('companyName').textContent = company.name || '';
        if (document.getElementById('companyEmail'))
            document.getElementById('companyEmail').textContent = company.email || '';
        if (company.companylogo && document.getElementById('companyLogo')) {
            document.getElementById('companyLogo').src = company.companylogo;
        }
        // Add more fields as needed
    } catch (err) {
        if (document.getElementById('companyName'))
            document.getElementById('companyName').textContent = 'Error loading profile';
        if (document.getElementById('companyEmail'))
            document.getElementById('companyEmail').textContent = err.message;
        console.error('Company profile load error:', err);
    }
}

// Fetch company's posted jobs
async function loadCompanyJobs() {
    try {
        const res = await fetch('http://localhost:3001/api/v1/company/jobs', {
            credentials: 'include',
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to fetch jobs');
        return data.jobs || [];
    } catch (err) {
        console.error('Error loading company jobs:', err);
        return [];
    }
}

// Delete a job
async function deleteJob(jobId) {
    if (!confirm('Are you sure you want to delete this job?')) return false;
    
    try {
        const res = await fetch(`http://localhost:3001/api/v1/company/job/${jobId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to delete job');
        return true;
    } catch (err) {
        console.error('Error deleting job:', err);
        alert('Failed to delete job: ' + err.message);
        return false;
    }
}

// Update job status
async function updateJobStatus(jobId, status) {
    try {
        const res = await fetch(`http://localhost:3001/api/v1/company/job/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
            credentials: 'include',
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to update job');
        return true;
    } catch (err) {
        console.error('Error updating job:', err);
        alert('Failed to update job: ' + err.message);
        return false;
    }
}

// Get job applications (placeholder for future implementation)
async function getJobApplications(jobId) {
    try {
        const res = await fetch(`http://localhost:3001/api/v1/application/?jobId=${jobId}`, {
            credentials: 'include',
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to fetch applications');
        return data.applications || [];
    } catch (err) {
        console.error('Error loading applications:', err);
        return [];
    }
}

// Make functions available globally
window.loadCompanyJobs = loadCompanyJobs;
window.deleteJob = deleteJob;
window.updateJobStatus = updateJobStatus;
window.getJobApplications = getJobApplications;

document.addEventListener('DOMContentLoaded', () => {
    loadCompanyProfile();
});