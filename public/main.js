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

        let props =Object.getOwnPropertyNames(hoteles[0]);
            console.log(props)
     
        let filas = document.getElementById('NombreCeldas');
        let cantFilas = 5;
        let nombresFilas = []
    
        for(let i = 0; i<cantFilas; i++) {
            let nombreHotel = document.createElement('div');
          
            filas.insertAdjacentElement('beforeend', nombreHotel);
            
        for(let hotel in nombreHotel) {
            nombreHotel.setAttribute('id', `C${i}`);
            nombreHotel.setAttribute('class', "");
            nombreHotel.classList.add(`w-1/${cantFilas}`, 'items-center', 'justify-center','m-auto');
                 
            }
            
            nombresFilas[i] = document.getElementById(`C${i}`);
            console.log(nombresFilas)
     
        }
      
            nombresFilas[0].textContent = "NOMBRE HOTEL";
            nombresFilas[1].textContent = "TIPO PLAN";
            nombresFilas[2].textContent = "VALOR DOBLE";
            nombresFilas[3].textContent = "VALOR TRIPLE";
            nombresFilas[4].textContent = "VALOR NIÑOS";

        for(let i=0; i<hoteles.length; i++) {
            let valoresFilas = document.getElementById('valoresCeldas');
            let datosHotelesFilas = document.createElement('div')
           
            valoresFilas.insertAdjacentElement('beforeend', datosHotelesFilas);
            datosHotelesFilas.setAttribute('class', "flex");
            datosHotelesFilas.setAttribute('id', i);
           
            
               
        for(let j = 0; j<Object.getOwnPropertyNames(hoteles).length; j++) {
            let datosFilas = document.createElement('div');
            datosHotelesFilas.insertAdjacentElement('beforeend', datosFilas);
            datosFilas.setAttribute('id',`F${j}`);
            let datos = document.getElementById(`F${j}`)
            console.log(datos)
                     
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
        contenedorHotel = document.createElement('option');
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
                    habitacionDoble : hoteles[i].tipoHabitacion.doble,
                    habitacionTriple : hoteles[i].tipoHabitacion.triple,
                    habitacionTriple : hoteles[i].tipoHabitacion.niños,
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
            htmlBotonCotizar.disabled = false; 
               
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
            
        });
 
    }

    function calcular(){ 
        
        if(datosCotizacion[0]!=="" && datosCotizacion[1]!=="" && datosCotizacion[2]!=="") {
            htmlBotonCotizar.addEventListener('click', (evt)=>{
               
                evt.preventDefault();
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
                initialize();
                //htmlBotonCotizar.disabled = false; 
            }

        
    
        

            
           
            
           
  
    
  
           
            
   


 
    

    
    

   
    



 
