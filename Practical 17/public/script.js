// Global variables
let students = [];
let currentStudentId = null;
let isEditing = false;

// DOM elements
const studentsTableBody = document.getElementById('studentsTableBody');
const addStudentBtn = document.getElementById('addStudentBtn');
const studentModal = document.getElementById('studentModal');
const deleteModal = document.getElementById('deleteModal');
const studentForm = document.getElementById('studentForm');
const searchInput = document.getElementById('searchInput');
const modalTitle = document.getElementById('modalTitle');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
    loadStats();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Add student button
    addStudentBtn.addEventListener('click', openAddModal);
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === studentModal) {
            closeModal();
        }
        if (event.target === deleteModal) {
            closeDeleteModal();
        }
    });
    
    // Form submission
    studentForm.addEventListener('submit', handleFormSubmit);
    
    // Search functionality
    searchInput.addEventListener('input', debounce(handleSearch, 300));
}

// Load all students
async function loadStudents() {
    try {
        showLoading();
        const response = await fetch('/api/students');
        if (!response.ok) throw new Error('Failed to fetch students');
        
        students = await response.json();
        renderStudentsTable();
    } catch (error) {
        showMessage('Error loading students: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Load statistics
async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        if (!response.ok) throw new Error('Failed to fetch statistics');
        
        const stats = await response.json();
        document.getElementById('totalStudents').textContent = stats.totalStudents;
        document.getElementById('activeStudents').textContent = stats.activeStudents;
        document.getElementById('totalFees').textContent = `$${stats.totalFees.toLocaleString()}`;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Render students table
function renderStudentsTable() {
    if (students.length === 0) {
        studentsTableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="empty-state">
                        <i class="fas fa-users"></i>
                        <h3>No Students Found</h3>
                        <p>Start by adding your first student to the tuition class.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    studentsTableBody.innerHTML = students.map(student => `
        <tr>
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.email)}</td>
            <td>${escapeHtml(student.phone)}</td>
            <td>${escapeHtml(student.grade)}</td>
            <td>${student.subjects.join(', ')}</td>
            <td>$${student.fee}</td>
            <td><span class="status-badge status-${student.status}">${student.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit-btn" onclick="editStudent('${student._id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteStudent('${student._id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Open add student modal
function openAddModal() {
    isEditing = false;
    currentStudentId = null;
    modalTitle.textContent = 'Add New Student';
    studentForm.reset();
    clearSubjectCheckboxes();
    studentModal.style.display = 'block';
}

// Open edit student modal
async function editStudent(studentId) {
    try {
        const response = await fetch(`/api/students/${studentId}`);
        if (!response.ok) throw new Error('Failed to fetch student');
        
        const student = await response.json();
        isEditing = true;
        currentStudentId = studentId;
        modalTitle.textContent = 'Edit Student';
        
        // Populate form fields
        document.getElementById('name').value = student.name;
        document.getElementById('email').value = student.email;
        document.getElementById('phone').value = student.phone;
        document.getElementById('grade').value = student.grade;
        document.getElementById('fee').value = student.fee;
        document.getElementById('address').value = student.address;
        document.getElementById('status').value = student.status;
        document.getElementById('parentName').value = student.parentName;
        document.getElementById('parentPhone').value = student.parentPhone;
        
        // Set subject checkboxes
        clearSubjectCheckboxes();
        student.subjects.forEach(subject => {
            const checkbox = document.querySelector(`input[value="${subject}"]`);
            if (checkbox) checkbox.checked = true;
        });
        
        studentModal.style.display = 'block';
    } catch (error) {
        showMessage('Error loading student data: ' + error.message, 'error');
    }
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(studentForm);
    const studentData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        grade: formData.get('grade'),
        subjects: getSelectedSubjects(),
        fee: parseFloat(formData.get('fee')),
        address: formData.get('address'),
        status: formData.get('status'),
        parentName: formData.get('parentName'),
        parentPhone: formData.get('parentPhone')
    };
    
    // Validation
    if (studentData.subjects.length === 0) {
        showMessage('Please select at least one subject', 'error');
        return;
    }
    
    try {
        const url = isEditing ? `/api/students/${currentStudentId}` : '/api/students';
        const method = isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to save student');
        }
        
        const savedStudent = await response.json();
        
        if (isEditing) {
            showMessage('Student updated successfully!', 'success');
        } else {
            showMessage('Student added successfully!', 'success');
        }
        
        closeModal();
        loadStudents();
        loadStats();
    } catch (error) {
        showMessage('Error saving student: ' + error.message, 'error');
    }
}

// Delete student
function deleteStudent(studentId) {
    currentStudentId = studentId;
    deleteModal.style.display = 'block';
}

// Confirm delete
async function confirmDelete() {
    try {
        const response = await fetch(`/api/students/${currentStudentId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete student');
        
        showMessage('Student deleted successfully!', 'success');
        closeDeleteModal();
        loadStudents();
        loadStats();
    } catch (error) {
        showMessage('Error deleting student: ' + error.message, 'error');
    }
}

// Search functionality
async function handleSearch(event) {
    const query = event.target.value.trim();
    
    if (query === '') {
        loadStudents();
        return;
    }
    
    try {
        const response = await fetch(`/api/students/search/${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Search failed');
        
        students = await response.json();
        renderStudentsTable();
    } catch (error) {
        showMessage('Search error: ' + error.message, 'error');
    }
}

// Utility functions
function getSelectedSubjects() {
    const checkboxes = document.querySelectorAll('.subject-checkboxes input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function clearSubjectCheckboxes() {
    document.querySelectorAll('.subject-checkboxes input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
}

function closeModal() {
    studentModal.style.display = 'none';
    studentForm.reset();
    clearSubjectCheckboxes();
}

function closeDeleteModal() {
    deleteModal.style.display = 'none';
    currentStudentId = null;
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of main content
    const main = document.querySelector('main');
    main.insertBefore(messageDiv, main.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.className = 'loading';
    loadingDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999;';
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + N to add new student
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        openAddModal();
    }
    
    // Escape to close modals
    if (event.key === 'Escape') {
        closeModal();
        closeDeleteModal();
    }
});

// Export functions for global access
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.confirmDelete = confirmDelete;
window.closeModal = closeModal;
window.closeDeleteModal = closeDeleteModal;
