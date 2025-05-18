// Function to retrieve entries from localStorage
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
};

// Initialize userEntries array from localStorage
let userEntries = retrieveEntries();

// Function to display entries in a table
const displayEntries = () => {
    const entries = retrieveEntries();
    
    // Create table header
    const tableHeader = `
        <tr>
            <th class="px-4 py-2 border bg-gray-100">Name</th>
            <th class="px-4 py-2 border bg-gray-100">Email</th>
            <th class="px-4 py-2 border bg-gray-100">Password</th>
            <th class="px-4 py-2 border bg-gray-100">Dob</th>
            <th class="px-4 py-2 border bg-gray-100">Accepted terms?</th>
        </tr>
    `;
    
    // Create table rows from entries
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptTerms}</td>`;
        
        return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
    }).join("\n");
    
    // Build the complete table
    const table = `
        <table class="table-auto w-full border-collapse">
            ${tableHeader}
            ${tableEntries}
        </table>
    `;
    
    // Insert the table into the DOM
    document.getElementById("user-entries").innerHTML = table;
};

// Email validation function
const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Age validation function (18-55 years)
const isAgeValid = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    
    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    // Age should be between 18 and 55 (inclusive)
    return age >= 18 && age <= 55;
};

// Form submission handler
const saveUserForm = (event) => {
    event.preventDefault();
    
    // Get form field values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;
    
    // Validate email
    if (!isEmailValid(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    // Validate age
    if (!isAgeValid(dob)) {
        alert("Age must be between 18 and 55 years.");
        return;
    }
    
    // Create entry object
    const entry = {
        name,
        email,
        password,
        dob,
        acceptTerms
    };
    
    // Add entry to userEntries array
    userEntries.push(entry);
    
    // Save userEntries to localStorage
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    
    // Update the displayed entries
    displayEntries();
    
    // Reset the form
    document.getElementById("user-form").reset();
};

// Add event listener to form submission
document.getElementById("user-form").addEventListener("submit", saveUserForm);

// Display entries on page load
displayEntries();
