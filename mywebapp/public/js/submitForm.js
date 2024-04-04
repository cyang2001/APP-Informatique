document.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.querySelector('.btn');
  if (submitButton) {
      submitButton.addEventListener('click', function() {
          var form = document.getElementById('login-form');
          if (form) { 
              form.submit();
          }
      });
  }
});
