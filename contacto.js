

let inputEmail = document.getElementById('email-account');
let fieldset = document.getElementById('optionsBoxContact');
let form = document.getElementById('mainForm');
let contenedorFormularios = document.getElementById('formsContainer');


inputEmail.addEventListener('click',()=>{
    console.log(inputEmail.value);
    form.remove(fieldset);
    let newForm = document.createElement('form');
    let label = document.createElement('label');
    let label2 = document.createElement('label');
    let inputName = document.createElement('input');
    let inputName2 = document.createElement('input');
    newForm.setAttribute('action', '/procesar-formulario');
    newForm.setAttribute('method', '/post');

    contenedorFormularios.insertAdjacentElement('afterend', newForm);
    newForm.appendChild(label);

    label.insertAdjacentElement('afterend', label2);
    label.appendChild(inputName);
    label2.appendChild(inputName2);
    label.setAttribute('for', 'first-name');
    label.setAttribute('id', 'first-name');


    inputName.setAttribute('id', 'first-name');
    inputName.setAttribute('name', 'first-name');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('required', "");
    inputName.setAttribute('placeholder', "Ingresa tu nombre");
    inputName.setAttribute('class', "border border-black");
    form.classList.add('w-full', 'mt-1', 'h-full', 'flex', 'justify-center', 'items-center');
    fieldset.classList.add('w-11/12', 'justify-center', 'items-center', 'flex', 'flex-col');
    label.classList.add('w-full', 'justify-center', 'items-center', 'flex');

    label2.setAttribute('for', 'email');
    label2.setAttribute('id', 'email');
    inputName2.setAttribute('id', 'email');
    inputName2.setAttribute('name', 'email');
    inputName2.setAttribute('type', 'email');
    inputName2.setAttribute('required', "");
    inputName2.setAttribute('placeholder', "Ingresa tu email");
    inputName2.setAttribute('class', "border border-black");
    label2.classList.add('w-full', 'justify-center', 'items-center', 'flex', 'mt-4');

    let contendorBotonesContactos = document.createElement('div');
    let botonEnviarDatos = document.createElement('button');
    let optionsContactReset = document.createElement('button');
    contendorBotonesContactos.appendChild(botonEnviarDatos);
    contendorBotonesContactos.appendChild(optionsContactReset);
    label2.insertAdjacentElement('afterend', contendorBotonesContactos);



    contendorBotonesContactos.setAttribute('class', "");
    contendorBotonesContactos.classList.add('w-full', 'm-auto','flex', 'mt-4','justify-between', 'items-center', 'mx-auto','p-12');
    contendorBotonesContactos.setAttribute('id', "containerButtonsSend");
    botonEnviarDatos.textContent ='Enviar';
    optionsContactReset.textContent ='Regresar';
    botonEnviarDatos.setAttribute('class', "");
    botonEnviarDatos.setAttribute('type', "submit");
    optionsContactReset.setAttribute('class', "");
    botonEnviarDatos.classList.add('bg-primary', 'w-14','h-6','p-4', 'text-white', 'font-black', 'm-auto');
    optionsContactReset.classList.add('bg-primary', 'w-14','p-4', 'text-white', 'font-black', 'm-auto');
    optionsContactReset.setAttribute('id', "buttonBack");

    optionsContactReset.addEventListener('click', ()=>{
        location.reload();

    })

})

// const pool = ('./libs/postgres.js');
// const express = require('express');
// const port = process.env.PORT || 3000;

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));


//   app.post('/procesar-formulario', (req, res) => {
//     const { email, firstName } = req.body;
//     const query = 'INSERT INTO usuarios (email, nombre) VALUES ($1, $2)';
//     pool.query(query, [email, firstName], (error, result) => {
//         if (error) {
//             console.log(error);
//             res.send('Error en el servidor');
//         } else {
//             console.log(result);
//             res.send('Datos insertados correctamente');
//         }
//     });
// });





// app.listen(port, () => {
//   console.log('Servidor iniciado en el puerto 3000');
// });
