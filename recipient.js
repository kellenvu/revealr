let dropdownButton = document.getElementById('dropdown-button');
let dropdownList = document.getElementById('dropdown-list');
let resultsButton = document.getElementById('results-button');
let revealOtherForm = document.getElementById('reveal-other-form');
let revealMineForm = document.getElementById('reveal-mine-form');
const { options, senderAnswer, senderWantsToHear, senderRequiresToReveal } = parseURLParams();

function toIntArray(str) {
    return str.split('-').map((num) => parseInt(num));
}

function parseURLParams() {
    const params = new URLSearchParams(window.location.search);
    const options = params.get('options') ? params.get('options').split('-') : [];
    const senderAnswer = params.get('senderAnswer') ? parseInt(params.get('senderAnswer')) : null;
    const senderWantsToHear = params.get('senderWantsToHear') ? toIntArray(params.get('senderWantsToHear')) : [];
    const senderRequiresToReveal = params.get('senderRequiresToReveal') ? toIntArray(params.get('senderRequiresToReveal')) : [];
    return { options, senderAnswer, senderWantsToHear, senderRequiresToReveal }
}

function resultsURL(senderReveal, recipientReveal) {
    let baseURL = window.location.href.split('?')[0].replace('/recipient.html', '');
    return `${baseURL}/results.html?senderReveal=${senderReveal}&recipientReveal=${recipientReveal}`
}

function goToResults() {

    let senderReveal = '';
    let recipientReveal = '';
    let recipientAnswer = options.indexOf(dropdownButton.textContent);
    let recipientRequiresToReveal = checkedIndices(options, 'reveal-mine-form');
    let recipientWantsToHear = checkedIndices(options, 'reveal-other-form');

    if (senderWantsToHear.includes(recipientAnswer) && recipientRequiresToReveal.includes(senderAnswer)) {
        recipientReveal = options[recipientAnswer];
    }

    if (recipientWantsToHear.includes(senderAnswer) && senderRequiresToReveal.includes(recipientAnswer)) {
        senderReveal = options[senderAnswer];
    }

    window.location.href = resultsURL(senderReveal, recipientReveal);
}

window.onload = function() {

    for (const option of options) {

        let listItem = document.createElement('li');
        dropdownList.appendChild(listItem);
    
        let link = document.createElement('a');
        link.className = 'dropdown-item';
        link.textContent = option;
        link.onclick = function() {
            dropdownButton.textContent = option;
            resultsButton.disabled = isDropdownEmpty();
        };
        listItem.appendChild(link);
    
        createCheckbox(revealOtherForm, option, true);
        createCheckbox(revealMineForm, option, false);
    }
}