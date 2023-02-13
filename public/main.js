    let htmlBotonCotizar = document.getElementById('cotizarBoton');
    let datosCotizacion=[];
    let propiedad = [];
    let destino = document.getElementById('ruta')
    let nombreColumnas = document.getElementById('NombreColumnas')
    
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
        //let columnas = document.getElementById('NombreCeldas');
        let cantcolumnas = propiedades.length;
        console.log(cantcolumnas)
    
        for(let i = 0; i<cantcolumnas; i++) {
            let nombreHotel = document.createElement('div');
            //columnas.insertAdjacentElement('beforeend', nombreHotel);
            destino.appendChild(nombreHotel);
            //nombreHotel.setAttribute('id', `C${i}`);
            nombreHotel.setAttribute('id', i);  
            //console.log(nombreHotel)
            nombreHotel.classList.add(`w-1/${cantcolumnas}`,'flex')
           let nombreColumna = document.getElementById(i);
           nombreColumna.textContent = propiedades[i]
            console.log(nombreColumna)
            nombreColumnas.insertAdjacentElement('beforeend', nombreColumna);  
        }
        for(let i=0; i<hoteles.length; i++) {
            let valoresFilas = document.getElementById('valoresCeldas');
            let datosHotelesFilas = document.createElement('div')
            valoresFilas.insertAdjacentElement('beforeend', datosHotelesFilas);
            
            datosHotelesFilas.setAttribute('class', "flex");
            datosHotelesFilas.classList.add('justify-between');
            datosHotelesFilas.setAttribute('id', i);
         
        for(let j = 0; j<Object.getOwnPropertyNames(hoteles).length; j++) {
            let datosFilas = document.createElement('div');
            datosHotelesFilas.insertAdjacentElement('beforeend', datosFilas);
            datosFilas.setAttribute('id',`${i}.${j}`);
            datosFilas.classList.add();
            
            }
            
        
        }
        asignar(hoteles, propiedades)
        
    } 
    

    
    function asignar(hoteles,propiedades) {
        for(let id=0; id<hoteles.length; id++) {
            let variable = document.getElementById(id);
            
            //console.log(variable);
            for(let property =0; property<propiedades.length; property++) {
                let subVariable = document.getElementById(`${id}.${property}`);
                subVariable.textContent = hoteles[id][propiedades[property]];
                
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

        
    
        

            
           
            
           
  
    
  
           
            
   


 
    

    
    

   
    



 
