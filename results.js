function getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function displayResults() {
    const senderReveal = getURLParameter('senderReveal') || 'Not revealed';
    const recipientReveal = getURLParameter('recipientReveal') || 'Not revealed';
    const resultsHTML = `
        <p><b>Answer from Person 1 (Sender)</b>: ${senderReveal}</p>
        <p class="mb-0"><b>Answer from Person 2 (Recipient)</b>: ${recipientReveal}</p>
    `;
    document.getElementById('results').innerHTML = resultsHTML;
}

window.onload = displayResults;
