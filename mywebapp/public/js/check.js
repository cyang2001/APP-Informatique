function check(form) {

    if(form.email.value=='') {
    
    alert("Please enter your user account!");
    
    form.email.focus();
    
    return false;
    
    }
    
    if(form.password.value==''){
    
    alert("Please enter your password!");
    
    form.password.focus();
    
    return false;
    
    }
    
    return true;
    
    }