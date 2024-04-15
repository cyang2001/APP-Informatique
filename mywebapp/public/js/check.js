function check(form) {

    if(form.email.value=='') {
    
    alert("Please enter your user account!");
    
    form.email.focus();
    console.log("email");
    return false;
    
    }

    if(form.password.value==''){
    
    alert("Please enter your password!");
    
    form.password.focus();
    
    return false;
    console.log("password");
    }
    
    return true;
    
    }