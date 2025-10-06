// Ocultar menú principal
document.getElementById("mainMenu").style.display = "none";

// Cambiar fondo solo para esta sección
document.body.style.background = "#fff8e7";  
document.body.style.overflowX = "hidden";
document.body.style.overflowY = "auto";

let etapa = "pregunta";

document.getElementById("content").innerHTML = `
  <div style="
    width:100%;
    height:100vh;
    overflow-y:auto;
    padding:30px 20px;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
  ">
    <div id="preguntaInicial" style="text-align:center;">
      <h2>🙏 Petición o Necesidad</h2>
      <p>¿Asistes a una congregación?</p>
      <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;">
        <button id="btnSi" style="padding:12px 24px;font-size:16px;">Sí</button>
        <button id="btnNo" style="padding:12px 24px;font-size:16px;">No</button>
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
  </div>
`;

const preguntaInicial = document.getElementById("preguntaInicial");
const formArea = document.getElementById("formArea");
const btnVolver = document.getElementById("btnVolver");

document.getElementById("btnSi").onclick = () => {
  etapa = "form_si";
  preguntaInicial.style.display = "none";
  renderFormSi();
};

document.getElementById("btnNo").onclick = () => {
  etapa = "form_no";
  preguntaInicial.style.display = "none";
  renderFormNo();
};

btnVolver.onclick = () => {
  if (etapa === "form_si" || etapa === "form_no") {
    // Volver a la pregunta inicial
    etapa = "pregunta";
    preguntaInicial.style.display = "block";
    formArea.innerHTML = "";
  } else {
    // Volver al menú principal
    document.getElementById("content").innerHTML = "";
    document.getElementById("mainMenu").style.display = "flex";
    // Restaurar fondo original (web principal)
    document.body.style.background = "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = "hidden";
  }
};

function renderFormSi() {
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
    formArea.innerHTML += `<button onclick="renderCustom('${op}')" style="margin:8px;padding:14px 20px;font-size:16px;">${op}</button>`;
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
  const nombre = document.getElementById("nombre")?.value.trim();
  const peticion = document.getElementById("peticion")?.value.trim() || (razon || "");
  const telefono = document.getElementById("telefono")?.value.trim() || "";
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