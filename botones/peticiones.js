let peticionPaso = 0;

// REINICIO SEGURO DEL CONTENIDO
const content = document.getElementById("content");
content.innerHTML = ''; // LIMPIA TODO

// CONTENIDO NUEVO DESDE CERO
const container = document.createElement('div');
container.style.cssText = `
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background: url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/pergamino.png') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  box-sizing: border-box;
`;

container.innerHTML = `
  <div id="preguntaInicial" style="text-align:center;">
    <h2>🙏 Petición o Necesidad</h2>
    <p>¿Asistes a una congregación?</p>
    <div style="display:flex;gap:20px;justify-content:center;">
      <button id="btnSi" style="padding:10px 20px;font-size:16px;">Sí</button>
      <button id="btnNo" style="padding:10px 20px;font-size:16px;">No</button>
    </div>
  </div>
  <div id="formArea" style="width:100%;max-width:600px;margin-top:20px;"></div>
  <button id="btnVolver" style="
    margin-top:30px;
    padding:10px 20px;
    font-size:16px;
    background:#333;
    color:white;
    border:none;
    border-radius:8px;
  ">⬅️ Volver</button>
`;

content.appendChild(container);

const formArea = document.getElementById("formArea");
const preguntaInicial = document.getElementById("preguntaInicial");
const btnVolver = document.getElementById("btnVolver");

function renderFormSi() {
  peticionPaso = 1;
  preguntaInicial.style.display = "none";
  formArea.innerHTML = `
    <label>Nombre completo (requerido):</label>
    <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>
    <label>Nombre de tu congregación:</label>
    <input type="text" id="congregacion" style="width:100%;margin-bottom:10px;">
    <label>Escribe tu petición o necesidad:</label>
    <textarea id="peticion" style="width:100%;margin-bottom:10px;" rows="4"></textarea>
    <label>Número telefónico (opcional):</label>
    <input type="text" id="telefono" style="width:100%;margin-bottom:10px;">
    <button onclick="enviarPeticion()" style="padding:10px 20px;">Enviar</button>
  `;
}

function renderFormNo() {
  peticionPaso = 1;
  preguntaInicial.style.display = "none";
  const opciones = [
    "Oración por enfermedad",
    "Oración por la familia",
    "Oración por matrimonio",
    "Oración por hijos",
    "Oración por salvación",
    "Oración por liberación",
    "Oración por reconciliación",
    "Otros"
  ];
  formArea.innerHTML = '<p>Selecciona tu necesidad:</p>';
  opciones.forEach(op => {
    formArea.innerHTML += `<button onclick="renderCustom('${op}')" style="margin:5px;padding:12px 24px;font-size:16px;">${op}</button>`;
  });
}

function renderCustom(razon) {
  formArea.innerHTML = `<h3>${razon}</h3>
    <label>Nombre completo (requerido):</label>
    <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>
    ${(["Oración por salvación","Oración por reconciliación"].includes(razon)) ?
      '<label>Número telefónico (requerido):</label><input type="text" id="telefono" style="width:100%;margin-bottom:10px;" required>' :
      '<label>Número telefónico (opcional):</label><input type="text" id="telefono" style="width:100%;margin-bottom:10px;">'}
    ${razon==="Otros" ? '<label>Escribe tu necesidad:</label><textarea id="peticion" style="width:100%;margin-bottom:10px;" rows="4"></textarea>' : ''}
    <button onclick="enviarPeticion('${razon}')" style="padding:10px 20px;">Enviar</button>`;
}

function enviarPeticion(razon) {
  const nombre = document.getElementById("nombre").value.trim();
  const peticion = document.getElementById("peticion") ? document.getElementById("peticion").value.trim() : (razon || "");
  const telefono = document.getElementById("telefono") ? document.getElementById("telefono").value.trim() : "";
  if (!nombre || !peticion) {
    alert("Por favor completa los campos requeridos.");
    return;
  }
  if (peticion.toLowerCase().includes("suicidio") && !telefono) {
    alert("Por razones de seguridad, por favor incluye un número telefónico.");
    return;
  }
  const mensaje = `Petición desde el formulario\nNombre: ${nombre}\nPetición: ${peticion}\nTeléfono: ${telefono || "No provisto"}`;
  const mailtoLink = `mailto:pipjm1@gmail.com?subject=Petición desde formulario&body=${encodeURIComponent(mensaje)}`;
  window.location.href = mailtoLink;
}

btnVolver.onclick = () => {
  if (peticionPaso === 1) {
    peticionPaso = 0;
    formArea.innerHTML = "";
    preguntaInicial.style.display = "block";
  } else {
    location.reload(); // vuelve al menú principal y restablece fondo original
  }
};

document.getElementById("btnSi").onclick = renderFormSi;
document.getElementById("btnNo").onclick = renderFormNo;