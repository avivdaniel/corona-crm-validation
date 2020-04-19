function validateAge(form) {
    if (!form.over18.checked) {
        setInvalid(over18Field, 'blbldl');
        // over18Field.classList.add('is-invalid');
        // over18Feedback.innerHTML = 'you must be over 18!';
        // over18Feedback.classList.add('invalid-feedback');
        console.log('not checked!')
        //I was trying to use the function setValid\invalid but its a problem since the feedback isnot a nextelementsibling of the checkbox and i didnt want to change the logic
        return false;
    }
    console.log('checked!!')
    over18Field.classList.add('is-valid');
    over18Feedback.innerHTML = '';
    return true;
}

function validateFullName(field) {
    if (checkIfEmpty(field)) {
        return;
    }
    if (CheckIfLessThan2Words(field)) {
        return;
    }
    if (!checkIfOnlyLetters(field)) {
        return;
    }
    return true;
}


function isValidEmail(email) {
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
