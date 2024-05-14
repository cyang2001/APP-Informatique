window.addEventListener("DOMContentLoaded", (event) => {

    inputs = document.querySelectorAll("input[type=\"text\"], textearea");

    inputs.forEach(e =>{
        e.addEventListener("click", function () {
            e.style.BoxShadow = "0 0 5px 0";
        })
    })
});