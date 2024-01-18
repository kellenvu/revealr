let optionsInput = document.getElementById('options');
let dropdownList = document.getElementById('dropdown-list');
let dropdownButton = document.getElementById('dropdown-button');
let generateButton = document.getElementById('generate-button');
let urlField = document.getElementById('url');
let copyButton = document.getElementById('copy-button');
let revealOtherForm = document.getElementById('reveal-other-form');
let revealMineForm = document.getElementById('reveal-mine-form');

optionsInput.addEventListener('input', inputUpdated);

copyButton.addEventListener('click', () => {
    urlField.select();
    navigator.clipboard.writeText(urlField.value).catch((err) => {
        console.log('failed to write to clipboard: ', err);
    });
});

function generateRecipientURL() {
    let answers = getAnswers();
    let baseURL = window.location.href.split('?')[0].replace('/index.html', '');
    let options = encodeURIComponent(answers.join('-'));
    let answer = answers.indexOf(dropdownButton.textContent);
    let senderWantsToHear = checkedIndices(answers, 'reveal-other-form').join('-');
    let senderRequiresToReveal = checkedIndices(answers, 'reveal-mine-form').join('-');
    urlField.value = `${baseURL}/recipient.html?options=${options}&senderAnswer=${answer}&senderWantsToHear=${senderWantsToHear}&senderRequiresToReveal=${senderRequiresToReveal}`;
}

function getAnswers() {
    const answers = optionsInput.value.split(',').map((answer) => answer.trim());
    return [...new Set(answers)];
}

function inputUpdated() {

    optionsInput.value = optionsInput.value.replace(/-/g, ''); // Disallow hyphens
    revealOtherForm.innerHTML = '';
    revealMineForm.innerHTML = '';
    dropdownList.innerHTML = '';
    dropdownButton.textContent = 'Select an option';

    let answers = getAnswers();

    for (const answer of answers) {

        if (!answer) {
            continue;
        }

        let listItem = document.createElement('li');
        dropdownList.appendChild(listItem);

        let link = document.createElement('a');
        link.className = 'dropdown-item';
        link.textContent = answer;
        link.onclick = function() {
            dropdownButton.textContent = answer;
            generateButton.disabled = isDropdownEmpty();
        };
        listItem.appendChild(link);

        createCheckbox(revealOtherForm, answer, true);
        createCheckbox(revealMineForm, answer, false);
    }

    generateButton.disabled = isDropdownEmpty();
}

window.onload = function () {optionsInput
    inputUpdated();
}
