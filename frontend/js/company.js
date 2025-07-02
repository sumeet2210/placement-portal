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

document.addEventListener('DOMContentLoaded', () => {
    loadCompanyProfile();
});