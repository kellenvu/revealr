function getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function displayResults() {

    let initiatorReveal = 'Not revealed';
    let recipientReveal = 'Not revealed';

    const params = new URLSearchParams(window.location.search);
    const data = atob(params.get('data')); // Base64 decode

    const decodedParams = new URLSearchParams(data);

    initiatorReveal = decodedParams.get('initiatorReveal') || 'Not revealed';
    recipientReveal = decodedParams.get('recipientReveal') || 'Not revealed';

    document.getElementById('results').innerHTML = `
        <p><b>Answer from Person 1 (Initiator)</b>: ${initiatorReveal}</p>
        <p class="mb-0"><b>Answer from Person 2 (Recipient)</b>: ${recipientReveal}</p>
    `;;
}

window.onload = displayResults;
