async function getResponse(url, options, target_lang, elements, k) {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        document.documentElement.lang = target_lang;

        let textElement = elements[k];
        textElement.innerText = result.translated_text;
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('fr').addEventListener('click', function() { //ToDo changer le elementId 'fr' par l'id du bouton de traduction
    const target_lang = 'fr'; // ToDo changer la target langue en fonction des besoins
    let elementsToTranslate = [];

    // Gather all elements that need translation
    const allElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, label, span');
    allElements.forEach(element => {
        // Check if the element has text content that needs translation
        if (element.innerText.trim().length > 0) {
            elementsToTranslate.push(element);
        }
    });

    console.log('Clicked');
    console.log(document.getElementById("welcome_message").innerText);

    const url = 'https://google-api31.p.rapidapi.com/gtranslate';
    for (let k = 0; k < elementsToTranslate.length; k++) {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '11a4ce3142msh090beb9d11565e9p1b605fjsnf4c2b8479eeb',
                'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
            },
            body: JSON.stringify({
                text: elementsToTranslate[k].innerText,
                to: target_lang,
                from_lang: document.documentElement.lang
            })
        };
        getResponse(url, options, target_lang, elementsToTranslate, k);
    }
});