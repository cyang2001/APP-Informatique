document.addEventListener('DOMContentLoaded', function() {
    var cards = [
        {nome: "mastercard", colore: "#1ab7ff", src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"},
        {nome: "visa", colore: "#1ab7ff", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2000px-Visa_Inc._logo.svg.png"},
        {nome: "dinersclub", colore: "#1ab7ff", src: "https://seeklogo.com/images/D/Diners_Club-logo-6B1B8635A2-seeklogo.com.png"},
        {nome: "americanExpress", colore: "#1ab7ff", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/600px-American_Express_logo.svg.png"},
        {nome: "discover", colore: "#1ab7ff", src: "https://lendedu.com/wp-content/uploads/2016/03/discover-it-for-students-credit-card.jpg"},
        {nome: "dankort", colore: "#1ab7ff", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Dankort_logo.png"}
    ];

    var html = document.querySelector('html');
    var number = "";
    var cvc = "";
    var month = "";
    var year = "";
    var name = "";
    var selected_card = -1;

    document.addEventListener('click', function(e) {
        if (!e.target.matches(".ccv") || !e.target.closest(".ccv")) {
            document.querySelector(".card").style.transform = "rotateY(0deg)";
            document.querySelector(".seccode").style.color = "var(--text-color)";
        }
        if (!e.target.matches(".expire") || !e.target.closest(".expire")) {
            document.querySelector(".date_value").style.color = "var(--text-color)";
        }
        if (!e.target.matches(".number") || !e.target.closest(".number")) {
            document.querySelector(".card_number").style.color = "var(--text-color)";
        }
        if (!e.target.matches(".inputname") || !e.target.closest(".inputname")) {
            document.querySelector(".fullname").style.color = "var(--text-color)";
        }
    });

    document.querySelector(".number").addEventListener('input', function(event) {
        var formattedNumber = this.value.replace(/\s/g, '').substring(0, 16);

        var visibleNumber = "";
        for (var i = 0; i < formattedNumber.length; i++) {
            if (i > 0 && i % 4 === 0) {
                visibleNumber += " ";
            }
            visibleNumber += formattedNumber[i];
        }
        document.querySelector(".card_number").textContent = visibleNumber;

        number = formattedNumber;

        if (number.length >= 2) {
            if (parseInt(number.substring(0, 2)) > 50 && parseInt(number.substring(0, 2)) < 56) {
                selected_card = 0;
            } else if (parseInt(number.substring(0, 1)) == 4) {
                selected_card = 1;
            } else if (parseInt(number.substring(0, 2)) == 36 || parseInt(number.substring(0, 2)) == 38 || parseInt(number.substring(0, 2)) == 39) {
                selected_card = 2;
            } else if (parseInt(number.substring(0, 2)) == 34 || parseInt(number.substring(0, 2)) == 37) {
                selected_card = 3;
            } else if (parseInt(number.substring(0, 2)) == 65) {
                selected_card = 4;
            } else if (parseInt(number.substring(0, 4)) == 5019) {
                selected_card = 5;
            } else {
                selected_card = -1;
            }

            if (selected_card != -1) {
                html.style.setProperty("--card-color", cards[selected_card].colore);
                document.querySelector(".bankid").src = cards[selected_card].src;
                document.querySelector(".bankid").style.display = "block";
            } else {
                html.style.setProperty("--card-color", "#cecece");
                document.querySelector(".bankid").src = "";
                document.querySelector(".bankid").style.display = "none";
            }
        }

        if (document.querySelector(".card_number").textContent.length === 0) {
            document.querySelector(".card_number").innerHTML = "&#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF;";
        }
    });

    document.querySelector(".number").addEventListener('keydown', function(event) {
        if (this.value.length >= 16 && event.key !== "Backspace") {
            event.preventDefault();
        }
    });

    document.querySelector(".ccv").addEventListener('focus', function(event) {
        document.querySelector(".card").style.transform = "rotateY(180deg)";
        document.querySelector(".seccode").style.color = "white";
    });

    document.querySelector(".ccv").addEventListener('blur', function(event) {
        document.querySelector(".card").style.transform = "rotateY(0deg)";
        document.querySelector(".seccode").style.color = "var(--text-color)";
    });

    document.querySelector(".ccv").addEventListener('input', function(event) {
        var formattedCvc = this.value.replace(/\s/g, '').substring(0, 3);
        this.value = formattedCvc;
        cvc = formattedCvc;

        if (cvc.length === 0) {
            document.querySelector(".seccode").innerHTML = "&#x25CF;&#x25CF;&#x25CF;";
        } else {
            document.querySelector(".seccode").textContent = cvc;
        }
    });

    document.querySelector(".expire").addEventListener('input', function(event) {
        var formattedDate = this.value.replace(/\D/g, '').substring(0, 6);
        var monthYear = formattedDate.match(/.{1,2}/g);
        var month = monthYear[0] || '';
        var year = monthYear[1] || '';

        if (month.length === 2 && parseInt(month) >= 1 && parseInt(month) <= 12) {
            if (year.length === 2 || year.length === 4) {
                var formattedDateValue = month + " / " + year;
                document.querySelector(".date_value").textContent = formattedDateValue;
            }
        } else {
            document.querySelector(".date_value").textContent = "";
        }
    });

    document.querySelector(".expire").addEventListener('keydown', function(event) {
        if (this.value.length >= 5 && event.key !== "Backspace") {
            event.preventDefault();
        }
    });

    document.querySelector(".inputname").addEventListener('input', function(event) {
        document.querySelector(".fullname").textContent = this.value;
        name = this.value;

        if (name.length === 0) {
            document.querySelector(".fullname").textContent = "NOM COMPLET";
        }
    });

    document.querySelector(".inputname").addEventListener('keydown', function(event) {
        if (this.value.length >= 50 && event.key !== "Backspace") {
            event.preventDefault();
        }
    });

    document.querySelector("#payButton").addEventListener('click', function() {
        fetch('index.php?action=updateOrga', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                window.location.href = 'homePage.html';
            } else {
                console.error('Update failed:', data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
