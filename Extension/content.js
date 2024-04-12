
const allDataResults = []; // Array to store all scraped data

// Utility function to evaluate XPath and return the node
function getElementByXPath(xpath) {
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue;
}

// Clicks an element by XPath
function findAndClickElement(xpath) {
    const element = getElementByXPath(xpath);
    if (element) {
        element.click();
        console.log('Element clicked:', xpath);
    } else {
        console.log('Element not found:', xpath);
    }
}

// Retrieve and store text from an element by XPath
function findAndStoreText(xpath) {
    const element = getElementByXPath(xpath);
    if (element) {
        console.log('Text found:', element.textContent);
        allDataResults.push({ xpath: xpath, text: element.textContent.trim() });
    } else {
        console.log('Element not found:', xpath);
    }
}

// Main function to collect results based on account type
function checkAccountTypeAndCollectResults() {
    const accountStatement = getElementByXPath("/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/div[2]/div/div/h2");
    let isPrivateAccount = accountStatement && accountStatement.textContent.trim().toLowerCase().includes("private");

    const xpathsToUse = isPrivateAccount ? [
        "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/div[1]/div[1]",
        "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/ul/li[1]",
        '/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/ul/li[2]',
        '/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/ul/li[3]',
        '/html/body/div[8]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[2]/div/div',
    ] : [
        '/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/div[1]/div[1]/a/h2',
        "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/ul/li[1]",
        '/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/ul/li[2]',
        '/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/ul/li[3]',
    ];

    xpathsToUse.forEach(xpath => findAndStoreText(xpath));
}

// Sequence to handle clicks and text retrieval
function handleSequence() {
    findAndClickElement("/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/div[1]/div[3]/div/div");
    setTimeout(() => {
        findAndClickElement("/html/body/div[7]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div/button[5]");
        setTimeout(() => {
            findAndStoreText("/html/body/div[7]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[2]/div/div/div[2]");
            setTimeout(() => {
                findAndClickElement("/html/body/div[7]/div[1]/div/div[2]/div/div/div/div/div[2]/div/button");
                setTimeout(() => {
                    // Assuming the last step completes the data collection
                    sendDataToServer();
                }, 2000);
            }, 2000);
        }, 2000);
    }, 2000);
}

// Send collected data to server
function sendDataToServer() {
    console.log('Sending collected data to server:', allDataResults);
    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: allDataResults }),
    })
    .then(response => response.json())
    .then(data => console.log('Server response:', data))
    .catch(error => console.error('Error sending data:', error));
}

// Initial calls
setTimeout(() => {
    checkAccountTypeAndCollectResults();
    handleSequence();
}, 10000); // Delays the execution to ensure page is fully loaded
