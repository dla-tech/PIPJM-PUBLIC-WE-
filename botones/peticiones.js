// peticiones.js (versión completa con EmailJS, congregación y botón flotante inferior izquierdo)

(() => {
  const scriptEmailJS = document.createElement('script');
  scriptEmailJS.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  scriptEmailJS.onload = () => {
    emailjs.init('AzWZTx6GexhwPU2UJ');
  };
  document.head.appendChild(scriptEmailJS);

  const contentDiv = document.getElementById("content");
  const mainMenu = document.getElementById("mainMenu");
  const originalBodyBg = getComputedStyle(document.body).backgroundImage || '';
  if (!contentDiv) return;

  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.alignItems = "center";
  contentDiv.style.background = "#fff8e7";
  contentDiv.style.width = "100%";
  contentDiv.style.height = "100vh";
  contentDiv.style.overflowY = "auto";
  contentDiv.style.padding = "30px 20px";
  contentDiv.style.boxSizing = "border-box";

  if (mainMenu) mainMenu.style.display = "none";
  document.body.style.overflow = "hidden";

  let etapa = 0;
  let ultimaEtapa = 0;

  function crearBotonVolver() {
    const btn = document.createElement("button");
    btn.textContent = "⬅️ Volver";
    btn.onclick = goBack;
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 10px 20px;
      font-size: 16px;
      background: #333;
      color: white;
      border: none;
      border-radius: 8px;
      z-index: 1000;
    `;
    btn.id = "botonVolverPeticiones";
    document.body.appendChild(btn);
  }

  function eliminarBotonVolver() {
    const btn = document.getElementById("botonVolverPeticiones");
    if (btn) btn.remove();
  }

  function mostrarPreguntaInicial() {
    etapa = 0;
    contentDiv.innerHTML = `
      <h2 style="margin-bottom:10px;">🙏 Petición o Necesidad</h2>
      <p style="font-size:18px;margin-bottom:10px;">¿Asistes a una congregación?</p>
      <div style="display:flex;gap:20px;">
        <button id="btnSi">Sí</button>
        <button id="btnNo">No</button>
      </div>
    `;
    crearBotonVolver();
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
    etapa = 2;
    contentDiv.innerHTML = `
      <h2 style="margin-bottom:10px;">🙏 Petición o Necesidad</h2>
      <label>Nombre completo:</label>
      <input type="text" id="nombre" required style="width:100%;margin-bottom:10px;">

      <label>Nombre de tu congregación:</label>
      <input type="text" id="congregacion" style="width:100%;margin-bottom:10px;">

      <label>Petición o necesidad:</label>
      <textarea id="peticion" rows="4" style="width:100%;margin-bottom:10px;"></textarea>

      <label>Teléfono (opcional):</label>
      <input type="text" id="telefono" style="width:100%;margin-bottom:20px;">

      <button id="enviarBtn" disabled>Enviar</button>
    `;
    document.getElementById("nombre").oninput = activarBtnEnviar;
    document.getElementById("peticion").oninput = activarBtnEnviar;
    document.getElementById("enviarBtn").onclick = () => enviarPeticion();
  }

  function renderOpciones() {
    etapa = 1;
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
    contentDiv.innerHTML = `<h2 style="margin-bottom:10px;">🙏 Petición o Necesidad</h2>`;
    const contenedor = document.createElement("div");
    opciones.forEach(txt => {
      const btn = document.createElement("button");
      btn.textContent = txt;
      btn.style.cssText = "margin:8px;padding:10px;width:100%;";
      btn.onclick = () => renderCustom(txt);
      contenedor.appendChild(btn);
    });
    contentDiv.appendChild(contenedor);
  }

  function renderCustom(razon) {
    etapa = 2;
    const extra = razon === "Otros" ?
      `<label>Escribe tu necesidad:</label><textarea id="peticion"></textarea>` :
      `<div style="margin-bottom:10px;">${razon}</div>`;

    contentDiv.innerHTML = `
      <h2 style="margin-bottom:10px;">🙏 Petición o Necesidad</h2>
      ${extra}
      <label>Nombre completo:</label>
      <input type="text" id="nombre" required>

      <label>Teléfono (opcional):</label>
      <input type="text" id="telefono">

      <button id="enviarBtn" disabled>Enviar</button>
    `;
    document.getElementById("nombre").oninput = activarBtnEnviar;
    if (razon === "Otros") document.getElementById("peticion").oninput = activarBtnEnviar;
    document.getElementById("enviarBtn").onclick = () => enviarPeticion(razon);
  }

  function activarBtnEnviar() {
    const nombre = document.getElementById("nombre")?.value.trim();
    const peticion = document.getElementById("peticion")?.value.trim();
    const enviarBtn = document.getElementById("enviarBtn");
    if (!enviarBtn) return;
    enviarBtn.disabled = !nombre || (document.getElementById("peticion") && !peticion);
  }

  function enviarPeticion(razon) {
    const nombre = document.getElementById("nombre")?.value.trim();
    const congregacion = document.getElementById("congregacion")?.value.trim() || "";
    const peticion = document.getElementById("peticion")?.value.trim() || razon || "";
    const telefono = document.getElementById("telefono")?.value.trim() || "";

    emailjs.send('service_wjbpiik', 'template_89ugs9a', {
      nombre, congregacion, mensaje: peticion, telefono, razon: razon || "Petición directa"
    }).then(() => {
      alert("✅ Petición enviada con éxito");
      mostrarPreguntaInicial();
    }).catch(err => {
      console.error(err);
      alert("❌ Error al enviar. Intenta más tarde.");
    });
  }

  function goBack() {
    if (etapa === 2) etapa = ultimaEtapa === 1 ? renderOpciones() : mostrarPreguntaInicial();
    else if (etapa === 1) mostrarPreguntaInicial();
    else volverAlMenu();
  }

  function volverAlMenu() {
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
    document.body.style.background = originalBodyBg || "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = "hidden";
    if (mainMenu) mainMenu.style.display = "flex";
    etapa = 0;
    ultimaEtapa = 0;
    eliminarBotonVolver();
  }

  window.goBack = goBack;
  window.volverAlMenu = volverAlMenu;

  mostrarPreguntaInicial();
})();