/*
class hoteles {
    constructor ({
        nombre,
        plan,
        doble,
        triple,
    })
        {
            this.nombre = nombre;
            this.plan = plan;
            this.doble = doble;
            this.triple = triple
        }
       
}

const hotelAzuanZuites = new hoteles ({
    name: "HOTEL AZUAN SUITES",
    plan: "Desayuno",
    doble: 849000,
    triple: 849000  
})

const hotelCostaDelSol = new hoteles ({
    name: "COSTA DEL SOL",
    plan: "Desayunos, Almuerzos, Comidas",
    doble: 1039000,
    triple: 1129000  
})*/

const $form = document.querySelector('#form');
$form.addEventListener('submit', (event)=>{
    event.preventDefault();
    let seleccionarHotel = document.querySelector('#seleccion-hotel').value;
    let seleccionHabitacion = document.querySelector('#seleccion-habitacion').value;
    let cantAdultos = document.querySelector('#cantidadAdultos').value;
    let cantNiños = document.querySelector('#CantNiños').value;
    console.log(seleccionHabitacion, seleccionarHotel, cantAdultos, cantNiños);
});