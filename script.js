
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
            li.innerHTML = `<strong>Objetivo ${numero}:</strong> ${nombre}-${descripcion}`;
            listaObjetivos.appendChild(li);
        });
    })
    .catch(error => console.error('Error al cargar XML:', error));
}
    window.onload = function(){
        cargarJSON();
        cargarXML();
    };
