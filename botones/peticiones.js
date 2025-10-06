// Verificar y crear el div #content si no existe
let contentDiv = document.getElementById("content");
if (!contentDiv) {
  contentDiv = document.createElement("div");
  contentDiv.id = "content";
  document.body.appendChild(contentDiv);
}

// Ocultar menú principal
const mainMenu = document.getElementById("mainMenu");
if (mainMenu) mainMenu.style.display = "none";

// Fondo blanco adaptado a móviles y scroll activado
document.body.style.background = "#fff8e7";
document.body.style.overflowY = "auto";

let etapa = 0; // 0 = pregunta, 1 = formulario

function mostrarPreguntaInicial() {
  etapa = 0;
  contentDiv.innerHTML = `
    <div style="
      width:100%;
      min-height:100vh;
      padding:30px 20px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      box-sizing:border-box;
    ">
      <h2 style="text-align:center;font-size:24px;">🙏 Petición o Necesidad</h2>
      <p style="font-size:18px;">¿Asistes a una congregación?</p>
      <div style="display:flex;gap:20px;justify-content:center;margin-top:10px;margin-bottom:20px;">
        <button id="btnSi" style="padding:12px 24px;font-size:16px;">Sí</button>
        <button id="btnNo" style="padding:12px 24px;font-size:16px;">No</button>
      </div>
      <div id="formArea" style="width:100%;max-width:600px;"></div>
      <button onclick="volverAlMenu()" style="
        margin-top:40px;
        padding:10px 20px;
        font-size:16px;
        background:#333;
        color:white;
        border:none;
        border-radius:8px;
      ">⬅️ Volver</button>
    </div>
  `;

  document.getElementById("btnSi").onclick = () => {
    etapa = 1;
    renderFormSi();
  };

  document.getElementById("btnNo").onclick = () => {
    etapa = 1;
    renderFormNo();
  };
}

mostrarPreguntaInicial();

function renderFormSi() {
  const formArea = document.getElementById("formArea");
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
  const formArea = document.getElementById("formArea");
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
  const formArea = document.getElementById("formArea");
  formArea.innerHTML = `
    <h3 style="margin-top:20px;">${razon}</h3>
    <label>Nombre completo (requerido):</label>
    <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>
    ${(["Oración por salvación","Oración por reconciliación"].includes(razon)) ?
      '<label>Número telefónico (requerido):</label><input type="text" id="telefono" style="width:100%;margin-bottom:10px;" required>' :
      '<label>Número telefónico (opcional):</label><input type="text" id="telefono" style="width:100%;margin-bottom:10px;">'}
    ${razon==="Otros" ? '<label>Escribe tu necesidad:</label><textarea id="peticion" style="width:100%;margin-bottom:10px;" rows="4"></textarea>' : ''}
    <button onclick="enviarPeticion('${razon}')" style="padding:10px 20px;">Enviar</button>
  `;
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

function volverAlMenu() {
  if (etapa === 1) {
    mostrarPreguntaInicial();
  } else {
    const content = document.getElementById("content");
    if (content) content.remove();

    const mainMenu = document.getElementById("mainMenu");
    if (mainMenu) mainMenu.style.display = "flex";

    // Restaurar fondo principal
    document.body.style.background = "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = "hidden";
  }
}