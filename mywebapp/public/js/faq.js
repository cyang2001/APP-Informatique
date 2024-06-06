
document.addEventListener("DOMContentLoaded", function() {
    const allCross = document.querySelectorAll('.visible-pannel img');

    allCross.forEach(element => {
        element.addEventListener('click', function() {

            const height = this.parentNode.parentNode.childNodes[3].scrollHeight;

            const currentChoice = this.parentNode.parentNode.childNodes[3]

            if (this.src.includes('croix')) {
                this.src = "./source/moins.png"; 
                gsap.to(currentChoice, {duration:0.2, height: height + 40, opacity: 1,padding: "20px 15px" })
            } else if (this.src.includes('moins')) {
                this.src = "./source/croix.png"; 
                gsap.to(currentChoice, {duration:0.2, height: 0, opacity: 0,padding: "0px 15px" })

            }
        });
    });
});
window.onload = function() {
    fetch('index.php?action=getUserInfo', {
        method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => { 
        console.log(data);  
        const menu = document.querySelector('.menu-deroulant div');
        menu.innerHTML = ''; 
        
        if (data.email) {
            menu.innerHTML = '<a href="#" id="logout">Se déconnecter</a>';
            document.getElementById('logout').addEventListener('click', function(event) {
                event.preventDefault();
                fetch('index.php?action=logout', {
                    method: 'GET'
                })
                .then(() => location.reload());
            });
        } else {
            menu.innerHTML = '<a href="./login_fr.html">Se connecter</a><a href="./register_fr.html">S\'inscrire</a>';
        }
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });

};


window.addEventListener('beforeunload', function(event) {
    fetch('index.php?action=logout', {
        method: 'GET'
    }).catch(error => console.error('Error on logout:', error));
});
function handleMenuButtonClick() {
    var checkbox = document.getElementById('menu_toggle');
    checkbox.checked = !checkbox.checked;
}

document.addEventListener('DOMContentLoaded', function() {


    fetch('index.php?action=getUserInfo')
        .then(response => response.json())
        .then(data => {
            console.log('User info:', data);

            const userAccessLevel = data.accessLevel !== undefined ? data.accessLevel : 0;
            console.log(userAccessLevel)
            loadMenu(userAccessLevel);
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            alert('An error occurred while fetching user info. Please try again later.');
        });


    function loadMenu(userAccessLevel) {
        fetch('index.php?action=getPages')
            .then(response => response.json())
            .then(data => {
                console.log('Pages:', data);
                const menuBox = document.querySelector('.menu_box');
                menuBox.innerHTML = ''; 
                data.forEach(page => {
                    if (userAccessLevel >= page.ID_ACCESS_LEVEL) {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.className = 'menu_item';
                        a.href = page.PAGE_URL;
                        a.textContent = page.PAGE_NAME;
                        li.appendChild(a);
                        menuBox.appendChild(li);
                        console.log('Appended item:', a);
                    }
                });
            })
            .catch(error => {
                console.error('Error loading pages:', error);
                alert('An error occurred while loading pages. Please try again later.');
            });
    }
});

