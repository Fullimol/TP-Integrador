/*
Se usa típicamente para funciones reutilizables o herramientas auxiliares que no dependen de una página específica. Ejemplos:
- Formateo de fechas.
- Validación de formularios.
- Funciones matemáticas comunes.
- Manipulación de strings.

*/

// al dar click en "Salir" borro el nombre del localStorage
const btnSalir = document.querySelector('.salir-button');
btnSalir.addEventListener('click', () => {
    localStorage.removeItem('nombre');
});