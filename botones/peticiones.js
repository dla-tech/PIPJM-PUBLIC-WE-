// Crear el contenedor dinámicamente
const contentDiv = document.createElement("div");
contentDiv.id = "content";
document.body.appendChild(contentDiv);

// Ocultar menú principal
document.getElementById("mainMenu").style.display = "none";

// Fondo claro y scroll habilitado
document.body.style.background = "#fff8e7";
document.body.style.overflowY = "auto";
document.body.style.overflowX = "hidden";

let etapa = 0; // 0 = pregunta, 1 = opciones, 2 = formulario
let ultimaEtapa = 0;

function mostrarPreguntaInicial() {
  etapa = 0;
  contentDiv.innerHTML = `
    <div style="width:100%;min-height:100vh;padding:30px 20px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;box-sizing:border-box;">
      <h2 style="text-align:center;font-size:24px;">🙏 Petición o Necesidad</h2>
      <p id="preguntaCongregacion" style="font-size:18px;">¿Asistes a una congregación?</p>
      <div id="botonesPregunta" style="display:flex;gap:20px;justify-content:center;margin-top:10px;margin-bottom:20px;">
        <button id="btnSi" style="padding:12px 24px;font-size:16px;">Sí</button>
        <button id="btnNo" style="padding:12px 24px;font-size:16px;">No</button>
      </div>
      <button onclick="volverAlMenu()" style="margin-top:40px;padding:10px 20px;font-size:16px;background:#333;color:white;border:none;border-radius:8px;">⬅️ Volver</button>
    </div>
  `;

  document.getElementById("btnSi").onclick = () => {
    ultimaEtapa = etapa;
    etapa = 2;
    renderFormSi();
  };

  document.getElementById("btnNo").onclick = () => {
    ultimaEtapa = etapa;
    etapa = 1;
    renderOpciones();
  };
}

function renderFormSi() {
  contentDiv.innerHTML = `
    <div style="width:100%;min-height:100vh;padding:30px 20px;box-sizing:border-box;">
      <h2>🙏 Petición o Necesidad</h2>
      <label>Nombre completo (requerido):</label>
      <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>
      <label>Nombre de tu congregación:</label>
      <input type="text" id="congregacion" style="width:100%;margin-bottom:10px;">
      <label>Escribe tu petición o necesidad:</label>
      <textarea id="peticion" style="width:100%;margin-bottom:10px;" rows="4"></textarea>
      <label>Número telefónico (opcional):</label>
      <input type="text" id="telefono" style="width:100%;margin-bottom:10px;">
      <button id="enviarBtn" onclick="enviarPeticion()" disabled>Enviar</button>
      <button onclick="mostrarPreguntaInicial()" style="margin-top:20px;padding:10px 20px;font-size:16px;background:#333;color:white;border:none;border-radius:8px;">⬅️ Volver</button>
    </div>
  `;
  document.getElementById("nombre").addEventListener("input", () => {
    const nombre = document.getElementById("nombre").value.trim();
    document.getElementById("enviarBtn").disabled = nombre === "";
  });
}

function renderOpciones() {
  contentDiv.innerHTML = `
    <div style="width:100%;min-height:100vh;padding:30px 20px;box-sizing:border-box;">
      <h2>🙏 Petición o Necesidad</h2>
      <p>Selecciona tu necesidad:</p>
      <div id="botonesOpciones" style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
        ${["Oración por enfermedad","Oración por la familia","Oración por matrimonio","Oración por hijos","Oración por salvación","Oración por liberación","Oración por reconciliación","Otros"].map(op => `
          <button onclick="renderCustom('${op}')" style="padding:18px 28px;font-size:18px;width:100%;">${op}</button>`).join('')}
      </div>
      <button onclick="mostrarPreguntaInicial()" style="padding:10px 20px;font-size:16px;background:#333;color:white;border:none;border-radius:8px;">⬅️ Volver</button>
    </div>
  `;
  window.scrollTo(0, 0);
}

function renderCustom(razon) {
  ultimaEtapa = etapa;
  etapa = 2;
  const telLabel = (["Oración por salvación", "Oración por reconciliación"].includes(razon)) ? "(requerido)" : "(opcional)";
  const telReq = (["Oración por salvación", "Oración por reconciliación"].includes(razon)) ? "required" : "";
  const extra = (razon === "Otros") ? '<label>Escribe tu necesidad:</label><textarea id="peticion" rows="4" style="width:100%;margin-bottom:10px;"></textarea>' : '';
  contentDiv.innerHTML = `
    <div style="width:100%;min-height:100vh;padding:30px 20px;box-sizing:border-box;">
      <h2>🙏 Petición o Necesidad</h2>
      <h3>${razon}</h3>
      <label>Nombre completo (requerido):</label>
      <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>
      <label>Número telefónico ${telLabel}:</label>
      <input type="text" id="telefono" ${telReq} style="width:100%;margin-bottom:10px;">
      ${extra}
      <button id="enviarBtn" onclick="enviarPeticion('${razon}')" disabled>Enviar</button>
      <button onclick="renderOpciones()" style="margin-top:20px;padding:10px 20px;font-size:16px;background:#333;color:white;border:none;border-radius:8px;">⬅️ Volver</button>
    </div>
  `;
  document.getElementById("nombre").addEventListener("input", activarBtnEnviar);
  if (razon === "Otros") {
    document.getElementById("peticion").addEventListener("input", activarBtnEnviar);
  }
}

function activarBtnEnviar() {
  const nombre = document.getElementById("nombre")?.value.trim();
  const peticion = document.getElementById("peticion")?.value.trim() || "x";
  document.getElementById("enviarBtn").disabled = nombre === "" || (document.getElementById("peticion") && peticion === "");
}

function enviarPeticion(razon) {
  const nombre = document.getElementById("nombre")?.value.trim();
  const peticion = document.getElementById("peticion")?.value.trim() || razon || "";
  const telefono = document.getElementById("telefono")?.value.trim() || "";
  if (!nombre || !peticion) {
    alert("Por favor completa los campos requeridos.");
    return;
  }
  if (peticion.toLowerCase().includes("suicidio") && telefono === "") {
    alert("Por razones de seguridad, por favor incluye un número telefónico.");
    return;
  }
  const mensaje = `Petición desde el formulario\nNombre: ${nombre}\nPetición: ${peticion}\nTeléfono: ${telefono || "No provisto"}`;
  const mailtoLink = `mailto:pipjm1@gmail.com?subject=Petición desde formulario&body=${encodeURIComponent(mensaje)}`;
  window.location.href = mailtoLink;
}

function volverAlMenu() {
  const content = document.getElementById("content");
  if (content) content.remove();
  const mainMenu = document.getElementById("mainMenu");
  if (mainMenu) mainMenu.style.display = "flex";
  document.body.style.background = "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
  document.body.style.overflow = "hidden";
}

mostrarPreguntaInicial();