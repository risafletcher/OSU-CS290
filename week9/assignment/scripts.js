function editHandler(id) {
    const editForm = document.getElementById(`${id}--edit-form`);
    const currentRow = document.getElementById(id);
    currentRow.hidden = true;
    editForm.hidden = false;
}

function cancelEditHandler(id) {
    const editForm = document.getElementById(`${id}--edit-form`);
    const currentRow = document.getElementById(id);
    currentRow.hidden = false;
    editForm.hidden = true;  
}

function deleteHandler(id) {
    const currentRow = document.getElementById(id);
    fetch('/', {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        mode: 'same-origin',
        body: JSON.stringify({ id })
    })
    .then(() => currentRow.remove())
    .catch((err) => console.error(err));
}

function submitEditHandler(id) {
    fetch('/', {
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        mode: 'same-origin',
        body: JSON.stringify({ id })
    })
    .catch((err) => console.error(err));
}
