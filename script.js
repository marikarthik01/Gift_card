

function validateGiftCard() {
    const enteredCardNumber = document.getElementById('giftCardNumber').value;
    const url = 'https://etesting.space/wp-json/wc-pimwick/v1/pw-gift-cards';
    const username = 'ck_ad713bc399f8d63da81a3583057b3e7b3d0899d4';
    const password = 'cs_ee0259074bde553ce2008e6e0cd3994f99da77d5';

    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': basicAuth,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let cardFound = false;

        for (const card of data) {
            if (card.number === enteredCardNumber) {
                cardFound = true;

                if (card.balance !== null && card.balance >= 1) {
                    console.log('Valid Card. Balance:', card.balance);
                    document.getElementById('result').innerText = `Balance: ${card.balance}`;
                    document.getElementById('status').innerText = `Card is valid`;
                    document.getElementById('status').style.color = 'green';

                    // Use fetch API for AJAX request
                     fetch('save_card.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `cardNumber=${card.number}&balance=${card.balance}`,
                    })
                    .then(response => response.text())
                    .then(result => {
                        console.log(result);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                } else {
                    console.log('Invalid Card. Balance is null.');
                    document.getElementById('status').innerText = `Invalid card`;
                    document.getElementById('result').innerText = `Balance: Null`;
                    document.getElementById('status').style.color = 'red';
                }
                

                break; // Exit the loop once the card is found
            }
        }

        if (!cardFound) {
            console.log('Card not found in the response');
            document.getElementById('status').innerText = `Card not found`;
            document.getElementById('status').style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
