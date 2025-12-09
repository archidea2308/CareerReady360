// ========== DATA STORAGE ==========
const DEFAULT_STUDENTS = [
  {
    id: '1',
    name: 'Budi Santoso',
    nis: '2023001',
    jurusan: 'Rekayasa Perangkat Lunak',
    email: 'budi@smk.id',
    projects: 4,
    certifications: 2,
    internships: 1,
    softskills: 7,
    portfolio: ['Website Sekolah', 'Aplikasi Inventaris'],
    readiness: 0
  },
  {
    id: '2',
    name: 'Siti Aminah',
    nis: '2023002',
    jurusan: 'Teknik Komputer Jaringan',
    email: 'siti@smk.id',
    projects: 3,
    certifications: 3,
    internships: 2,
    softskills: 8,
    portfolio: ['Jaringan Lab', 'Server Monitoring'],
    readiness: 0
  }
];

// Initialize localStorage if empty
if (!localStorage.getItem('career360_students')) {
  const students = DEFAULT_STUDENTS.map(s => ({
    ...s,
    readiness: calculateReadiness(s)
  }));
  localStorage.setItem('career360_students', JSON.stringify(students));
}

function calculateReadiness(s) {
  return Math.min(100, Math.round(
    (s.projects || 0) * 0.3 +
    (s.certifications || 0) * 0.4 +
    (s.internships || 0) * 0.2 +
    (s.softskills || 0) * 0.1
  ));
}

function getStudents() {
  return JSON.parse(localStorage.getItem('career360_students') || '[]');
}

function saveStudents(students) {
  localStorage.setItem('career360_students', JSON.stringify(students));
}

// ========== AUTH & NAV ==========
function checkAuth() {
  const role = localStorage.getItem('career360_role');
  if (!role) {
    window.location.href = 'login.html';
  }
  document.querySelectorAll('[data-role]').forEach(el => {
    if (!el.dataset.role.split(',').includes(role)) {
      el.style.display = 'none';
    }
  });
}

function logout() {
  localStorage.removeItem('career360_role');
  localStorage.removeItem('career360_user');
  window.location.href = 'index.html';
}

// ========== UI UTILS ==========
function createChart(ctx, type, labels, data, label) {
  return new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

function exportToCSV(filename, rows) {
  const csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}