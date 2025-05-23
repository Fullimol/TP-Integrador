const agregarButton = document.getElementById("agregar-button");
const volverButton = document.getElementById("volver-button");

agregarButton.addEventListener('click', () =>{
    alert("Acción de agregar producto")
})

volverButton.addEventListener('click', ()=>{
    window.location.href = "dashboard.html";
})