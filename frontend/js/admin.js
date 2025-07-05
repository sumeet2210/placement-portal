// Logout functionality for admin
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await fetch('/api/v1/admin/logout', {
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
const getallstudents = async () => {
    try {
        console.log('🔄 Fetching students from API...');
        const res = await fetch('http://localhost:3001/api/v1/admin/allstudents', {
            credentials: 'include',
        });
        
        console.log('📡 Response status:', res.status, res.statusText);
        
        const data = await res.json();
        console.log('📦 Full response data:', data);
        console.log('👥 Students array:', data.students);
        console.log('📊 Students count:', data.students ? data.students.length : 'No students array');
        
        if (!data.success) throw new Error(data.message || 'Failed to fetch students');
        
        // Check different possible response structures
        const students = data.students || data.data || [];
        console.log('✅ Final students array:', students);
        
        return students;
    } catch (err) {
        console.error('❌ Error loading students:', err);
        return [];
    }
};

async function displayStudents() {
    // Check for both possible table elements
    const studentsTableBody = document.getElementById('studentsTableBody'); // For view-students.html
    const studentTable = document.getElementById('studentTable'); // For admin dashboard
    
    const targetElement = studentsTableBody || studentTable;
    
    if (!targetElement) {
        console.log('No student table found on this page');
        return;
    }

    try {
        console.log('🎯 Starting displayStudents function (simple mode)...');
        const students = await getallstudents();
        console.log('📋 Received students in displayStudents:', students);
        console.log('📊 Students length:', students.length);
        
        if (!students || !Array.isArray(students)) {
            console.error('❌ Students is not an array:', students);
            targetElement.innerHTML = '<tr><td colspan="8">Error: Invalid student data format</td></tr>';
            return;
        }
        
        if (!students.length) {
            console.log('📭 No students found');
            if (studentsTableBody) {
                targetElement.innerHTML = '<tr><td colspan="8">📭 No students found in database</td></tr>';
            } else {
                targetElement.innerHTML = '<tr><td colspan="5">📭 No students found in database</td></tr>';
            }
            return;
        }

        console.log('🏗️ Building table rows for', students.length, 'students');

        if (studentsTableBody) {
            // For view-students.html: this should be handled by loadAndDisplayStudents
            console.log('⚠️ Using basic display for view-students page - consider using loadAndDisplayStudents instead');
        }
        
        // For admin dashboard (5 columns simple)
        const rows = students.map((student, index) => {
            console.log(`👤 Processing student ${index + 1} for simple view:`, student);
            return `
            <tr>
                <td>${student._id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.branch || student.course}</td>
                <td>${student.year}</td>
            </tr>
            `;
        }).join('');
        targetElement.innerHTML = rows;
        console.log('✅ Successfully rendered', students.length, 'students in simple view');
    } catch (error) {
        console.error('❌ Error displaying students:', error);
        targetElement.innerHTML = '<tr><td colspan="5">Error loading students: ' + error.message + '</td></tr>';
    }
}

// Global variables for filtering and search
let allStudents = [];
let filteredStudents = [];

// Student action functions (for view-students page)
function viewStudent(studentId) {
    alert('View student details for ID: ' + studentId);
    // TODO: Implement actual view functionality
}

function editStudent(studentId) {
    alert('Edit student for ID: ' + studentId);
    // TODO: Implement actual edit functionality
}

// Search and filter functionality
function initializeSearchAndFilter() {
    const searchBox = document.getElementById('searchBox');
    const yearFilter = document.getElementById('yearFilter');
    const branchFilter = document.getElementById('branchFilter');
    const refreshBtn = document.getElementById('refreshBtn');

    if (searchBox) {
        searchBox.addEventListener('input', filterStudents);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', filterStudents);
    }
    
    if (branchFilter) {
        branchFilter.addEventListener('change', filterStudents);
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async () => {
            console.log('🔄 Refreshing student data...');
            await loadAndDisplayStudents();
        });
    }
}

// Filter students based on search and filter criteria
function filterStudents() {
    const searchTerm = document.getElementById('searchBox')?.value.toLowerCase() || '';
    const yearFilter = document.getElementById('yearFilter')?.value || '';
    const branchFilter = document.getElementById('branchFilter')?.value || '';

    console.log('🔍 Filtering with:', { searchTerm, yearFilter, branchFilter });

    filteredStudents = allStudents.filter(student => {
        // Search filter
        const matchesSearch = !searchTerm || 
            (student.name && student.name.toLowerCase().includes(searchTerm)) ||
            (student.email && student.email.toLowerCase().includes(searchTerm)) ||
            (student.rollNumber && student.rollNumber.toLowerCase().includes(searchTerm));

        // Year filter
        const matchesYear = !yearFilter || 
            (student.year && student.year.toString() === yearFilter);

        // Branch filter
        const matchesBranch = !branchFilter || 
            (student.branch && student.branch.toLowerCase().includes(branchFilter.toLowerCase()));

        return matchesSearch && matchesYear && matchesBranch;
    });

    console.log('✅ Filtered results:', filteredStudents.length, 'of', allStudents.length);
    displayFilteredStudents();
    updateTableInfo();
}

// Display filtered students
function displayFilteredStudents() {
    const studentsTableBody = document.getElementById('studentsTableBody');
    if (!studentsTableBody) return;

    if (!filteredStudents.length) {
        studentsTableBody.innerHTML = '<tr><td colspan="8">📭 No students match your search criteria</td></tr>';
        return;
    }

    const rows = filteredStudents.map((student, index) => {
        return `
        <tr>
            <td>
                <img src="${student.profilepic || 'https://via.placeholder.com/40x40?text=👤'}" 
                     alt="${student.name || 'Student'}" class="student-avatar"
                     onerror="this.src='https://via.placeholder.com/40x40?text=👤'">
            </td>
            <td>
                <div class="student-name">${student.name || 'N/A'}</div>
                <div class="student-email">${student.email || 'N/A'}</div>
            </td>
            <td>${student.rollNumber || 'N/A'}</td>
            <td>${student.year || 'N/A'}</td>
            <td>${student.branch || 'N/A'}</td>
            <td>${student.cgpa || 'N/A'}</td>
            <td>
                <span class="status-badge status-active">
                    ${student.status || 'Active'}
                </span>
            </td>
            <td>
                <div class="action-btns">
                    <button class="btn btn-info btn-sm" onclick="viewStudent('${student._id}')">👁️ View</button>
                    <button class="btn btn-warning btn-sm" onclick="editStudent('${student._id}')">✏️ Edit</button>
                </div>
            </td>
        </tr>
        `;
    }).join('');

    studentsTableBody.innerHTML = rows;
}

// Update table info counter
function updateTableInfo() {
    const tableInfo = document.getElementById('tableInfo');
    if (tableInfo) {
        const total = allStudents.length;
        const filtered = filteredStudents.length;
        
        if (total === filtered) {
            tableInfo.textContent = `Showing ${total} students`;
        } else {
            tableInfo.textContent = `Showing ${filtered} of ${total} students`;
        }
    }
}

// Calculate and display statistics
function updateStatistics() {
    const totalStudentsElement = document.getElementById('totalStudents');
    const activeStudentsElement = document.getElementById('activeStudents');
    const placedStudentsElement = document.getElementById('placedStudents');
    const averageCgpaElement = document.getElementById('averageCgpa');

    if (!allStudents.length) {
        if (totalStudentsElement) totalStudentsElement.textContent = '0';
        if (activeStudentsElement) activeStudentsElement.textContent = '0';
        if (placedStudentsElement) placedStudentsElement.textContent = '0';
        if (averageCgpaElement) averageCgpaElement.textContent = '0.0';
        return;
    }

    // Total students
    const totalStudents = allStudents.length;
    if (totalStudentsElement) totalStudentsElement.textContent = totalStudents;

    // Active students (assuming all fetched students are active)
    const activeStudents = allStudents.filter(s => !s.status || s.status === 'Active').length;
    if (activeStudentsElement) activeStudentsElement.textContent = activeStudents;

    // Placed students (would need placement status field)
    const placedStudents = allStudents.filter(s => s.placementStatus === 'Placed' || s.status === 'Placed').length;
    if (placedStudentsElement) placedStudentsElement.textContent = placedStudents;

    // Average CGPA
    const validCgpas = allStudents
        .map(s => parseFloat(s.cgpa))
        .filter(cgpa => !isNaN(cgpa) && cgpa > 0);
    
    const averageCgpa = validCgpas.length > 0 
        ? (validCgpas.reduce((sum, cgpa) => sum + cgpa, 0) / validCgpas.length).toFixed(2)
        : '0.0';
    
    if (averageCgpaElement) averageCgpaElement.textContent = averageCgpa;

    console.log('📊 Statistics updated:', {
        total: totalStudents,
        active: activeStudents,
        placed: placedStudents,
        avgCgpa: averageCgpa
    });
}

// Export students to CSV
function exportStudents() {
    if (!filteredStudents.length) {
        alert('No students to export');
        return;
    }

    const headers = ['Name', 'Email', 'Roll Number', 'Year', 'Branch', 'CGPA', 'Status'];
    const csvContent = [
        headers.join(','),
        ...filteredStudents.map(student => [
            `"${student.name || ''}"`,
            `"${student.email || ''}"`,
            `"${student.rollNumber || ''}"`,
            `"${student.year || ''}"`,
            `"${student.branch || ''}"`,
            `"${student.cgpa || ''}"`,
            `"${student.status || 'Active'}"`
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `students_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('📊 Exported', filteredStudents.length, 'students to CSV');
}

// Print students data with better formatting
function printStudents() {
    if (!filteredStudents.length) {
        alert('No students to print');
        return;
    }

    // Set print date attribute for footer
    document.body.setAttribute('data-print-date', new Date().toLocaleDateString());
    
    // Update page title for print
    const originalTitle = document.title;
    document.title = `Students Report - ${new Date().toLocaleDateString()}`;
    
    // Add print-specific info before printing
    const tableInfo = document.getElementById('tableInfo');
    const originalTableInfo = tableInfo ? tableInfo.textContent : '';
    if (tableInfo) {
        tableInfo.textContent = `Total: ${filteredStudents.length} students | Generated: ${new Date().toLocaleString()}`;
    }
    
    // Print the page
    window.print();
    
    // Restore original values after print dialog
    setTimeout(() => {
        document.title = originalTitle;
        if (tableInfo) {
            tableInfo.textContent = originalTableInfo;
        }
        document.body.removeAttribute('data-print-date');
    }, 1000);
    
    console.log('🖨️ Print dialog opened for', filteredStudents.length, 'students');
}

// Hamburger menu toggle
function initializeHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sideMenu = document.getElementById('sideMenu');
    
    if (hamburgerBtn && sideMenu) {
        hamburgerBtn.addEventListener('click', () => {
            sideMenu.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!sideMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                sideMenu.classList.remove('open');
            }
        });
    }
}

// Main function to load and display students
async function loadAndDisplayStudents() {
    try {
        console.log('🔄 Loading students...');
        allStudents = await getallstudents();
        filteredStudents = [...allStudents];
        
        displayFilteredStudents();
        updateStatistics();
        updateTableInfo();
        
        console.log('✅ Students loaded and displayed successfully');
    } catch (error) {
        console.error('❌ Error loading students:', error);
        const studentsTableBody = document.getElementById('studentsTableBody');
        if (studentsTableBody) {
            studentsTableBody.innerHTML = '<tr><td colspan="8" class="error-state">❌ Failed to load students: ' + error.message + '</td></tr>';
        }
    }
}

// Initialize all interactive features on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Admin dashboard initializing...');
    
    // Load admin profile
    loadAdminProfile();
    
    // Initialize hamburger menu
    initializeHamburgerMenu();
    
    // Check if we're on the view-students page
    const studentsTableBody = document.getElementById('studentsTableBody');
    if (studentsTableBody) {
        console.log('📚 View Students page detected, initializing...');
        // Initialize search and filter functionality
        initializeSearchAndFilter();
        // Load and display students with full functionality
        loadAndDisplayStudents();
    } else {
        // For other pages (like admin dashboard), use simple display
        console.log('📊 Admin dashboard page detected');
        displayStudents();
    }
});

// Make exportStudents and printStudents available globally for onclick handlers
window.exportStudents = exportStudents;
window.printStudents = printStudents;
