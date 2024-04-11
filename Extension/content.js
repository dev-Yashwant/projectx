// Function to get element by XPath
function getElementByXPath(xpath) {
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue;
}

function checkAccountTypeAndSendResults() {
    let isPrivateAccount;

    const accountStatement = getElementByXPath("/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/div[2]/div/div/h2");

    if (accountStatement) {
        const statementText = accountStatement.textContent.trim().toLowerCase();
        if (statementText.includes("private")) {
            isPrivateAccount = true;
        } else {
            isPrivateAccount = false;
        }
    } else {
        isPrivateAccount = false;
    }

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

    xpathsToUse.forEach(function(xpath) {
        const element = getElementByXPath(xpath);

        if (element) {
            console.log("Element found:", element.textContent);

            fetch('http://localhost:3000/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ xpathResult: element.textContent }), 
            })
            .then(response => {
                if (response.ok) {
                    console.log('Data sent successfully');
                } else {
                    console.error('Failed to send data:', response.status);
                }
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
        } else {
            // Element not found
            console.log("Element not found for XPath:", xpath);
        }
    });
}


setTimeout(checkAccountTypeAndSendResults, 10000); // Runs after 100 seconds



{/*-------------------------------------------------------------------------------------*/ }


// XPath of the elements to be clicked and the element to retrieve text from
const xpathClick1 = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/div[1]/div[3]/div/div";
const xpathClick2 = "/html/body/div[7]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div/button[5]";
const xpathText = "/html/body/div[7]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[2]/div/div/div[2]";
const xpathClick3 = "/html/body/div[7]/div[1]/div/div[2]/div/div/div/div/div[2]/div/button"
function findAndClickElement(xpath) {
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const element = result.singleNodeValue;

    if (element) {
        element.click();
        console.log('Element clicked:', xpath);
    } else {
        console.log('Element not found:', xpath);
    }
}

function findAndRetrieveText(xpath) {
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const element = result.singleNodeValue;

    if (element) {
        console.log('Text found:', element.textContent);
        
        fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ xpathResult: element.textContent }), 
        })
        .then(response => {
            if (response.ok) {
                console.log('Data sent successfully');
            } else {
                console.error('Failed to send data:', response.status);
            }
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    } else {
        console.log('Element not found:', xpath);
        return '';
    }
}

setTimeout(() => {
    findAndClickElement(xpathClick1); 
    setTimeout(() => {
        findAndClickElement(xpathClick2); 
        setTimeout(() => {
            findAndRetrieveText(xpathText); 
                setTimeout(() => {
                findAndClickElement(xpathClick3); 
                }, 2000); 
        }, 2000); 
    }, 2000); 
}, 2000); 
