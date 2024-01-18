function checkedIndices(options, id) {

    let indices = [];
    let checkboxes = document.querySelectorAll(`#${id} .form-check-input`);

    for (const checkbox of checkboxes) {

        if (!checkbox.checked) {
            continue;
        }

        let label = checkbox.parentElement;
        if (label) {
            indices.push(options.indexOf(label.textContent));
        }
    }

    return indices;
}

function createCheckbox(parent, text, checked) {

    let label = document.createElement('label');
    label.classList.add('form-check-label');
    label.textContent = text;
    parent.appendChild(label);
    
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'checkboxGroup';
    checkbox.classList.add('form-check-input');
    checkbox.checked = checked;
    label.appendChild(checkbox);

    parent.appendChild(document.createElement('br'));
}

function isDropdownEmpty() {
    return dropdownButton.textContent === 'Select an option';
}