function getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function displayResults() {
    const senderReveal = getURLParameter('senderReveal') || 'Not revealed';
    const recipientReveal = getURLParameter('recipientReveal') || 'Not revealed';
    const resultsHTML = `
        <p>Answer from Person 1 (Sender): ${senderReveal}</p>
        <p>Answer from Person 2 (Recipient): ${recipientReveal}</p>
    `;
    document.getElementById('results').innerHTML = resultsHTML;
}

window.onload = displayResults;
