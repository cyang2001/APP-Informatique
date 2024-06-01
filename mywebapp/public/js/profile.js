document.addEventListener('DOMContentLoaded', function() {
    fetch('index.php?action=getUserInfo')
        .then(response => response.json())
        .then(data => {
            document.getElementById('usernameDisplay').innerText = data.name;
            document.getElementById('emailDisplay').innerText = data.email;
            document.getElementById('avatarDisplay').src = data.avatarPath + '?' + new Date().getTime();
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
        window.location.href = 'renewPassword_fr_1.html';
    });

    document.getElementById('editForm').addEventListener('submit', function(event) {
        event.preventDefault();
        saveEdit();
    });

    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('closeCropModal').addEventListener('click', closeCropModal);

    document.getElementById('cropSaveBtn').addEventListener('click', function() {
        cropAndSaveAvatar();
    });
});

let cropper;
let cropImageElement;

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
        <label for="editAvatar">Change Avatar (only jpg or png):</label>
        <input type="file" id="editAvatar" name="avatar" accept="image/jpeg, image/png">
        <button type="submit" class="save-btn">Save</button>
    `;
    document.getElementById('editAvatar').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            showCropModal(file);
        } else {
            alert('Invalid file format. Only jpg and png are allowed.');
        }
    });
}

function showCropModal(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('cropModal').style.display = 'block';
        cropImageElement = document.getElementById('cropImage');
        cropImageElement.src = event.target.result;
        cropper = new Cropper(cropImageElement, {
            aspectRatio: 1,
            viewMode: 1
        });
    };
    reader.readAsDataURL(file);
}

function cropAndSaveAvatar() {
    const canvas = cropper.getCroppedCanvas();
    canvas.toBlob(function(blob) {
        const formData = new FormData();
        formData.append('avatar', blob, 'avatar.jpg');
        fetch('index.php?action=uploadAvatar', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Avatar updated successfully!');
                document.getElementById('avatarDisplay').src = data.avatarPath + '?' + new Date().getTime(); // 加上时间戳以防缓存
                closeCropModal();
            } else {
                alert('Failed to update avatar.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, 'image/jpeg');
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

function closeCropModal() {
    document.getElementById('cropModal').style.display = 'none';
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
}
