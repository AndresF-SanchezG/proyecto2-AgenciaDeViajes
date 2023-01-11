const botonCotizar = document.querySelector('#botonCotizar');
botonCotizar.addEventListener('click', cotizacion);

function cotizacion() {
    
    const cotizar = document.createElement('div');
    const datos = document.querySelector('#CantNiños');
    const textDiv = document.createElement('p');
    const textCotization = document.createTextNode("El valor de su cotizacion correspondiente al plan elegido es ");
    
    $form.appendChild(cotizar);
    cotizar.appendChild(textDiv);
    textDiv.appendChild(textCotization); 
}

    
    


