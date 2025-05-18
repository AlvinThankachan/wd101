let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
};

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptTerms}</td>`;
        return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
    }).join("\n");

    const table = `<table class="table-auto w-full">
        <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2">Dob</th>
            <th class="px-4 py-2">Accepted terms?</th>
        </tr>${tableEntries}</table>`;

    document.getElementById("user-entries").innerHTML = table;
};

const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isAgeValid = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
};

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    if (!isEmailValid(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!isAgeValid(dob)) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    const entry = { name, email, password, dob, acceptTerms };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
