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