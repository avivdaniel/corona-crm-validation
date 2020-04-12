const modal = document.getElementById('modal');
const editForm = document.getElementById('editForm');
document.getElementById('close-modal').addEventListener('click', closeModal);

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateFullName()) {
        console.log('validate full name faild');
        return;
    }
});

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}