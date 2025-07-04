// available-jobs.js
// Dynamically renders jobs for students and admins
// Shows 'Apply' for students, 'Approve/Reject' for admins

// Utility: get user role from localStorage/session (adjust as needed)
function getUserRole() {
  // Example: localStorage.setItem('userRole', 'student' or 'admin')
  return localStorage.getItem('userRole') || 'student';
}

async function fetchJobs() {
  // Adjust API endpoint as needed
  const res = await fetch('http://localhost:3001/api/job/all');
  if (!res.ok) return [];
  const data = await res.json();
  return data.jobs || [];
}

async function fetchStudentApplications() {
  try {
    const res = await fetch('http://localhost:3001/api/v1/application/my-applications', {
      credentials: 'include'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.applications : [];
  } catch (err) {
    console.error('Error fetching applications:', err);
    return [];
  }
}

async function renderJobs(jobs, role) {
  const tbody = document.getElementById('jobsTableBody');
  tbody.innerHTML = '';
  if (!jobs.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="no-jobs">No jobs available at the moment.</td></tr>';
    return;
  }

  // Fetch student applications to check which jobs they've already applied to
  let appliedJobIds = [];
  if (role === 'student') {
    const applications = await fetchStudentApplications();
    appliedJobIds = applications.map(app => app.job._id);
  }

  jobs.forEach(job => {
    const tr = document.createElement('tr');
    const hasApplied = appliedJobIds.includes(job._id);
    
    tr.innerHTML = `
      <td>${job.title}</td>
      <td>${job.company}</td>
      <td>${job.location}</td>
      <td>${job.salary || '-'}</td>
      <td>${job.deadline ? new Date(job.deadline).toLocaleDateString() : '-'}</td>
      <td>
        ${role === 'admin' ? `
          <button class="apply-btn" onclick="approveJob('${job._id}')">Approve</button>
          <button class="apply-btn" style="background:#ef4444;" onclick="rejectJob('${job._id}')">Reject</button>
        ` : hasApplied ? `
          <button class="apply-btn applied" disabled>Already Applied</button>
        ` : `
          <button class="apply-btn" onclick="window.location.href='apply-job.html?jobId=${job._id}'">Apply</button>
        `}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Admin actions
async function approveJob(jobId) {
  if (!confirm('Approve this job?')) return;
  const res = await fetch(`http://localhost:5000/api/admin/jobs/${jobId}/approve`, { method: 'POST', credentials: 'include' });
  if (res.ok) {
    alert('Job approved!');
    location.reload();
  } else {
    alert('Failed to approve job.');
  }
}
async function rejectJob(jobId) {
  if (!confirm('Reject this job?')) return;
  const res = await fetch(`http://localhost:5000/api/admin/jobs/${jobId}/reject`, { method: 'POST', credentials: 'include' });
  if (res.ok) {
    alert('Job rejected!');
    location.reload();
  } else {
    alert('Failed to reject job.');
  }
}

// On page load
(async function() {
  const role = getUserRole();
  const jobs = await fetchJobs();
  await renderJobs(jobs, role);
})();

// Expose admin functions globally for inline onclick
window.approveJob = approveJob;
window.rejectJob = rejectJob;
