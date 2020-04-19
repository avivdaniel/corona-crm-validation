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
const fullName_edit = document.getElementById('fullName_edit');
const email_edit = document.getElementById('email_edit');


fullName.addEventListener('blur', () => {
    validateFullName(fullName);
});

email.addEventListener('blur', () => {
    isValidEmail(email);
});

fullName_edit.addEventListener('blur', () => {
    validateFullName(fullName_edit);
});

email_edit.addEventListener('blur', () => {
    isValidEmail(email_edit);
});


// create customer form client validation
newCustomerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateAge(newCustomerForm)) {
        console.log('validateAge faild')
        return;
    }
    if (!validateFullName(fullName)) {
        console.log('validate full name faild');
        return;
    }
    if (!isValidEmail(email)) {
        console.log('validate email wrong')
        return;
    }
    createCustomer({
        fullName: newCustomerForm.fullName.value,
        email: newCustomerForm.email.value,
        birthDate: newCustomerForm.birthDate.value,
        notes: newCustomerForm.notes.value
    });
    console.log('user sended');
    getCustomers();
});

// edit customer form validation


function createCustomer(customer) {
    return fetch(API_URL + '/customer', {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function editCustomer(editedCustomer) {
    console.log('hey edit fetch!')
    console.log(editedCustomer);
    return fetch(API_URL + `/customer/${editedCustomer.id}`, {
        method: 'POST',
        body: JSON.stringify(editedCustomer),
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
            <button class="btn btn-sm btn-edit">
            <i class="far fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-delete">
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

                tbody.querySelector('.btn-edit').addEventListener('click', () => {
                    openModal();
                    const fullName_edit = document.getElementById('fullName_edit').value = customer.fullName;
                    const email_edit = document.getElementById('email_edit').value = customer.email;
                    const birthdate_edit = document.getElementById('birthdate_edit').value = customer.birthDate;
                    const notes = document.getElementById('notes_edit').value = customer.notes;
                });

                editForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if (!validateFullName(fullName_edit)) {
                        console.log('validate full name **edit** faild');
                        return;
                    }
                    if (!isValidEmail(email_edit)) {
                        console.log('validate email **edit** wrong')
                        return;
                    }
                    editCustomer({
                        id: customer.id,
                        fullName: editForm.fullName_edit.value,
                        email: editForm.email.value,
                        birthDate: editForm.birthDate.value,
                        notes: editForm.notes.value,
                        created: customer.created
                    });
                    closeModal();
                    getCustomers();
                });
            });
        });
}



function refreshCustomers() {
    tbody.innerHTML = '';
}