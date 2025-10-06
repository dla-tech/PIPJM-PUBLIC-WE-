document.getElementById("content").innerHTML = `
  <div style="
    width:100%;
    min-height:100vh;
    max-height:100vh;
    overflow-y:auto;
    background:#fff8e7;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    padding:30px;
    box-sizing:border-box;
  ">
    <h2 style="text-align:center;font-size:22px;">🙏 Petición o Necesidad</h2>
    <p style="font-size:18px;">¿Asistes a una congregación?</p>
    <div style="display:flex;gap:20px;justify-content:center;margin-bottom:20px;">
      <button id="btnSi" style="padding:10px 20px;font-size:16px;">Sí</button>
      <button id="btnNo" style="padding:10px 20px;font-size:16px;">No</button>
    </div>
    <div id="formArea" style="width:100%;max-width:600px;"></div>
    <button onclick="volver()" style="
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

let paso = 0;
const formArea = document.getElementById("formArea");

function renderFormSi() {
  paso = 1;
  document.querySelector("p").style.display = "none";
  document.querySelector("div[style*='display:flex']").style.display = "none";
  formArea.innerHTML = `
    <label style="font-size:16px;">Nombre completo (requerido):</label>
    <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>
    <label style="font-size:16px;">Nombre de tu congregación:</label>
    <input type="text" id="congregacion" style="width:100%;margin-bottom:10px;">
    <label style="font-size:16px;">Escribe tu petición o necesidad:</label>
    <textarea id="peticion" style="width:100%;margin-bottom:10px;" rows="4"></textarea>
    <label style="font-size:16px;">Número telefónico (opcional):</label>
    <input type="text" id="telefono" style="width:100%;margin-bottom:10px;">
    <button onclick="enviarPeticion()" style="padding:10px 20px;">Enviar</button>
  `;
}

function renderFormNo() {
  paso = 1;
  document.querySelector("p").style.display = "none";
  document.querySelector("div[style*='display:flex']").style.display = "none";
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
  formArea.innerHTML = '<p style="font-size:16px;">Selecciona tu necesidad:</p>';
  opciones.forEach(op => {
    formArea.innerHTML += `<button onclick="renderCustom('${op}')" style="margin:5px;padding:12px 20px;font-size:16px;">${op}</button>`;
  });
}

function renderCustom(razon) {
  formArea.innerHTML = `<h3 style="font-size:18px;">${razon}</h3>
    <label style="font-size:16px;">Nombre completo (requerido):</label>
    <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>
    ${(["Oración por salvación","Oración por reconciliación"].includes(razon)) ?
      '<label style="font-size:16px;">Número telefónico (requerido):</label><input type="text" id="telefono" style="width:100%;margin-bottom:10px;" required>' :
      '<label style="font-size:16px;">Número telefónico (opcional):</label><input type="text" id="telefono" style="width:100%;margin-bottom:10px;">'}
    ${razon==="Otros" ? '<label style="font-size:16px;">Escribe tu necesidad:</label><textarea id="peticion" style="width:100%;margin-bottom:10px;" rows="4"></textarea>' : ''}
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

function volver() {
  if (paso === 1) {
    paso = 0;
    location.reload();
  } else {
    document.getElementById("content").innerHTML = '';
    document.getElementById("mainMenu").style.display = 'flex';
  }
}

document.getElementById("btnSi").onclick = renderFormSi;
document.getElementById("btnNo").onclick = renderFormNo;
