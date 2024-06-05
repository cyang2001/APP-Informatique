document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    const passwordInput = document.getElementById('password');
    const passwordRequirements = {
        length: document.getElementById('rule-length'),
        complexity: document.getElementById('rule-complexity'),
        identical: document.getElementById('rule-identical'),
        unique: document.getElementById('rule-unique')
    };
    const togglePasswordButton = document.getElementById('toggle-password-visibility');
    const cguAccepted = document.getElementById('cgu-box');

    const updateUI = (rulesStatus) => {
        const statusClasses = {
            default: '',
            success: 'success',
            error: 'error'
        };

        let allSuccess = true;

        Object.keys(rulesStatus).forEach((key) => {
            const status = rulesStatus[key];
            const element = passwordRequirements[key];
            element.className = statusClasses[status];

            if (status !== 'success') {
                allSuccess = false;
            }
        });

        if (allSuccess) {
            passwordInput.classList.remove('error-border');
        } else {
            passwordInput.classList.add('error-border');
        }
    };

    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const email = document.getElementById('email').value;
        const passwordStrength = calcPasswordStrength(password, { email: email });
        updateUI(passwordStrength);
    });

    form.addEventListener('submit', function(event) {
        const password = passwordInput.value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const email = document.getElementById('email').value;

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return false;
        }

        if (!cguAccepted.checked) {
            alert("Vous devez accepter les conditions générales d'utilisation.");
            event.preventDefault();
            return false;
        }

        const passwordStrength = calcPasswordStrength(password, { email: email });
        const isPasswordStrong = Object.values(passwordStrength).every(status => status === 'success');

        if (!isPasswordStrong) {
            alert("La force du mot de passe est insuffisante.");
            return false;
        }

        event.preventDefault(); // prevent the form from submitting

        const formData = new FormData(form);
        fetch('index.php?action=register', {
            method: 'POST',
            body: formData  
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  
        })
        .then(data => {
            if (data.success) {
                alert('Inscription réussie!');
                window.location.href = 'login_fr.html';
                // redirect to login page or home page
            } else {
                alert('Erreur: ' + data.message);
                // display error message
            }
        });
    });

    togglePasswordButton.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    });
});

const calcPasswordStrength = (password = '', options = {}) => {
    const { email = '' } = options;
    const rulesStatus = {
        length: 'default',
        complexity: 'default',
        identical: 'default',
        unique: 'default',
    };

    if (password.length >= 8 && password.length <= 16) {
        rulesStatus.length = 'success';
    } else {
        rulesStatus.length = 'error';
    }

    if (
        /(?=.*[a-z])/.test(password) &&
        /(?=.*[A-Z])/.test(password) &&
        /(?=.*[-_~!@#$%^&*=+()[\]{}])/.test(password)
    ) {
        rulesStatus.complexity = 'success';
    } else {
        rulesStatus.complexity = 'error';
    }

    const emailArray = email.split('@') || [];
    if (!email || password !== emailArray[0]) {
        rulesStatus.unique = 'success';
    } else {
        rulesStatus.unique = 'error';
    }

    const isRepeat = calcPasswordRepeat(password);
    if (!isRepeat) {
        rulesStatus.identical = 'success';
    } else {
        rulesStatus.identical = 'error';
    }

    return rulesStatus;
};

const calcPasswordRepeat = password => {
    let isRepeat = false;
    const repeat = {};
    for (let index = 0; index < password.length; index++) {
        const preIndex = index - 1 < 0 ? 0 : index - 1;
        const preStr = repeat[preIndex] || '';
        const preStrLastLetter = preStr[preStr.length - 1] || '';
        const currentLetter = password[index];
        const preStrLastLetterCharCode = preStrLastLetter.charCodeAt();
        const curCharCode = currentLetter.charCodeAt();

        if (curCharCode - preStrLastLetterCharCode === 1) {
            if (preStr.length <= 1) {
                repeat[index] = `${preStr}${currentLetter}`;
            } else {
                let start = 0;
                for (let j = preStr.length - 2; j > 0; j--) {
                    if (preStr[j + 1].charCodeAt() - preStr[j].charCodeAt() !== 1) {
                        start = j + 1;
                        break;
                    }
                }
                const result = `${preStr.substring(start,)}${currentLetter}`;
                repeat[index] = result;
                if (result.length >= 4) {
                    isRepeat = true;
                }
            }
        } else if (currentLetter === preStrLastLetter) {
            let repeatStart = 0;
            for (let j = preStr.length - 1; j > 0; j--) {
                if (preStr[j] !== currentLetter) {
                    repeatStart = j + 1;
                    break;
                }
            }
            const result = `${preStr.substring(repeatStart,)}${currentLetter}`;
            repeat[index] = result;
            if (result.length >= 4) {
                isRepeat = true;
            }
        } else if (preStrLastLetterCharCode - curCharCode === 1) {
            if (preStr.length <= 1) {
                repeat[index] = `${preStr}${currentLetter}`;
            } else {
                let start = 0;
                for (let j = preStr.length - 2; j > 0; j--) {
                    if (preStr[j].charCodeAt() - preStr[j + 1].charCodeAt() !== 1) {
                        start = j + 1;
                        break;
                    }
                }
                const result = `${preStr.substring(start,)}${currentLetter}`;
                repeat[index] = result;
                if (result.length >= 4) {
                    isRepeat = true;
                }
            }
        } else {
            repeat[index] = currentLetter;
        }
    }
    return isRepeat;
};