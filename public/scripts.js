const API_URL = 'http://localhost:3000';
const newCustomerForm = document.getElementById('new-customer-form');
const fullName = document.getElementById('fullName');
const feedback = document.getElementById('feedback');
const over18Field = document.getElementById('over18');
const over18Feedback = document.getElementById('over18-feedback')
const email = document.getElementById('email');
const table = document.getElementById('table');
const thead = document.getElementById('thead');
const tbody = document.getElementById('customersTableTb');
const editForm = document.getElementById('editForm');

newCustomerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateAge(newCustomerForm)) {
        console.log('validateAge faild')
        return;
    }
    if (!validateFullName()) {
        console.log('validate full name faild');
        return;
    }
    if (!isValidEmail()) {
        console.log('validate email wrong')
        return;
    }
    createCustomer({
        fullName: newCustomerForm.fullName.value,
        email: newCustomerForm.email.value,
        birthDate: newCustomerForm.birthDate.value,
        notes: newCustomerForm.notes.value,
    });
    console.log('user sended');
    getCustomers();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateFullName()) {
        console.log('validate full name faild');
        return;
    }
});

function validateAge(form) {
    if (!form.over18.checked) {
        over18Field.classList.add('is-invalid');
        over18Feedback.innerHTML = 'you nust be over 18!';
        over18Feedback.classList.add('invalid-feedback');
        //I was trying to use the function setValid\invalid but its a problem since the feedback isnot a nextelementsibling of the checkbox and i didnt want to change the logic
        return false;
    }
    over18Field.classList.add('is-valid');
    over18Feedback.innerHTML = '';
    return true;
}

//validation functions 
function validateFullName() {
    if (checkIfEmpty(fullName)) {
        return;
    }
    if (CheckIfLessThan2Words(fullName)) {
        return;
    }
    if (!checkIfOnlyLetters(fullName)) {
        return;
    }
    return true;
}


function isValidEmail() {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email.value).toLowerCase())) {
        setValid(email)
        return true;
    }
    setInvalid(email, 'You must contain a valid email adress')
    return false;
}

//helpers functions
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        setInvalid(field, `${field.name} must not be empty`);
        return true; //because its empty
    } else {
        setValid(field);
        return false;
    }
}

function isEmpty(value) {
    if (value === '') {
        return true;
    }
    return false;
}

function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]*$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters`);
        return false;
    }
};

function CheckIfLessThan2Words(field) {
    if (isLessThan2Words(field.value)) {
        setInvalid(field, 'You must contain at least 2 words')
        return true;
    } else {
        setValid(field);
        return false;
    }
}

function isLessThan2Words(value) {
    value = value.split(' ');
    if (value.length < 2) {
        return true;
    }
    return false;
}


function setInvalid(field, message) {
    field.classList.add('is-invalid');
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.classList.add('invalid-feedback');
    return;
}

function setValid(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    field.nextElementSibling.innerHTML = '';
    return;
}


function createCustomer(customer) {
    return fetch(API_URL + '/customer', {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function getCustomers() {
    return fetch(API_URL + '/customer')
        .then(res => res.json())
        .then(refreshCustomers())
        .then(data => {
            data.forEach(customer => {
                const actionsInnerHTML = `
            <button class="btn btn-sm" id="btn-edit">
            <i class="far fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-delete" id="btn-delete">
            <i class="far fa-trash-alt"></i>
            </button>`;
                tbody.innerHTML = tbody.innerHTML + `
            <tr>
            <th>${customer.id}</th>
            <td>${customer.fullName}</td>
            <td>${customer.email}</td>
            <td>${customer.birthDate}</td>
            <td>${customer.created}</td>
            <td>${actionsInnerHTML}</td>
            </tr>`;

                tbody.querySelector('#btn-edit').addEventListener('click', () => {
                    openModal();
                    const fullName_edit = document.getElementById('fullName_edit').value = customer.fullName;
                    const email_edit = document.getElementById('email_edit').value = customer.email;
                    const birthdate_edit = document.getElementById('birthdate_edit').value = customer.birthDate;
                    const notes = document.getElementById('notes_edit').value = customer.notes;
                });
            });
        });
}

function refreshCustomers() {
    tbody.innerHTML = '';
}