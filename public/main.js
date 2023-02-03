    let htmlBotonCotizar = document.getElementById('cotizarBoton');
    let datosCotizacion=[];

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

    mostrarHoteles(listaHoteles);

    htmlSeleccionHotel.addEventListener('click', ()=>{
        let hotelSeleccionado=parseInt(htmlSeleccionHotel.value);
        datosHotelSeleccionado(hotelSeleccionado, listaHoteles)
        
        });
    }

    crearNumeroAdultos();
    crearNumeroNiños();
    calcular();
    
    function mostrarHoteles(hoteles) {
        hoteles.forEach(hotel => {
            createHotel(hotel);    
    });

    }

    function createHotel(hotel) {
        htmlSeleccionHotel = document.querySelector('#listaHoteles');
        contenedorHotel = document.createElement('option');
        contenedorHotel.setAttribute("value",hotel.id);
        htmlSeleccionHotel.appendChild(contenedorHotel);
        contenedorHotel.textContent = hotel.name; 
        console.log(contenedorHotel); 
    }

    function datosHotelSeleccionado(hotelSeleccionado, hoteles) {
        for(let i=0; i<hoteles.length; i++) {
            if(hotelSeleccionado===hoteles[i].id) {
      
                const datosHotelElegido = {
                    name:hoteles[i].name,
                    plan: hoteles[i].plan,
                    habitacionDoble : hoteles[i].tipoHabitacion.doble,
                    habitacionTriple : hoteles[i].tipoHabitacion.triple,
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

                    console.log(datosCotizacion);
               
                }

                if(habitacionSeleccionada==3) {
                    let valorTipoHabitacion = datosHotelElegido.habitacionTriple;
                    datosCotizacion[0] = valorTipoHabitacion;
                    console.log(datosCotizacion);   
                } 
   
             });  
        }

    function crearNumeroAdultos() {
        let htmlNumeroAdultos = document.getElementById('cantidadAdultos');
        
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
            console.log(datosCotizacion);   
        })   
    }

    function crearNumeroNiños() {
        let htmlNumeroNiños = document.getElementById('cantidadNiños');
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
            console.log(datosCotizacion);
            console.log(`La cantidad de niños son ${niños}`);  
        });

        htmlBotonCotizar.disabled = false;
    }

    function calcular(){ 
           
        if(datosCotizacion[0]!=="" && datosCotizacion[1]!=="" && datosCotizacion[2]!=="") {
            htmlBotonCotizar.addEventListener('touch', (evt)=>{
               
                evt.preventDefault();
                if(datosCotizacion[2]===0) {
                    let resultado = datosCotizacion[0] * datosCotizacion[1];
                    console.log(`El resultado es ${resultado}`);
                    if(isNaN(resultado)) {
                          
                    } else {
                        imprimirResultado(resultado);
                    }
                     
                } 
                else  {
                    let resultado = datosCotizacion[0] *datosCotizacion[1] + datosCotizacion[0] * datosCotizacion[2];
                    console.log(`El resultado es ${resultado}`);
                    if(isNaN(resultado)) {

                    } else {
                        imprimirResultado(resultado);
                    }
                      
                    
                } 
            })
        }  
    
        function imprimirResultado(resultado) {
                let formContainer = document.getElementById('form-container');
                let containerTexto = document.createElement('div');
                let texto = document.createElement('p');
                formContainer.appendChild(containerTexto);
                containerTexto.appendChild(texto);
                containerTexto.setAttribute('class', "");
                containerTexto.classList.add('w-11/12', 'm-auto', 'text-xl', 'm-auto', 'mb-4');
                texto.setAttribute('class', "");
                texto.classList.add('flex','justify-center');
                texto.textContent = `El valor de tu plan elegido es ${resultado} `;
                crearBotonLimpiar(containerTexto, texto);
                htmlBotonCotizar.disabled = true;    

                }   
            }
                     
            function crearBotonLimpiar(containerTexto, texto, resultado) {
               let contenedorBotones = document.getElementById('botons-container');
                let botonLimpiar = document.createElement('button');
                contenedorBotones.insertAdjacentElement('beforeend', botonLimpiar);
                botonLimpiar.setAttribute('class', "");
                botonLimpiar.classList.add('p-4', 'bg-primary', 'font-black', 'text-white');
                botonLimpiar.textContent = 'LIMPIAR';
                botonLimpiar.addEventListener('click', ()=>{
                borrarBotonLimpiar(contenedorBotones, botonLimpiar,containerTexto, texto, resultado);       
                });
            }

            function borrarBotonLimpiar(contenedorBotones, botonLimpiar,containerTexto, texto) {
                let formulario = document.getElementById('formulario');
                contenedorBotones.removeChild(botonLimpiar);
                containerTexto.removeChild(texto);
                formulario.reset();
                datosCotizacion=[];
                resultado=0;
                datosCotizacion[2]=0;
                initialize(datosCotizacion);
                htmlBotonCotizar.disabled = false; 
            }

       
    
            

            
           
            
           
  
    
  
           
            
   


 
    

    
    

   
    



 
