document.addEventListener('DOMContentLoaded', function() {
    fetch('index.php?action=getUserInfo')
        .then(response => response.json())
        .then(data => {
            document.getElementById('usernameDisplay').innerText = data.name;
            document.getElementById('emailDisplay').innerText = data.email;
            document.getElementById('avatarDisplay').src = data.avatarPath;
            document.getElementById('usernameValue').innerText = data.name;
            document.getElementById('emailValue').innerText = data.email;
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });

    document.getElementById('editUsernameBtn').addEventListener('click', function() {
        startEdit('username', 'Username', document.getElementById('usernameValue').innerText);
    });

    document.getElementById('editEmailBtn').addEventListener('click', function() {
        startEdit('email', 'Email', document.getElementById('emailValue').innerText);
    });

    document.getElementById('editAvatarBtn').addEventListener('click', function() {
        startEditAvatar();
    });

    document.getElementById('editPasswordBtn').addEventListener('click', function() {
        startEdit('password', 'Password', '');
    });

    document.getElementById('editForm').addEventListener('submit', function(event) {
        event.preventDefault();
        saveEdit();
    });

    document.getElementById('closeModal').addEventListener('click', closeModal);

    function startEdit(field, label, value) {
        document.getElementById('editModal').style.display = 'block';
        document.getElementById('editLabel').innerText = 'Edit ' + label + ':';
        document.getElementById('editInput').name = field;
        document.getElementById('editInput').type = field === 'password' ? 'password' : 'text';
        document.getElementById('editInput').value = value;
    }

    function startEditAvatar() {
        document.getElementById('editModal').style.display = 'block';
        const form = document.getElementById('editForm');
        form.innerHTML = `
            <label for="editAvatar">Change Avatar:</label>
            <input type="file" id="editAvatar" name="avatar" accept="image/*">
            <button type="submit" class="save-btn">Save</button>
        `;
    }

    function saveEdit() {
        const formData = new FormData(document.getElementById('editForm'));
        const action = formData.get('avatar') ? 'uploadAvatar' : 'updateProfile';

        fetch('index.php?action=' + action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Update successful!');
                location.reload();
            } else {
                alert('Update failed.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function closeModal() {
        document.getElementById('editModal').style.display = 'none';
    }

    function togglePasswordVisibility() {
        const passwordField = document.getElementById('passwordDisplay');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    }
});
