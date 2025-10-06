document.getElementById("content").innerHTML = `
  <div style="
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background: #fff8e7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 30px 20px;
    box-sizing: border-box;
  ">
    <div id="stepInicio">
      <h2 style="text-align:center;">🙏 Petición o Necesidad</h2>
      <p>¿Asistes a una congregación?</p>
      <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;">
        <button id="btnSi" style="padding:10px 20px;">Sí</button>
        <button id="btnNo" style="padding:10px 20px;">No</button>
      </div>
    </div>
    <div id="formArea" style="width:100%;max-width:600px;margin-top:20px;"></div>
    <button onclick="handleVolver()" style="
      margin:30px 0;
      padding:10px 20px;
      font-size:16px;
      background:#333;
      color:white;
      border:none;
      border-radius:8px;
    ">⬅️ Volver</button>
  </div>
`;

let currentStep = "inicio";
const formArea = document.getElementById("formArea");
const stepInicio = document.getElementById("stepInicio");

document.getElementById("btnSi").onclick = () => {
  stepInicio.style.display = "none";
  renderFormSi();
  currentStep = "si";
};

document.getElementById("btnNo").onclick = () => {
  stepInicio.style.display = "none";
  renderFormNo();
  currentStep = "no";
};

function handleVolver() {
  if (currentStep === "si" || currentStep === "no") {
    stepInicio.style.display = "block";
    formArea.innerHTML = "";
    currentStep = "inicio";
  } else {
    volverAlMenu();
  }
}

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