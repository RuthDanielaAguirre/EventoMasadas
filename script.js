
function cargarJSON(){
    fetch('./conceptos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data =>{
        const listaConceptos = document.getElementById('lista-conceptos');

        if (!listaConceptos) {
            console.error("No se encontró el elemento con id 'lista-conceptos' en el DOM.");
            return;
        }
        data.conceptos_sostenibilidad.forEach(concepto => {

            const container = document.createElement('div');
            container.classList.add('concepto');

            const nombreDiv =document.createElement('div');
            nombreDiv.classList.add('nombre');
            nombreDiv.textContent = concepto.nombre;

            const descripcionDiv = document.createElement('div');
            descripcionDiv.classList.add('descripcion');
            descripcionDiv.textContent = concepto.descripcion;

           


            container.appendChild(nombreDiv);
            container.appendChild(descripcionDiv);

            listaConceptos.appendChild(container);
        });
    })
    .catch(error => console.error('Error al cargar JSON:', error));
}

//document.addEventListener('DOMContentLoaded', cargarJSON);




function cargarXML(){
    fetch('./objetivos.xml')
    .then(response => response.text() )
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
        const listaObjetivos =document.getElementById('lista-objetivos');
        const objetivos = data.getElementsByTagName('objetivo');
        Array.from(objetivos).forEach(objetivo =>{
            const numero = objetivo.getElementsByTagName('numero')[0].textContent;
            const nombre = objetivo.getElementsByTagName('nombre')[0].textContent;
            const descripcion = objetivo.getElementsByTagName('descripcion')[0].textContent;

            const li =document.createElement('li');
            li.innerHTML = `Objetivo ${numero}:<br> ${nombre}<br>${descripcion}`;
            listaObjetivos.appendChild(li);
        });
    })
    .catch(error => console.error('Error al cargar XML:', error));
}

// function marcos(){
//     fetch('./objetivos.xml')
//     .then(response => response.text() )
//     .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
//     .then(data => {
//         const selectElement = document.getElementById("miSelect");
//         const objetivos = data.getElementsByTagName('objetivo');
//         Array.from(objetivos).forEach(objetivo =>{
//             const numero = objetivo.getElementsByTagName('numero')[0].textContent;
//             const nombre = objetivo.getElementsByTagName('nombre')[0].textContent;
               
//             console.log("XML cargado correctamente");
//           const optionElement = document.createElement("option");
//           optionElement.value = numero;
//           optionElement.textContent = nombre;
//           selectElement.appendChild(optionElement);


//           console.log(`Creando opción - Número: ${numero}, Nombre: ${nombre}`); // Confirmación de cada opción creada

//         });

//           selectElement.addEventListener("change", function(){
//             const valorSeleccionado = selectElement.value;
          
//             const contenidoDiv = document.getElementById("contenido");
//             contenidoDiv.textContent = "";

//             Array.from(objetivos).forEach(objetivo => {
//                 const numero = objetivo.getElementsByTagName("numero")[0].textContent;
//                 if(numero===valorSeleccionado){
//                     const descripcion= objetivo.getElementsByTagName("descripcion")[0].textContent;
//                     console.log("Descripción encontrada:", descripcion);
//                     contenidoDiv.textContent =descripcion;
                   
//                 }
//             });
//           });


        
//     })
//     .catch(error => console.error('Error al cargar XML:', error));
// }
    window.onload = function(){
        cargarJSON();
        cargarXML();
        // marcos();
    };
