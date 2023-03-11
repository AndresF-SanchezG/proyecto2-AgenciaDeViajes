    let htmlBotonCotizar = document.getElementById('cotizarBoton');
    let datosCotizacion=[];
    let propiedad = [];
    let destino = document.getElementById('ruta')
    let contenedorBotones = document.getElementById('botons-container');
    let nombreColumnas = document.getElementById('NombreColumnas')
    let formContainer = document.getElementById('form-container');
    let mainFormContainer = document.getElementById('main-form-container');
    let formulario = document.getElementById('formulario')
    let mainContainer = document.getElementById('main');
    let tablaPrincipal = document.getElementById('tablaOfertasHoteles');
    let htmlNumeroAdultos = document.getElementById('cantidadAdultos');
    let htmlNumeroNiños = document.getElementById('cantidadNiños');
    htmlSeleccionHotel = document.querySelector('#listaHoteles');
    let continerDecision = document.getElementById('containerDecision')

    
    initialize()
    htmlBotonCotizar.disabled = true;

    async function initialize() {
    
    let htmlSeleccionHotel = document.getElementById('listaHoteles');
    let listaHoteles = [];
    
    try {
        let productJson = await fetch('./data/hoteles.json');
        listaHoteles = await productJson.json();
       
    }

    catch (error) {
        console.log(`Error fetching data:`, error);
    }

    crearTabla(listaHoteles)
    
    mostrarHoteles(listaHoteles);
    
    htmlSeleccionHotel.addEventListener('click', ()=>{
        let hotelSeleccionado=parseInt(htmlSeleccionHotel.value);
        datosHotelSeleccionado(hotelSeleccionado, listaHoteles)
        
        });
      
       
        
    }

    crearNumeroAdultos();
    crearNumeroNiños();
    calcular();
    
    


    function crearTabla(hoteles) {
        let propiedades = Object.getOwnPropertyNames(hoteles[0]);
        propiedades.shift();
        let cantcolumnas = propiedades.length;
         
        for(let i = 0; i<cantcolumnas; i++) {  
      
            let columnas = document.createElement('div');
            destino.appendChild(columnas);
            columnas.setAttribute('id', i);  
            columnas.classList.add(`w-1/${cantcolumnas}`,'flex', 'flex-col','items-center','border-black');
            let columna =document.getElementById(i);
           
          
            columnas.textContent = propiedades[i].toUpperCase()
            nombreColumnas.insertAdjacentElement('beforeend', columnas);

        for(let j=0; j<hoteles.length;j++) {
            let textCeldas = document.createElement('div');
            textCeldas.setAttribute('id',`${i}.${j}`); 
            textCeldas.setAttribute('class',""); 
            columnas.insertAdjacentElement('beforeend', textCeldas);
            }
        }
     
        asignar(hoteles, propiedades);
    }
       
        
    function asignar(hoteles,propiedades) {
      
        for(let i=0; i<hoteles.length; i++) {
            for(let j=0; j<propiedades.length;j++) {
                (document.getElementById(`${j}.${i}`)).textContent=hoteles[i][propiedades[j]];
              
            }
            
    }

}
    function mostrarHoteles(hoteles) {
        hoteles.forEach(hotel => {
            createHotel(hotel);    
        });
    }

    function createHotel(hotel) {
        htmlSeleccionHotel = document.querySelector('#listaHoteles');
        let contenedorHotel = document.createElement('option');
        contenedorHotel.setAttribute("value",hotel.id);
        htmlSeleccionHotel.appendChild(contenedorHotel);
        contenedorHotel.textContent = hotel.name; 
         
    }

    function datosHotelSeleccionado(hotelSeleccionado, hoteles) {
        for(let i=0; i<hoteles.length; i++) {
            if(hotelSeleccionado===hoteles[i].id) {
      
                const datosHotelElegido = {
                    name:hoteles[i].name,
                    plan: hoteles[i].plan,
                    habitacionDoble : hoteles[i].doble,
                    habitacionTriple : hoteles[i].triple,
                    habitacionNiños : hoteles[i].niños,
            }
            imprimirTarifas(datosHotelElegido)  
             } 
            }      
         }

        function imprimirTarifas(datosHotelElegido, adultos) {
           console.log(adultos);
            let contenedorHotel = document.querySelector('#tipoHabitacion');
           
            contenedorHotel.addEventListener('click', ()=>{
                let habitacionSeleccionada=parseInt(contenedorHotel.value);
                if(habitacionSeleccionada==2) {
                    let valorTipoHabitacion = datosHotelElegido.habitacionDoble;
                    datosCotizacion[0] = valorTipoHabitacion;
                }

                if(habitacionSeleccionada==3) {
                    let valorTipoHabitacion = datosHotelElegido.habitacionTriple;
                    datosCotizacion[0] = valorTipoHabitacion;     
                } 
            });  
            }

    function crearNumeroAdultos() {
      
         
        for(let i=1;i<=9; i++) {
            let cantAdultos = document.createElement('option');
            htmlNumeroAdultos.appendChild(cantAdultos);
            cantAdultos.setAttribute("value",i);
            cantAdultos.textContent = i; 
        }

        htmlNumeroAdultos.addEventListener('click', ()=>{
            let adultos=parseInt(htmlNumeroAdultos.value); 
            console.log(`La cantidad de adultos son ${adultos}`);
            console.log(typeof adultos); 
            datosCotizacion[1]= adultos;
            htmlBotonCotizar.disabled = false; 
               
        })   
    }

    function crearNumeroNiños() {
   
        for(let i=0;i<=9; i++) {
            let cantNiños = document.createElement('option');
            htmlNumeroNiños.appendChild(cantNiños);
            cantNiños.setAttribute("value",i);
            cantNiños.textContent = i; 
        }
            datosCotizacion[2]=0;
            htmlNumeroNiños.addEventListener('click', ()=>{
          
            let niños=parseInt(htmlNumeroNiños.value);
            datosCotizacion[2]= niños;
            
        });
 
    }

    function calcular(){ 
        
        if(datosCotizacion[0]!=="" && datosCotizacion[1]!=="" && datosCotizacion[2]!=="") {
            htmlBotonCotizar.addEventListener('click', (evt)=>{
                contenedorBotones.remove(htmlBotonCotizar)
               formulario.style.display = 'none'
                //formContainer.remove(formulario)
                //evt.preventDefault();
                if(datosCotizacion[2]===0) {
                    let resultado = datosCotizacion[0] * datosCotizacion[1];
                   
                    if(isNaN(resultado)) {
                          
                    } else {
                        imprimirResultado(resultado);
                    }
                     
                } 
                else  {
                    let resultado = datosCotizacion[0] *datosCotizacion[1] + datosCotizacion[0] * datosCotizacion[2];
                   
                    if(isNaN(resultado)) {

                    } else {
                        imprimirResultado(resultado);
                    }
                      
                    
                } 
            })
        }  
    
    
        function imprimirResultado(resultado) {
               
                let containerTexto = document.createElement('div');
                let texto = document.createElement('p');
                mainFormContainer.appendChild(containerTexto);
                //formContainer.appendChild(containerTexto);
                containerTexto.appendChild(texto);
                containerTexto.setAttribute('class', "");
                containerTexto.classList.add('w-11/12', 'm-auto', 'text-xl', 'm-auto','mt-4', 'mb-4','border', 'border-black');
                texto.setAttribute('class', "");
                texto.classList.add('flex','justify-center');
                texto.textContent = `El valor de tu plan elegido es ${resultado} `;
             
                htmlBotonCotizar.disabled = true; 
                crearCuadroDecision(containerTexto, texto, formContainer)   

                }   
            }

            function crearCuadroDecision(containerTexto, texto, formContainer) {
                let containerDecision = document.createElement('div');
                containerDecision.setAttribute('class', '');
                containerDecision.setAttribute('id', 'containerDecision');

                containerDecision.classList.add('w-11/12','border', 'border-black','m-auto','justify-center', 'items-center', 'mb-4');
                let textoDivDecision = document.createElement('p');
                containerTexto.insertAdjacentElement('afterend', containerDecision);
                containerDecision.appendChild(textoDivDecision);
                textoDivDecision.textContent = '¿QUE DESEAS HACER?';
                textoDivDecision.setAttribute('class', '');
                textoDivDecision.classList.add('text-blue-700','flex', 'items-center', 'justify-center', 'font-bold', 'text-lg', 'mt-4');
                crearBotones(containerTexto, texto, containerDecision, textoDivDecision, formContainer);
            }

            function crearBotones(containerTexto, texto, resultado, containerDecision, textoDivDecision, formContainer) {

                let botonPagar = document.createElement('button');
                let ancleBotonPagar = document.createElement('a');
                console.log(botonPagar);
                console.log(ancleBotonPagar);
                ancleBotonPagar.setAttribute('href',"./procesoPago.html");
                botonPagar.insertAdjacentElement('afterbegin', ancleBotonPagar);
                ancleBotonPagar.textContent='PAGAR - REVISEMOS NUESTROS ACUERDOS'
                botonPagar.setAttribute('class', "");
                botonPagar.classList.add('w-11/12','rounded-md','flex','p-4', 'bg-primary', 'font-black', 'text-white','m-auto','justify-center', 'items-center','mt-4', 'mb-4','text-xs');

                containerDecision.insertAdjacentElement('afterend', botonPagar);


                let botonDejarUnMensaje = document.createElement('button');
                botonDejarUnMensaje.setAttribute('class', "");
                botonDejarUnMensaje.classList.add('w-11/12','rounded-md','flex','p-4', 'bg-primary', 'font-black', 'text-white','m-auto','justify-center', 'items-center','mt-4', 'mb-4','text-xs');
                botonDejarUnMensaje.textContent = `PREFIERO ENVIAR UN MENSAJE`
                botonPagar.insertAdjacentElement('afterend', botonDejarUnMensaje);

                let MensajeWhatsapp = document.createElement('button');
                MensajeWhatsapp.setAttribute('class', "");
                MensajeWhatsapp.classList.add('w-11/12','rounded-md','flex','p-4', 'bg-primary', 'font-black', 'text-white','m-auto','justify-center', 'items-center','mt-4', 'mb-4','text-xs');
                MensajeWhatsapp.textContent = `PREFIERO DEJAR UN MENSAJE WHATSAPP`
                botonDejarUnMensaje.insertAdjacentElement('afterend', MensajeWhatsapp);
             
                let botonNuevaCotizacion = document.createElement('button');
                botonNuevaCotizacion.setAttribute('class', "");
                botonNuevaCotizacion.classList.add('w-11/12','rounded-md','flex','p-4', 'bg-primary', 'font-black', 'text-white','m-auto','justify-center', 'items-center','mt-4', 'mb-4','text-xs');
                MensajeWhatsapp.insertAdjacentElement('afterend', botonNuevaCotizacion);
                htmlBotonCotizar.classList.remove('m-auto');
                contenedorBotones.classList.add('justify-around','mb-8');
                botonNuevaCotizacion.textContent = 'NUEVA COTIZACION';

                botonNuevaCotizacion.addEventListener('click', ()=>{
                formulario.style.display = 'block'
                nuevaCotizacion();       
                });
            }

            function nuevaCotizacion() {
               location.reload(); 
            }

    
           
            
           
  
    
  
           
            
   


 
    

    
    

   
    



 
