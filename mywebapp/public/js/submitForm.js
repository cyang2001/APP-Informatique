document.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.querySelector('.btn');
  if (submitButton) {
      submitButton.addEventListener('click', function() {
          if (document.getElementById('login-form')) {
          var form = document.getElementById('login-form');
          } else if (document.getElementById('register-form')) {
          var form = document.getElementById('register-form');
          }
          if (form) { 
              form.submit();
          }
      });
  }
});
