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